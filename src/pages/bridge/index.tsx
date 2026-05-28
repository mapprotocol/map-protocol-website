import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Decimal from "decimal.js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getPublicClient, getWalletClient } from "@wagmi/core";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useAccount, useChainId, usePublicClient, useSwitchChain } from "wagmi";
import {
  getBalance,
  readContract,
  sendTransaction,
  waitForTransactionReceipt,
  writeContract,
} from "viem/actions";
import {
  erc20Abi,
  type Address,
  type Hex,
  type PublicClient,
  type WalletClient,
} from "viem";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CustomHead from "@/components/CustimHead";
import { BridgeWalletProviders, rainbowkitConfig } from "@/lib/rainbowkit";
import styles from "./index.module.css";

type Props = {
  _nextI18Next?: unknown;
};

const ROUTER_API = "https://bs-router-v3.chainservice.io";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const MAPO_OMNI_ADDRESS = "0x7046933234A82AF77F14625e8d0fA9Bcc5044a7E";
const MAPO_TOKEN_ICON = "/images/logo-h5.png";
const ROUTE_TYPE = "exactIn";
const ENTRANCE = "buttertest";
const DECIMALS = 18;
const DEFAULT_SLIPPAGE_BPS = "200";

type ChainId = "22776" | "56" | "1";
type WagmiChainId = 22776 | 56 | 1;

type ChainConfig = {
  id: ChainId;
  hexChainId: `0x${string}`;
  name: string;
  shortName: string;
  nativeSymbol: string;
  rpcUrls: string[];
  explorerUrl: string;
  tokenAddress: string;
  tokenLabel: string;
  icon: string;
  tokenIcon: string;
  accent: string;
};

type PairOption = {
  id: string;
  fromChainId: ChainId;
  toChainId: ChainId;
};

type TokenInRoute = {
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  icon: string;
};

type ChainInRoute = {
  bridge?: string;
  chainId: string;
  tokenIn: TokenInRoute;
  tokenOut: TokenInRoute;
  totalAmountIn: string;
  totalAmountOut: string;
};

type RouteData = {
  diff?: string;
  bridgeFee?: {
    amount: string;
    symbol: string;
  };
  gasFee?: {
    amount: string;
    symbol: string;
  };
  gasEstimated?: string;
  hash: string;
  srcChain: ChainInRoute;
  bridgeChain?: ChainInRoute;
  dstChain?: ChainInRoute;
  minAmountOut?: {
    amount: string;
    symbol: string;
  };
  timeEstimated?: number;
};

type RouteTxData = {
  to: string;
  data: string;
  value: string;
  chainId: string;
};

type ApiResponse<T> = {
  errno?: number;
  code?: number | string;
  message?: string;
  data?: T;
};

const formatUnits = (value: bigint, decimals = DECIMALS) => {
  return new Decimal(value.toString())
    .div(new Decimal(10).pow(decimals))
    .toFixed(6)
    .replace(/\.?0+$/, "");
};

const CHAINS: ChainConfig[] = [
  {
    id: "22776",
    hexChainId: "0x58f8",
    name: "MAP Protocol",
    shortName: "MAPO",
    nativeSymbol: "MAPO",
    rpcUrls: ["https://rpc.maplabs.io"],
    explorerUrl: "https://maposcan.io",
    tokenAddress: ZERO_ADDRESS,
    tokenLabel: "Native MAPO",
    icon: "https://s3.amazonaws.com/map-static-file/images/mapo.png",
    tokenIcon: MAPO_TOKEN_ICON,
    accent: "#1F8F5F",
  },
  {
    id: "56",
    hexChainId: "0x38",
    name: "BNB Smart Chain",
    shortName: "BSC",
    nativeSymbol: "BNB",
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    explorerUrl: "https://bscscan.com",
    tokenAddress: MAPO_OMNI_ADDRESS,
    tokenLabel: "MAPO",
    icon: "https://s3.amazonaws.com/map-static-file/images/bnbchain.png",
    tokenIcon: MAPO_TOKEN_ICON,
    accent: "#F0B90B",
  },
  {
    id: "1",
    hexChainId: "0x1",
    name: "Ethereum",
    shortName: "ETH",
    nativeSymbol: "ETH",
    rpcUrls: [
      "https://eth.drpc.org",
      "https://ethereum-rpc.publicnode.com",
      "https://rpc.flashbots.net",
      "https://eth-mainnet.public.blastapi.io",
      "https://ethereum.publicnode.com",
    ],
    explorerUrl: "https://etherscan.io",
    tokenAddress: MAPO_OMNI_ADDRESS,
    tokenLabel: "MAPO",
    icon: "https://s3.amazonaws.com/map-static-file/images/ethereum.png",
    tokenIcon: MAPO_TOKEN_ICON,
    accent: "#627EEA",
  },
];

const CHAINS_BY_ID = CHAINS.reduce(
  (acc, chain) => {
    acc[chain.id] = chain;
    return acc;
  },
  {} as Record<ChainId, ChainConfig>,
);

const PAIR_OPTIONS: PairOption[] = [
  { id: "mapo-bsc", fromChainId: "22776", toChainId: "56" },
  { id: "bsc-mapo", fromChainId: "56", toChainId: "22776" },
  { id: "mapo-eth", fromChainId: "22776", toChainId: "1" },
  { id: "eth-mapo", fromChainId: "1", toChainId: "22776" },
];

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unexpected error";
};

const assertTransactionSuccess = (
  status: string,
  failureMessage: string,
) => {
  if (status !== "success") {
    throw new Error(failureMessage);
  }
};

const shortAddress = (address: string) => {
  if (!address || address === ZERO_ADDRESS) return "Native";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const normalizeHexQuantity = (value?: string): bigint => {
  if (!value || value === "0") return BigInt(0);
  return BigInt(value);
};

const decimalToUnits = (value: string, decimals = DECIMALS) => {
  const normalized = value.trim();
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error("Enter a valid MAPO amount.");
  }
  const units = new Decimal(normalized)
    .times(new Decimal(10).pow(decimals))
    .toDecimalPlaces(0, Decimal.ROUND_DOWN);
  return BigInt(units.toFixed(0));
};

const isAddress = (value: string): value is Address =>
  /^0x[a-fA-F0-9]{40}$/.test(value);

const toWagmiChainId = (chain: ChainConfig): WagmiChainId =>
  Number(chain.id) as WagmiChainId;

type BridgePublicClient = PublicClient;
type BridgeWalletClient = WalletClient;

const parseRouteData = (data: unknown) => {
  if (Array.isArray(data)) return data as RouteData[];
  if (data && typeof data === "object") {
    const wrapped = data as { route?: RouteData[] };
    if (Array.isArray(wrapped.route)) return wrapped.route;
  }
  return [];
};

const requestRoutes = async (
  fromChain: ChainConfig,
  toChain: ChainConfig,
  amount: string,
  slippageBps: string,
) => {
  const params = new URLSearchParams();
  params.set("fromChainId", fromChain.id);
  params.set("toChainId", toChain.id);
  params.set("amount", amount);
  params.set("tokenInAddress", fromChain.tokenAddress);
  params.set("tokenOutAddress", toChain.tokenAddress);
  params.set("type", ROUTE_TYPE);
  params.set("slippage", slippageBps);
  params.set("entrance", ENTRANCE);

  const response = await fetch(`${ROUTER_API}/route?${params.toString()}`);
  const body = (await response.json()) as ApiResponse<unknown>;

  if (!response.ok) {
    throw new Error(body.message || "Route request failed.");
  }
  if (body.errno !== undefined && body.errno !== 0) {
    throw new Error(body.message || "No route found.");
  }

  const routes = parseRouteData(body.data);
  if (!routes.length) {
    throw new Error("No route found.");
  }
  return routes;
};

const requestSwapTx = async (
  routeHash: string,
  from: string,
  receiver: string,
  slippageBps: string,
) => {
  const params = new URLSearchParams();
  params.set("hash", routeHash);
  params.set("slippage", slippageBps);
  params.set("from", from);
  params.set("receiver", receiver);

  const response = await fetch(`${ROUTER_API}/swap?${params.toString()}`);
  const body = (await response.json()) as ApiResponse<
    RouteTxData[] | RouteTxData
  >;

  if (!response.ok) {
    throw new Error(body.message || "Swap transaction request failed.");
  }
  if (body.errno !== undefined && body.errno !== 0) {
    throw new Error(body.message || "Swap transaction request failed.");
  }

  const data = body.data;
  const tx = Array.isArray(data) ? data[0] : data;
  if (!tx || !tx.to || !tx.data) {
    throw new Error("Butter route did not return transaction data.");
  }
  return tx;
};

const formatFee = (fee?: { amount: string; symbol: string }) => {
  if (!fee) return "-";
  return `${fee.amount} ${fee.symbol}`;
};

const getRouteOutput = (route: RouteData | null) => {
  if (!route) return "-";
  const output =
    route.dstChain?.totalAmountOut || route.bridgeChain?.totalAmountOut || "0";
  const symbol =
    route.dstChain?.tokenOut?.symbol ||
    route.bridgeChain?.tokenOut?.symbol ||
    route.srcChain?.tokenOut?.symbol ||
    "MAPO";
  return `${output} ${symbol}`;
};

export default function MapoBridge(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return (
    <BridgeWalletProviders>
      <MapoBridgeContent />
    </BridgeWalletProviders>
  );
}

function MapoBridgeContent() {
  const [selectedPairId, setSelectedPairId] = useState(PAIR_OPTIONS[0].id);
  const [amount, setAmount] = useState("");
  const [debouncedAmount, setDebouncedAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sourceBalance, setSourceBalance] = useState("0");
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceReady, setBalanceReady] = useState(false);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastTxHash, setLastTxHash] = useState("");
  const { address: account, isConnected } = useAccount();
  const walletChainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: walletChainId });

  const selectedPair = useMemo(
    () =>
      PAIR_OPTIONS.find((pair) => pair.id === selectedPairId) ||
      PAIR_OPTIONS[0],
    [selectedPairId],
  );

  const fromChain = CHAINS_BY_ID[selectedPair.fromChainId];
  const toChain = CHAINS_BY_ID[selectedPair.toChainId];
  const currentWalletChain = useMemo(
    () => CHAINS.find((chain) => Number(chain.id) === walletChainId),
    [walletChainId],
  );
  const selectedRoute = routes[0] || null;
  const hasEnoughBalance = useMemo(() => {
    if (!balanceReady) return false;
    if (!amount || Number(amount) <= 0) return true;
    return new Decimal(sourceBalance || "0").gte(new Decimal(amount || "0"));
  }, [amount, balanceReady, sourceBalance]);
  const bridgeDisabled =
    submitting || loadingRoute || balanceLoading || !balanceReady;
  const pairButtonsDisabled = isConnected && (balanceLoading || !balanceReady);

  const walletOnSourceChain = walletChainId === Number(fromChain.id);

  const switchToPairSourceChain = async (pair: PairOption) => {
    if (!isConnected) return;
    const nextFromChain = CHAINS_BY_ID[pair.fromChainId];
    if (walletChainId === toWagmiChainId(nextFromChain)) return;

    try {
      await switchChainAsync({ chainId: toWagmiChainId(nextFromChain) });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const selectPair = (pair: PairOption) => {
    if (pairButtonsDisabled) return;
    setSelectedPairId(pair.id);
    setErrorMessage("");
    switchToPairSourceChain(pair);
  };

  useEffect(() => {
    if (account && !receiver) {
      setReceiver(account);
    }
  }, [account, receiver]);

  useEffect(() => {
    setRoutes([]);
    setStatus("");
    setErrorMessage("");
    setLastTxHash("");
  }, [selectedPairId, amount]);

  useEffect(() => {
    let aborted = false;

    const loadBalance = async () => {
      if (!publicClient || !account) {
        setSourceBalance("0");
        setBalanceLoading(false);
        setBalanceReady(false);
        return;
      }

      try {
        setBalanceLoading(true);
        setBalanceReady(false);
        let rawBalance = BigInt(0);
        if (fromChain.tokenAddress === ZERO_ADDRESS) {
          rawBalance = await getBalance(publicClient, {
            address: account,
          });
        } else {
          rawBalance = await readContract(publicClient, {
            address: fromChain.tokenAddress as Address,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [account],
          });
        }
        if (aborted) return;
        setSourceBalance(formatUnits(rawBalance));
        setBalanceReady(true);
      } catch (error) {
        if (aborted) return;
        setSourceBalance("0");
        setBalanceReady(false);
      } finally {
        if (!aborted) {
          setBalanceLoading(false);
        }
      }
    };

    loadBalance();

    return () => {
      aborted = true;
    };
  }, [account, fromChain, publicClient]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedAmount(amount);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [amount]);

  useEffect(() => {
    let aborted = false;

    const loadRoutes = async () => {
      if (!debouncedAmount || Number(debouncedAmount) <= 0) {
        setLoadingRoute(false);
        setRoutes([]);
        return;
      }

      try {
        setLoadingRoute(true);
        setStatus("");
        setErrorMessage("");
        setLastTxHash("");
        const result = await requestRoutes(
          fromChain,
          toChain,
          debouncedAmount,
          DEFAULT_SLIPPAGE_BPS,
        );
        if (aborted) return;
        setRoutes(result);
        setStatus(
          "Route quote loaded. The quote can expire after a few minutes.",
        );
      } catch (error) {
        if (aborted) return;
        setRoutes([]);
        setErrorMessage(getErrorMessage(error));
      } finally {
        if (!aborted) {
          setLoadingRoute(false);
        }
      }
    };

    loadRoutes();

    return () => {
      aborted = true;
    };
  }, [debouncedAmount, fromChain, toChain]);

  const handleFlip = () => {
    const nextPair = PAIR_OPTIONS.find(
      (pair) =>
        pair.fromChainId === selectedPair.toChainId &&
        pair.toChainId === selectedPair.fromChainId,
    );
    if (nextPair) selectPair(nextPair);
  };

  const handleBridge = async () => {
    try {
      setSubmitting(true);
      setStatus("");
      setErrorMessage("");
      setLastTxHash("");

      if (!account || !isConnected) {
        throw new Error("Connect wallet, then confirm the bridge again.");
      }
      if (!receiver) {
        throw new Error("Enter a receiving address.");
      }
      if (!isAddress(receiver)) {
        throw new Error("Enter a valid receiving address.");
      }
      if (!amount || Number(amount) <= 0) {
        throw new Error("Enter a MAPO amount greater than 0.");
      }
      if (!hasEnoughBalance) {
        throw new Error("Insufficient MAPO balance.");
      }

      if (!walletOnSourceChain) {
        await switchChainAsync({ chainId: toWagmiChainId(fromChain) });
      }
      const sourceChainId = toWagmiChainId(fromChain);
      const sourcePublicClient = getPublicClient(rainbowkitConfig, {
        chainId: sourceChainId,
      }) as BridgePublicClient | undefined;
      const sourceWalletClient = (await getWalletClient(rainbowkitConfig, {
        chainId: sourceChainId,
      })) as BridgeWalletClient | undefined;
      if (!sourcePublicClient || !sourceWalletClient) {
        throw new Error(
          "Wallet client is not ready. Reconnect wallet and try again.",
        );
      }

      const route =
        selectedRoute ||
        (await requestRoutes(
          fromChain,
          toChain,
          amount,
          DEFAULT_SLIPPAGE_BPS,
        ))[0];
      if (!route) throw new Error("No route found.");
      setStatus("Preparing transaction data...");
      const tx = await requestSwapTx(
        route.hash,
        account,
        receiver,
        DEFAULT_SLIPPAGE_BPS,
      );

      if (fromChain.tokenAddress !== ZERO_ADDRESS) {
        const requiredAmount = decimalToUnits(amount);
        setStatus("Checking MAPO approval...");
        const allowance = await readContract(sourcePublicClient, {
          address: fromChain.tokenAddress as Address,
          abi: erc20Abi,
          functionName: "allowance",
          args: [account, tx.to as Address],
        });
        if (allowance < requiredAmount) {
          setStatus("Approve MAPO spending in your wallet...");
          const approveHash = await writeContract(sourceWalletClient, {
            address: fromChain.tokenAddress as Address,
            abi: erc20Abi,
            functionName: "approve",
            args: [tx.to as Address, requiredAmount],
            account,
            chain: sourceWalletClient.chain,
          });
          setStatus("Waiting for MAPO approval confirmation...");
          const approveReceipt = await waitForTransactionReceipt(sourcePublicClient, {
            hash: approveHash,
          });
          assertTransactionSuccess(
            approveReceipt.status,
            "MAPO approval failed on-chain. Please try again.",
          );
        }
      }

      setStatus("Confirm bridge transaction in your wallet...");
      const txHash = await sendTransaction(sourceWalletClient, {
        account,
        to: tx.to as Address,
        data: tx.data as Hex,
        value: normalizeHexQuantity(tx.value),
        chain: sourceWalletClient.chain,
      });

      setLastTxHash(txHash);
      setStatus("Transaction submitted. Waiting for on-chain confirmation...");
      const bridgeReceipt = await waitForTransactionReceipt(sourcePublicClient, {
        hash: txHash,
      });
      assertTransactionSuccess(
        bridgeReceipt.status,
        "Bridge transaction failed on-chain. Check the transaction and try again.",
      );
      setStatus("Bridge transaction confirmed. Waiting for destination chain arrival.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CustomHead title="MAPO Bridge - Map Protocol" />
      <Header />
      <main className={styles.page}>
        <section className={styles.bridgeSection}>
          <div className={styles.bridgeCopy}>
            <div className={styles.kicker}>MAPO Bridge</div>
            <h1 className={styles.title}>
              Bridge MAPO between MAP Protocol, BSC, and Ethereum
            </h1>
            <p className={styles.description}>Dedicated MAPO routes only.</p>
            <div className={styles.assetWrap}>
              <Image
                src="/images/map-coin-swap.png"
                fill
                alt="MAPO bridge"
                className={styles.assetImage}
                priority
              />
            </div>
          </div>

          <div className={styles.bridgePanel}>
            <div className={styles.panelHeader}>
              <div>
                <div className={styles.panelTitle}>MAPO Bridge</div>
              </div>
            </div>

            <div className={styles.pairGrid}>
              {PAIR_OPTIONS.map((pair) => {
                const pairFrom = CHAINS_BY_ID[pair.fromChainId];
                const pairTo = CHAINS_BY_ID[pair.toChainId];
                const active = pair.id === selectedPairId;
                return (
                  <button
                    key={pair.id}
                    className={
                      active
                        ? `${styles.pairButton} ${styles.pairButtonActive}`
                        : styles.pairButton
                    }
                    onClick={() => selectPair(pair)}
                    disabled={pairButtonsDisabled}
                    type="button"
                  >
                    <Image
                      src={pairFrom.icon}
                      width={18}
                      height={18}
                      alt={`${pairFrom.name} logo`}
                      className={styles.pairIcon}
                    />
                    <span>{pairFrom.shortName}</span>
                    <ArrowForwardIcon fontSize="small" />
                    <Image
                      src={pairTo.icon}
                      width={18}
                      height={18}
                      alt={`${pairTo.name} logo`}
                      className={styles.pairIcon}
                    />
                    <span>{pairTo.shortName}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.routeBox}>
              <div className={styles.chainRow}>
                <div
                  className={styles.chainBadge}
                  style={{ backgroundColor: fromChain.accent }}
                >
                  <Image
                    src={fromChain.icon}
                    width={28}
                    height={28}
                    alt={`${fromChain.name} logo`}
                    className={styles.chainIcon}
                  />
                </div>
                <div className={styles.chainText}>
                  <span className={styles.chainLabel}>From</span>
                  <strong>{fromChain.name}</strong>
                  <span className={styles.tokenLine}>
                    <Image
                      src={fromChain.tokenIcon}
                      width={16}
                      height={16}
                      alt="MAPO logo"
                      className={styles.tokenIcon}
                    />
                    {fromChain.tokenLabel}
                  </span>
                </div>
                <a
                  className={styles.addressLink}
                  href={`${fromChain.explorerUrl}/address/${fromChain.tokenAddress}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortAddress(fromChain.tokenAddress)}
                </a>
              </div>

              <button
                className={styles.flipButton}
                onClick={handleFlip}
                type="button"
                aria-label="Flip route"
              >
                <SwapVertIcon />
              </button>

              <div className={styles.chainRow}>
                <div
                  className={styles.chainBadge}
                  style={{ backgroundColor: toChain.accent }}
                >
                  <Image
                    src={toChain.icon}
                    width={28}
                    height={28}
                    alt={`${toChain.name} logo`}
                    className={styles.chainIcon}
                  />
                </div>
                <div className={styles.chainText}>
                  <span className={styles.chainLabel}>To</span>
                  <strong>{toChain.name}</strong>
                  <span className={styles.tokenLine}>
                    <Image
                      src={toChain.tokenIcon}
                      width={16}
                      height={16}
                      alt="MAPO logo"
                      className={styles.tokenIcon}
                    />
                    {toChain.tokenLabel}
                  </span>
                </div>
                <a
                  className={styles.addressLink}
                  href={`${toChain.explorerUrl}/address/${toChain.tokenAddress}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortAddress(toChain.tokenAddress)}
                </a>
              </div>
            </div>

            <label className={styles.inputLabel} htmlFor="mapo-amount">
              Amount
            </label>
            <div className={styles.amountInputWrap}>
              <input
                id="mapo-amount"
                className={styles.amountInput}
                inputMode="decimal"
                placeholder="0.0"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value.replace(/[^\d.]/g, ""))
                }
              />
              <span className={styles.amountToken}>
                <Image
                  src={MAPO_TOKEN_ICON}
                  width={18}
                  height={18}
                  alt="MAPO logo"
                  className={styles.tokenIcon}
                />
                MAPO
              </span>
            </div>
            <div className={styles.balanceRow}>
              <span>
                Balance:{" "}
                {balanceLoading
                  ? "Loading..."
                  : balanceReady
                    ? `${sourceBalance || "0"} MAPO`
                    : "Unavailable"}
              </span>
              {!hasEnoughBalance && amount ? (
                <span className={styles.balanceError}>
                  Insufficient balance
                </span>
              ) : null}
            </div>

            <label className={styles.inputLabel} htmlFor="mapo-receiver">
              Receive address
            </label>
            <input
              id="mapo-receiver"
              className={styles.receiverInput}
              placeholder="0x..."
              value={receiver}
              onChange={(event) => setReceiver(event.target.value)}
            />

            <div className={styles.walletRow}>
              <ConnectButton.Custom>
                {({
                  account: rkAccount,
                  chain,
                  mounted,
                  openAccountModal,
                  openConnectModal,
                }) => {
                  const connected = mounted && rkAccount && chain;

                  if (!connected) {
                    return (
                      <button
                        className={styles.secondaryButton}
                        onClick={openConnectModal}
                        type="button"
                      >
                        <AccountBalanceWalletOutlinedIcon fontSize="small" />
                        <span>Connect wallet</span>
                      </button>
                    );
                  }

                  return (
                    <div className={styles.walletActions}>
                      <button
                        className={styles.secondaryButton}
                        onClick={openAccountModal}
                        type="button"
                      >
                        <span>{rkAccount.displayName}</span>
                      </button>
                    </div>
                  );
                }}
              </ConnectButton.Custom>
              {account && (
                <span
                  className={
                    walletOnSourceChain ? styles.walletOk : styles.walletWarn
                  }
                >
                  {walletOnSourceChain
                    ? `${fromChain.name} ready`
                    : `${currentWalletChain?.name || "Wallet"} · Switch to ${fromChain.shortName}`}
                </span>
              )}
            </div>

            {selectedRoute && (
              <div className={styles.quotePanel}>
                <div className={styles.quoteHeader}>
                  <span>Quote</span>
                </div>
                <div className={styles.quoteMetric}>
                  <span>Receive</span>
                  <strong>{getRouteOutput(selectedRoute)}</strong>
                </div>
                <div className={styles.quoteMetric}>
                  <span>Bridge fee</span>
                  <strong>{formatFee(selectedRoute.bridgeFee)}</strong>
                </div>
                <div className={styles.quoteMetric}>
                  <span>Gas fee</span>
                  <strong>{formatFee(selectedRoute.gasFee)}</strong>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className={styles.errorBox}>
                <ErrorOutlineIcon fontSize="small" />
                <span>{errorMessage}</span>
              </div>
            )}

            {status && (
              <div className={styles.statusBox}>
                <CheckCircleOutlineIcon fontSize="small" />
                <span>{status}</span>
              </div>
            )}

            {lastTxHash && (
              <a
                className={styles.txLink}
                href={`${fromChain.explorerUrl}/tx/${lastTxHash}`}
                target="_blank"
                rel="noreferrer"
              >
                View source transaction
              </a>
            )}

            <button
              className={styles.primaryButton}
              onClick={handleBridge}
              disabled={bridgeDisabled}
              type="button"
            >
              {submitting ? "Processing..." : "Bridge MAPO"}
            </button>
          </div>
        </section>

        <section className={styles.infoBand}>
          <div className={styles.infoItem}>
            <strong>Supported asset</strong>
            <span className={styles.infoToken}>
              <Image
                src={MAPO_TOKEN_ICON}
                width={18}
                height={18}
                alt="MAPO logo"
                className={styles.tokenIcon}
              />
              MAPO only
            </span>
          </div>
          <div className={styles.infoItem}>
            <strong>Supported routes</strong>
            <span>
              MAP Protocol <ArrowForwardIcon fontSize="small" /> BSC or Ethereum
            </span>
          </div>
          <div className={styles.infoItem}>
            <strong>BSC / Ethereum MAPO</strong>
            <span>{MAPO_OMNI_ADDRESS}</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
