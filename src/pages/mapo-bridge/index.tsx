import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Decimal from "decimal.js";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CustomHead from "@/components/CustimHead";
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
const DEFAULT_SLIPPAGE = "2";
const DEFAULT_SLIPPAGE_SWAP = "0.2";

type ChainId = "22776" | "56" | "1";

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

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
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
    rpcUrls: ["https://ethereum-rpc.publicnode.com", "https://eth.llamarpc.com"],
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

const getEthereum = () => {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { ethereum?: EthereumProvider }).ethereum;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unexpected error";
};

const shortAddress = (address: string) => {
  if (!address || address === ZERO_ADDRESS) return "Native";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const normalizeHexQuantity = (value?: string) => {
  if (!value || value === "0") return "0x0";
  if (value.startsWith("0x")) return value;
  return `0x${BigInt(value).toString(16)}`;
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

const padAddress = (address: string) => address.toLowerCase().replace(/^0x/, "").padStart(64, "0");

const padUint256 = (value: bigint) => value.toString(16).padStart(64, "0");

const encodeAllowance = (owner: string, spender: string) =>
  `0xdd62ed3e${padAddress(owner)}${padAddress(spender)}`;

const encodeApprove = (spender: string, amount: bigint) =>
  `0x095ea7b3${padAddress(spender)}${padUint256(amount)}`;

const waitForReceipt = async (provider: EthereumProvider, txHash: string) => {
  for (let index = 0; index < 60; index += 1) {
    const receipt = await provider.request({
      method: "eth_getTransactionReceipt",
      params: [txHash],
    });
    if (receipt) return receipt;
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  throw new Error("Transaction was submitted, but confirmation is still pending.");
};

const readAllowance = async (
  provider: EthereumProvider,
  tokenAddress: string,
  owner: string,
  spender: string,
) => {
  const result = await provider.request({
    method: "eth_call",
    params: [
      {
        to: tokenAddress,
        data: encodeAllowance(owner, spender),
      },
      "latest",
    ],
  });
  return BigInt((result as string) || "0x0");
};

const ensureWalletChain = async (provider: EthereumProvider, chain: ChainConfig) => {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chain.hexChainId }],
    });
  } catch (error) {
    const code = (error as { code?: number }).code;
    if (code !== 4902) throw error;
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chain.hexChainId,
          chainName: chain.name,
          nativeCurrency: {
            name: chain.nativeSymbol,
            symbol: chain.nativeSymbol,
            decimals: DECIMALS,
          },
          rpcUrls: chain.rpcUrls,
          blockExplorerUrls: [chain.explorerUrl],
        },
      ],
    });
  }
};

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
  const body = (await response.json()) as ApiResponse<RouteTxData[] | RouteTxData>;

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
  const output = route.dstChain?.totalAmountOut || route.bridgeChain?.totalAmountOut || "0";
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
  const [selectedPairId, setSelectedPairId] = useState(PAIR_OPTIONS[0].id);
  const [amount, setAmount] = useState("");
  const [debouncedAmount, setDebouncedAmount] = useState("");
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [slippageSwap, setSlippageSwap] = useState(DEFAULT_SLIPPAGE_SWAP);
  const [receiver, setReceiver] = useState("");
  const [account, setAccount] = useState("");
  const [walletChainId, setWalletChainId] = useState("");
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedRouteHash, setSelectedRouteHash] = useState("");
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastTxHash, setLastTxHash] = useState("");

  const selectedPair = useMemo(
    () => PAIR_OPTIONS.find((pair) => pair.id === selectedPairId) || PAIR_OPTIONS[0],
    [selectedPairId],
  );

  const fromChain = CHAINS_BY_ID[selectedPair.fromChainId];
  const toChain = CHAINS_BY_ID[selectedPair.toChainId];
  const routeSlippage = useMemo(() => {
    if (fromChain.id === toChain.id) {
      return slippageSwap;
    }
    return slippage;
  }, [fromChain.id, toChain.id, slippage, slippageSwap]);
  const routeSlippageBps = useMemo(
    () => `${Math.max(Number(routeSlippage) || 0, 0) * 100}`,
    [routeSlippage],
  );
  const selectedRoute = useMemo(
    () => routes.find((route) => route.hash === selectedRouteHash) || routes[0] || null,
    [routes, selectedRouteHash],
  );

  const walletOnSourceChain = walletChainId.toLowerCase() === fromChain.hexChainId.toLowerCase();

  useEffect(() => {
    const provider = getEthereum();
    if (!provider) return undefined;

    const handleAccountsChanged = (accounts: unknown) => {
      const nextAccount = Array.isArray(accounts) && typeof accounts[0] === "string" ? accounts[0] : "";
      setAccount(nextAccount);
      if (nextAccount && !receiver) setReceiver(nextAccount);
    };

    const handleChainChanged = (chainId: unknown) => {
      if (typeof chainId === "string") setWalletChainId(chainId);
    };

    provider
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch(() => undefined);
    provider
      .request({ method: "eth_chainId" })
      .then(handleChainChanged)
      .catch(() => undefined);

    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [receiver]);

  useEffect(() => {
    setRoutes([]);
    setSelectedRouteHash("");
    setStatus("");
    setErrorMessage("");
    setLastTxHash("");
  }, [selectedPairId, amount, routeSlippage]);

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
        setSelectedRouteHash("");
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
          routeSlippageBps,
        );
        if (aborted) return;
        setRoutes(result);
        setSelectedRouteHash(result[0]?.hash || "");
        setStatus("Route quote loaded. The quote can expire after a few minutes.");
      } catch (error) {
        if (aborted) return;
        setRoutes([]);
        setSelectedRouteHash("");
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
  }, [debouncedAmount, fromChain, toChain, routeSlippageBps]);

  const handleConnect = async () => {
    const provider = getEthereum();
    if (!provider) {
      setErrorMessage("No EVM wallet detected. Please install or open MetaMask-compatible wallet.");
      return;
    }

    try {
      setErrorMessage("");
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      const chainId = (await provider.request({ method: "eth_chainId" })) as string;
      const nextAccount = accounts[0] || "";
      setAccount(nextAccount);
      setWalletChainId(chainId);
      if (nextAccount && !receiver) setReceiver(nextAccount);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleFlip = () => {
    const nextPair = PAIR_OPTIONS.find(
      (pair) => pair.fromChainId === selectedPair.toChainId && pair.toChainId === selectedPair.fromChainId,
    );
    if (nextPair) setSelectedPairId(nextPair.id);
  };

  const handleBridge = async () => {
    const provider = getEthereum();
    if (!provider) {
      setErrorMessage("No EVM wallet detected. Please install or open MetaMask-compatible wallet.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus("");
      setErrorMessage("");
      setLastTxHash("");

      if (!account) {
        await handleConnect();
        throw new Error("Connect wallet, then confirm the bridge again.");
      }
      if (!receiver) {
        throw new Error("Enter a receiving address.");
      }
      if (!amount || Number(amount) <= 0) {
        throw new Error("Enter a MAPO amount greater than 0.");
      }

      await ensureWalletChain(provider, fromChain);
      const chainId = (await provider.request({ method: "eth_chainId" })) as string;
      setWalletChainId(chainId);

      const route =
        selectedRoute ||
        (await requestRoutes(fromChain, toChain, amount, routeSlippageBps))[0];
      if (!route) throw new Error("No route found.");
      setStatus("Preparing transaction data...");
      const tx = await requestSwapTx(route.hash, account, receiver, routeSlippageBps);

      if (fromChain.tokenAddress !== ZERO_ADDRESS) {
        const requiredAmount = decimalToUnits(amount);
        setStatus("Checking MAPO approval...");
        const allowance = await readAllowance(provider, fromChain.tokenAddress, account, tx.to);
        if (allowance < requiredAmount) {
          setStatus("Approve MAPO spending in your wallet...");
          const approveHash = (await provider.request({
            method: "eth_sendTransaction",
            params: [
              {
                from: account,
                to: fromChain.tokenAddress,
                data: encodeApprove(tx.to, requiredAmount),
                value: "0x0",
              },
            ],
          })) as string;
          await waitForReceipt(provider, approveHash);
        }
      }

      setStatus("Confirm bridge transaction in your wallet...");
      const txHash = (await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: tx.to,
            data: tx.data,
            value: normalizeHexQuantity(tx.value),
          },
        ],
      })) as string;

      setLastTxHash(txHash);
      setStatus("Transaction submitted. MAPO usually arrives in about 1 hour.");
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
            <h1 className={styles.title}>Bridge MAPO between MAP Protocol, BSC, and Ethereum</h1>
            <p className={styles.description}>
              Dedicated MAPO routes only. Transfers are expected to arrive in about 1 hour.
            </p>
            <div className={styles.assetWrap}>
              <Image
                src="/images/map-coin-swap.png"
                width={380}
                height={280}
                alt="MAPO bridge"
                className={styles.assetImage}
                priority
              />
            </div>
          </div>

          <div className={styles.bridgePanel}>
            <div className={styles.panelHeader}>
              <div>
                <div className={styles.panelLabel}>Route</div>
                <div className={styles.panelTitle}>MAPO Mainnet Bridge</div>
              </div>
              <div className={styles.timeBadge}>
                <AccessTimeIcon fontSize="small" />
                <span>1 hour</span>
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
                    className={active ? `${styles.pairButton} ${styles.pairButtonActive}` : styles.pairButton}
                    onClick={() => setSelectedPairId(pair.id)}
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
                <div className={styles.chainBadge} style={{ backgroundColor: fromChain.accent }}>
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
                <a className={styles.addressLink} href={`${fromChain.explorerUrl}/address/${fromChain.tokenAddress}`} target="_blank">
                  {shortAddress(fromChain.tokenAddress)}
                </a>
              </div>

              <button className={styles.flipButton} onClick={handleFlip} type="button" aria-label="Flip route">
                <SwapVertIcon />
              </button>

              <div className={styles.chainRow}>
                <div className={styles.chainBadge} style={{ backgroundColor: toChain.accent }}>
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
                <a className={styles.addressLink} href={`${toChain.explorerUrl}/address/${toChain.tokenAddress}`} target="_blank">
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
                onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
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
              <button className={styles.secondaryButton} onClick={handleConnect} type="button">
                <AccountBalanceWalletOutlinedIcon fontSize="small" />
                <span>{account ? shortAddress(account) : "Connect wallet"}</span>
              </button>
              {account && (
                <span className={walletOnSourceChain ? styles.walletOk : styles.walletWarn}>
                  {walletOnSourceChain ? "Source network ready" : `Switch to ${fromChain.shortName}`}
                </span>
              )}
            </div>

            <div className={styles.slippageRow}>
              <label className={styles.slippageLabel} htmlFor="mapo-slippage">
                Slippage
              </label>
              <div className={styles.slippageInputWrap}>
                <input
                  id="mapo-slippage"
                  className={styles.slippageInput}
                  inputMode="decimal"
                  value={routeSlippage}
                  onChange={(event) => {
                    const next = event.target.value.replace(/[^\d.]/g, "");
                    if (fromChain.id === toChain.id) {
                      setSlippageSwap(next);
                    } else {
                      setSlippage(next);
                    }
                  }}
                />
                <span>%</span>
              </div>
            </div>

            {selectedRoute && (
              <div className={styles.quotePanel}>
                <div className={styles.quoteHeader}>
                  <span>Best route</span>
                  <select
                    className={styles.routeSelect}
                    value={selectedRoute.hash}
                    onChange={(event) => setSelectedRouteHash(event.target.value)}
                  >
                    {routes.map((route, index) => (
                      <option key={route.hash} value={route.hash}>
                        Route {index + 1}
                      </option>
                    ))}
                  </select>
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
                <div className={styles.quoteMetric}>
                  <span>Arrival time</span>
                  <strong>About 1 hour</strong>
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

            <button className={styles.primaryButton} onClick={handleBridge} disabled={submitting || loadingRoute} type="button">
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
            <span>MAP Protocol <ArrowForwardIcon fontSize="small" /> BSC or Ethereum</span>
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
