import React, { ReactNode, useState } from "react";
import {
  RainbowKitProvider,
  getDefaultConfig,
  type Chain,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fallback, http, WagmiProvider } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  "00000000000000000000000000000000";
const ETH_RPC_URLS = [
  "https://eth.drpc.org",
  "https://ethereum-rpc.publicnode.com",
  "https://rpc.flashbots.net",
  "https://eth-mainnet.public.blastapi.io",
  "https://ethereum.publicnode.com",
];

export const mapProtocol = {
  id: 22776,
  name: "MAP Protocol",
  iconUrl: "https://s3.amazonaws.com/map-static-file/images/mapo.png",
  iconBackground: "#1F8F5F",
  nativeCurrency: {
    name: "MAPO",
    symbol: "MAPO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.maplabs.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "MAPO Scan",
      url: "https://maposcan.io",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1,
    },
  },
} as const satisfies Chain;

export const bridgeChains = [
  {
    ...mainnet,
    iconUrl: "https://s3.amazonaws.com/map-static-file/images/ethereum.png",
    iconBackground: "#627EEA",
  },
  {
    ...bsc,
    iconUrl: "https://s3.amazonaws.com/map-static-file/images/bnbchain.png",
    iconBackground: "#F0B90B",
  },
  mapProtocol,
] as const;

export const rainbowkitConfig = getDefaultConfig({
  appName: "MAP Protocol",
  appDescription: "MAPO bridge wallet connection",
  appUrl: "https://mapprotocol.io",
  appIcon: "/images/logo-h5.png",
  projectId,
  chains: bridgeChains,
  ssr: true,
  transports: {
    [mainnet.id]: fallback(ETH_RPC_URLS.map((url) => http(url))),
    [bsc.id]: http(),
    [mapProtocol.id]: http("https://rpc.maplabs.io"),
  },
});

export function BridgeWalletProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={rainbowkitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
