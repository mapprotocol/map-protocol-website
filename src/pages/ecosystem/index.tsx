import CustomHead from '@/components/CustimHead';
import Footer from '@/components/footer';
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import type {GetServerSideProps, InferGetServerSidePropsType,} from 'next'
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import Header from '../../components/header'
import styles from './index.module.css'

type Props = {}

type project = {
  tag: string
  name: string
  desc: string
  image: string
  x: string
  website: string
}

const tagColor = {
  "Launchpad": '#4FBE46',
  "DEX": '#CBF148',
  "Oracle": '#FFCFC9',
  "Game": '#C6DBE1',
  "AI": "#FFE5A0",
  "Meme": "#E6CFF2",
  "NFT": "#C584F1",
  "Infra": "#FFC8AB",
  "RWA": "#D4EDBC",
  "Bridge": "#BFE1F6",
  "Liquid Staking": "#927AB3",
  "Wallet": "#FFC8AA",
  "Layer1": "#B28BEB",
  "Layer2": "#F19FDD",
  "DeFi": "#ECDB0F",
  "Asset Management": "#E79AE4"

}

export const languageCards: Array<project> = [
  {
    name: 'Ethereum',
    desc: "Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.",
    tag: 'Layer1',
    image: "/images/ecosystem/1.png",
    website: 'https://ethereum.org/en/',
    x: 'https://twitter.com/ethereum',
  },

  {
    name: 'BNB Chain',
    desc: "A community-driven blockchain ecosystem of Layer-1 and Layer-2 scaling solutions.",
    tag: 'Layer1',
    image: "https://pbs.twimg.com/profile_images/1565354861616832513/ovh5FyDN_400x400.png",
    website: 'https://www.bnbchain.org/en',
    x: 'https://twitter.com/BNBChain',
  },

  {
    name: 'Polygon',
    desc: "Enabling an infinitely scalable web of sovereign blockchains that feels like a single chain. Powered by ZK tech.",
    tag: 'Layer2',
    image: "/images/ecosystem/3.png",
    website: 'https://polygon.technology/',
    x: 'https://twitter.com/0xPolygon',
  },

  {
    name: 'Kaia',
    desc: "Kaia is a highly optimized, BFT-based public blockchain designed to meet enterprise-grade reliability and performance standards.",
    tag: 'Layer1',
    image: "/images/ecosystem/4.png",
    website: "https://www.kaia.io/",
    x: "https://x.com/kaiachain",
  },

  {
    name: 'Base',
    desc: "A new Ethereum L2, incubated by Coinbase and built on the open-source OP Stack. We have no plans to issue a new network token.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1484586799921909764/A9yYenz3_bigger.png",
    website: 'https://www.base.org/',
    x: 'https://twitter.com/base',
  },

  {
    name: 'Blast',
    desc: "The L2 with native yield.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1807869834509549568/wb0HaZQL_400x400.jpg",
    website: 'https://blast.io/en',
    x: 'https://twitter.com/Blast_L2',
  },

  {
    name: 'zkSync',
    desc: "Scaling Ethereum’s technology and values.",
    tag: 'Layer2',
    image: "https://avatars.githubusercontent.com/u/133792386?s=200&v=4",
    website: 'https://zksync.io/',
    x: 'https://twitter.com/zksync',
  },


  {
    name: 'NEAR',
    desc: "Delivering on the promises of Web3, with Chain Abstraction.",
    tag: 'Layer1',
    image: "https://avatars.githubusercontent.com/u/7613128?s=200&v=4",
    website: 'https://near.org/',
    x: 'https://twitter.com/NEARProtocol',
  },
  {
    name: 'Merlin Chain',
    desc: "A Native Bitcoin Layer2 powered by BitmapTech, building upon the native assets, protocols, and products on Bitcoin Layer1, to Make #Bitcoin Fun Again.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1752499460175962112/C4IPI-zt_x96.jpg",
    website: 'https://merlinchain.io/',
    x: 'https://twitter.com/MerlinLayer2',
  },
  // {
  //   name: 'BEVM',
  //   desc: "BEVM is the first fully decentralized EVM-compatible Bitcoin L2 that uses BTC as Gas. It allows all DApps which can run in the Ethereum ecosystem to operate on Bitcoin L2.",
  //   tag: 'Layer2',
  //   image: "https://pbs.twimg.com/profile_images/1738138565874425856/xOG10LN0_400x400.jpg",
  //   website: 'https://zksync.io/',
  //   x: 'https://twitter.com/BTClayer2',
  // },
  {
    name: 'AiLayer',
    desc: "AILayer is an innovative Bitcoin Layer2 solution, crafted with a focus on AI-driven modular construction.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1763669638033084416/Zlup0Y1B_x96.jpg",
    website: 'https://ailayer.xyz/',
    x: 'https://x.com/AILayerXYZ',
  },

  {
    name: 'MerlinStarter',
    desc: "The 1st native launchpad on Merlin Chain. The accelerator for all #BTCLayer2 projects.",
    tag: 'Launchpad',
    image: "/images/ecosystem/10.png",
    website: 'https://merlinstarter.com/',
    x: 'https://twitter.com/Merlin_Starter',
  },

  {
    name: 'b²network',
    desc: "The Most Practical Bitcoin Layer-2 Network .The First Bitcoin DA Layer.",
    tag: 'Layer2',
    image: "https://avatars.githubusercontent.com/u/144320694?s=200&v=4",
    website: 'https://www.bsquared.network/',
    x: 'https://twitter.com/BSquaredNetwork',
  },

  {
    name: 'Conflux',
    desc: "Blockchain Without Barriers.Conflux enables creators, communities, and markets to connect across borders and protocols.",
    tag: 'Layer1',
    image: "https://pbs.twimg.com/profile_images/1742189475072008192/b4Bi3zUv_400x400.png",
    website: 'https://confluxnetwork.org/en',
    x: 'https://twitter.com/Conflux_Network',
  },
  {
    name: 'ButterSwap',
    desc: 'ButterSwap is the first t ZK light-client cross-chain aggregator swap with minimized ZK verification time & optimized gas fees. One-click exchanges btw popular chains & BTC ecosystem.',
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1796442018962669568/uYoVJ6xC_x96.jpg",
    website: 'https://www.butternetwork.io/',
    x: 'https://twitter.com/ButterNetworkio',
  },
  {
    name: 'HiveSwap',
    desc: 'HiveSwap is the No.1 swap in the Bitcoin ecosystem, providing liquidity services for assets in the Bitcoin ecosystem.',
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1739171953133645824/u9ZSQUX9_200x200.jpg",
    website: 'https://app.hiveswap.io/swap',
    x: 'https://twitter.com/hiveswap_io',
  },
  {
    name: 'Supra',
    desc: 'Supra is is a novel, high-throughput Oracle & IntraLayer: Bridging real-world data to simplify and secure the smart contracts of financial markets.',
    tag: 'Oracle',
    image: "https://pbs.twimg.com/profile_images/1749358202985295872/FcxNf6dw_x96.png",
    website: 'https://supra.com/',
    x: 'https://twitter.com/SUPRA_Labs',
  },
  {
    name: 'StaQ',
    desc: 'Liquidity for staked tokens in the Bitcoin L2 ecosystem.',
    tag: 'Liquid Staking',
    image: "https://pbs.twimg.com/profile_images/1765225598535032832/RqX3YFvK_400x400.jpg",
    website: 'https://bitstaq.io/',
    x: 'https://twitter.com/StaQ_io',
  },


  // {
  //   name: 'FoxPool',
  //   desc: "FoxPool is the world's first BTC mining pool to introduce the concept of a native platform token.",
  //   tag: 'DEX',
  //   image: "https://pbs.twimg.com/profile_images/1786598965586386944/RKkFat_q_400x400.jpg",
  //   website: 'https://foxpool.io/',
  //   x: 'https://twitter.com/FoxPool_BTC',
  // },

  {
    name: 'rootMUD',
    desc: "rootMUD is an AI-powered text-based virtual web3 community & buidl the autonomous AI Agent network.",
    tag: 'AI',
    image: "https://pbs.twimg.com/profile_images/1744641658262872064/D3mOmDur_x96.jpg",
    website: 'https://rootmud.xyz/',
    x: 'https://twitter.com/root_mud',
  },

  {
    name: 'DRPX',
    desc: "DRPX is your gateway to effortless token innovation, cross-chain synergy, and smart contract automation, harmonizing with Bitcoin Layer2.",
    tag: 'Infra',
    image: "https://cdn5.telesco.pe/file/gmQHffXLUr5pbP3dj_jZOQimS78ztleuKjoh7Tj4XRacbHk13LtnDcuH5ggl9KC-CxG5ZE79Xl46zCpnhYSFH7J-I_-YnHEBNBC8hY7fXld_UW9vIkjXDFD_gFxbycjn4epP2DUwRcSyE2fILCMsg65brgKAWFFmFJw__OrvidZFILq6mLTyF5hYG7zfuV5KRMOUD0buDDZoOHtxC1Xdh2w9jvwzB_24MIvrXU95ipo5WjsumjJ23nD5GByN1KSLHYMn7DvjR30rfwDrRxnM_dvctZJ7KcMUEXvEREHZy5_zAxSvBXeimS41lXIPNesmFrhJKDACX2tXBzOnJl6EEg.jpg",
    website: 'https://t.me/DropX_DAO',
    x: 'https://twitter.com/DropX_DAO',
  },

  {
    name: 'CheersLand',
    desc: "CheersLand is the non-programming modular RWA trading platform designed to bridge web2 and web3.",
    tag: 'RWA',
    image: "https://pbs.twimg.com/profile_images/1752045198409183232/iAIvqtUU_200x200.png",
    website: 'https://cheersland.org/',
    x: 'https://twitter.com/cheers_land',
  },
 
  {
    name: 'Roup',
    desc: "Cross-chain is the Future.ROUP is the first inscription project strictly selected by Binance Web3.",
    tag: 'Bridge',
    image: "https://pbs.twimg.com/profile_images/1725478866792427520/LwPr1Imi_x96.jpg",
    website: 'https://www.rolluper.xyz/en',
    x: 'https://twitter.com/brc20roup',
  },

  {
    name: 'Consensus Core',
    desc: "The high-performance GPU  infrastructure for AI and the Cloud Partner of NVIDIA.",
    tag: 'AI',
    image: "https://pbs.twimg.com/profile_images/1062827295067463680/LPMZQ5i6_400x400.jpg",
    website: 'https://www.consensuscore.com/',
    x: 'https://twitter.com/consensuscore',
  },

  {
    name: 'Friend3AI',
    desc: "Make friends & profits with Friend3 | An open #SocialFi platform that blends social dApp, inscriptions marketplace, AI, BTC eco, & trending tech.",
    tag: 'AI',
    image: "https://avatars.githubusercontent.com/u/143409600?s=200&v=4",
    website: 'https://friend3.group/',
    x: 'https://x.com/Friend3AI',
  },

  {
    name: 'Bitget Wallet',
    desc: "Join 20M users in seamlessly navigating the Web3 space with Bitget Wallet-Your Web3 Trading Wallet of the Future.",
    tag: 'Wallet',
    image: "https://avatars.githubusercontent.com/u/117051857?s=200&v=4",
    website: 'https://web3.bitget.com/',
    x: 'https://x.com/BitgetWallet',
  },

  {
    name: 'Particle Wallet',
    desc: "The Modular L1 Powering Chain Abstraction ✨.",
    tag: 'Wallet',
    image: "https://pbs.twimg.com/profile_images/1623919818108997633/o2JfMaqi_x96.png",
    website: 'https://wallet-debug.particle.network/',
    x: 'https://twitter.com/ParticleNtwrk',
  },

  {
    name: 'Rabby Wallet',
    desc: "The game-changing wallet for Ethereum and all EVM chains.",
    tag: 'Wallet',
    image: "https://avatars.githubusercontent.com/u/84845472?s=200&v=4",
    website: 'https://rabby.io/',
    x: 'https://twitter.com/Rabby_io',
  },

  {
    name: 'TrustGo',
    desc: "Build The AI-Powered Identity and Reputation Layer for Web3.",
    tag: 'Infra',
    image: "https://pbs.twimg.com/profile_images/1690974162049982464/ef1r05g1_400x400.jpg",
    website: 'https://www.trustalabs.ai/',
    x: 'https://twitter.com/TrustaLabs',
  },

  {
    name: 'Solv Protocol',
    desc: "Shaping the Future of BTCFi With SolvBTC, the World’s First Ever Yield Bearing Bitcoin. Backed by  BinanceLabs and Bockchaincap.",
    tag: 'Defi',
    image: "/images/ecosystem/solv.png",
    website: 'https://solv.finance/',
    x: 'https://twitter.com/SolvProtocol',
  },

  // {
  //   name: 'GreenBTC Club',
  //   desc: "SClimate Actions For Greening BTC",
  //   tag: 'Infra',
  //   image: "https://pbs.twimg.com/profile_images/1638065819581300737/gM2GUNLi_400x400.jpg",
  //   website: 'https://www.greenbtc.club/?channel=mapprotocol',
  //   x: 'https://twitter.com/SolvProtocol',
  // },


  {
    name: 'Bitsmiley',
    desc: "BTC-Native stablecoin protocol. BTC-Native AMM.",
    tag: 'Defi',
    image: "/images/ecosystem/bitsmiley.jpg",
    website: 'https://www.bitsmiley.io/',
    x: 'https://twitter.com/bitsmiley_labs',
  },

  {
    name: 'Surf Protocol',
    desc: "The Defi Hub on Bitcoin Ecosystem.",
    tag: 'DEX',
    image: "https://turboflow.gitbook.io/v2-docs/~gitbook/image?url=https%3A%2F%2F3414385479-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252Fzlz8AZ6eP8IB6lnGxa0y%252Fsites%252Fsite_eIQVp%252Ficon%252FHCj7teDfMYmKLE3i18YT%252FFrame%25202085661941%2520%281%29.png%3Falt%3Dmedia%26token%3D4243b78b-bbed-4acb-857b-7f1163365db9&width=32&dpr=4&quality=100&sign=e2109372&sv=2",
    website: 'https://www.surf.one/',
    x: 'https://x.com/surf_protocol',
  },

  {
    name: 'LessGas',
    desc: 'LessGas is inscription platform with ultra-low gas fees, 0 failure &  0 congestion, deployed on Bitcoin L2s.',
    tag: 'Launchpad',
    image: "https://pbs.twimg.com/profile_images/1734191984175353856/zQDl03Yb_400x400.jpg",
    website: 'https://app.lessgas.xyz/',
    x: 'https://twitter.com/Less_Gas',
  },
  {
    name: 'SATSAT',
    desc: 'SATSAT is a Community-Oriented Bitcoin Layer2 BRC-20 Trading Platform.',
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1739880682804109312/oXV9cR4Y_x96.jpg",
    website: 'https://app.satsat.exchange/',
    x: 'https://twitter.com/satsatstst',
  },
  {
    name: 'Babylon',
    desc: "Unlocking 21 Million Bitcoins to Secure the Decentralized Economy.",
    tag: 'DeFi',
    image: "https://avatars.githubusercontent.com/u/175623330?s=200&v=4",
    website: 'https://babylonchain.io/',
    x: 'https://twitter.com/babylon_chain',
  },

  {
    name: 'TrustWallet',
    desc: "The worlds most trusted & secure crypto wallet & Web3 gateway, with 100 million+ users.",
    tag: 'Wallet',
    image: "https://avatars.githubusercontent.com/u/32179889?s=200&v=4",
    website: 'https://trustwallet.com/download?utm_source=twitter&utm_medium=about_section&utm_campaign=branding',
    x: 'https://twitter.com/TrustWallet',
  },

  {
    name: 'Orient Asset Management (Hong Kong) Limited',
    desc: "Orient Asset Management (Hong Kong) Limited is a wholly-owned subsidiary of Orient Securities International Financial Group Co., Ltd.",
    tag: 'Asset Management',
    image: "/images/dongfang.png",
    website: 'https://www.dfzq.com.hk/',
    x: 'https://twitter.com/MapProtocol/status/1782675033640624563',
  },

  // {
  //   name: 'CPIC IMHK',
  //   desc: "CPIC IMHK is a wholly owned Hong Kong asset management platform of China Pacific Insurance (Group) Co. Ltd. (CPIC), has become the investment advisor to the technology company MAPO Labs, the developer of MAP Protocol.",
  //   tag: 'Asset Management',
  //   image: "https://media.licdn.com/dms/image/C510BAQE6I9uMRDU1qQ/company-logo_200_200/0/1630570949465?e=1722470400&v=beta&t=UScs9bqyvu9uUArlGH7xSaNm1NMtXZNe6Js6heXnWvI",
  //   website: 'https://www.linkedin.com/company/cpic-investment-management-h-k-company-ltd',
  //   x: 'https://twitter.com/MapProtocol/status/1772852066056286460',
  // },
  {
    name: 'Meson Finance',
    desc: "Meson is the faster and safer way to execute low-cost, zero-slippage BTC ETH and Stablecoin cross-chain swaps.",
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1844573068083273728/03OqXzZD_400x400.jpg",
    website: 'https://meson.fi/',
    x: 'https://twitter.com/mesonfi',

  },
  {
    name: 'Owlto Finance',
    desc: 'Owlto Finance is an intent-centric interoperability protocol, "Bridge the World with AI Agent".',
    tag: 'DEX',
    image: "https://avatars.githubusercontent.com/u/131841203?v=4",
    website: 'https://owlto.finance/',
    x: 'https://twitter.com/Owlto_Finance',
  },
  {
    name: 'Bitcoin Store',
    desc: "Bitcoin Store is first Croatian #Bitcoin exchange with physical stores and online exchange service. Buy, sell and store more than 170 cryptocurrencies.",
    tag: 'DeFi',
    image: "https://pbs.twimg.com/profile_images/1612824788296146944/obFhTbDS_200x200.jpg",
    website: 'https://www.bitstore.net/',
    x: 'https://twitter.com/storebitcoin',
  },
  // {
  //   name: 'Gate Web3 Wallet',
  //   desc: "Your GateWay to Web3 FREE Airdrops | Wallet | Trade | NFT | DeFi",
  //   tag: 'Wallet',
  //   image: "https://pbs.twimg.com/profile_images/1711414778072322048/luieKMM8_x96.jpg",
  //   website: 'https://trustwallet.com/download?utm_source=twitter&utm_medium=about_section&utm_campaign=branding',
  //   x: 'https://twitter.com/TrustWallet',
  // },
  {
    name: 'AlchemyPay',
    desc: "Alchemy Pay bridges fiat and crypto global economies through its real-world payment network and direct access to Web3 services via its Ramp Solution.",
    tag: 'Infra',
    image: "https://miro.medium.com/v2/resize:fill:176:176/1*AFl48Wa3mqDhWU091MWa9g.png",
    website: 'https://alchemypay.org/',
    x: 'https://twitter.com/AlchemyPay',
  },

  {
    name: "SlowMist",
    image: "/images/ecosystem/25.png",
    x: "https://x.com/SlowMist_Team",
    website: "https://www.slowmist.com",
    desc:
      "SlowMist is a Blockchain security firm established in 2018, providing services such as security audits, security consultants, red teaming, and more.",
    tag: "Security",
  },
  {
    name: "CertiK",
    image: "/images/ecosystem/26.jpg",
    x: "https://x.com/CertiK",
    website: "https://www.certik.com",
    desc:
      "CertiK is the largest blockchain security auditor and provides a comprehensive suite of tools to secure the industry at scale.",
    tag: "Security",
  },
  {
    name: "DeHacker",
    image: "/images/ecosystem/27.png",
    x: "https://x.com/dehackerio",
    website: "https://www.dehacker.io/",
    desc:
      "We focus on Blockchain Ecosystem Security and provide audit solutions to help crypto startups build secure technology.",
    tag: "Security",
  },
  {
    name: "TokenPocket",
    image: "/images/ecosystem/28.jpg",
    x: "https://x.com/TokenPocket_TP",
    website: "https://www.tokenpocket.pro/",
    desc:
      "TokenPocket is a multi-chain crypto wallet, easy and secure to use that trusted by millions.",
    tag: "Wallet",
  },
  {
    name: "imToken",
    image: "/images/ecosystem/29.jpg",
    x: "https://x.com/imTokenOfficial",
    website: "https://token.im/",
    desc:
      "imToken is a reliable Web3 digital wallet trusted by tens of millions, enabling easy access to 50+ major networks including Bitcoin, Ethereum, TRON and TON.",
    tag: "Wallet",
  },
  {
    name: "D’Cent Wallet",
    image: "/images/ecosystem/30.png",
    x: "https://x.com/DCENTwallets",
    website: "https://www.dcentwallet.com/",
    desc:
      "A secure biometric wallet for self-custody and smarter crypto management.",
    tag: "Wallet",
  },
  {
    name: "ShapeShift",
    image: "/images/ecosystem/31.jpg",
    x: "https://x.com/ShapeShiftt",
    website: "https://shapeshift.com/",
    desc:
      "ShapeShift is the fastest way to swap Bitcoin, Ethereum, Solana, and thousands of tokens — all from your phone, with full self-custody and no KYC.",
    tag: "DEX",
  },
  {
    name: "Burrito Wallet",
    image: "/images/ecosystem/32.png",
    x: "https://x.com/BurritoGlobal",
    website: "https://www.burritowallet.com/",
    desc:
      "Burrito Wallet supports multiple cryptocurrencies and provides access to the most popular Dapps, Defi Platforms, and NFT Marketplaces.",
    tag: "Wallet",
  },
]
export default function Language(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [languageResCard, setLanguageResCard] = useState(languageCards)
  const { t } = useTranslation('language');
  const [fade, setFade] = useState(styles.main)
  const router = useRouter();
  const [type, setType] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])



  return (
    <>
      <CustomHead
        title={t('Map Protocol Ecosystem')}
      />
      <Header />
      <div className={fade} >
        <div className={styles.languageImage}

        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/ecosystem.png"
            alt="" />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.title}>{t('Ecosystem')}</div>
          <div className={styles.desc}>
            {t('Discover various networks that MAP Protocol has connected as an interoperable layer in the Bitcoin ecosystem and vibrant interoperable MAPO dApps — spanning DeFi, Inscription, NFTs, Gaming, and more. Each is designed to harness the full potential of the Bitcoin ecosystem.')}
          </div>

        </div>

        <Button
          style={{ marginBottom: '48px' }}
          onClick={() => {
            window.open('https://forms.gle/18EUYDSxW3EA6Ady5')
          }}
          variant="contained">{t('Add Project')}</Button>

      </div>
      <div className={styles.select}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={type}
            onChange={handleChange}
            label="type"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"Launchpad"}>Launchpad</MenuItem>
            <MenuItem value={"DEX"}>DEX</MenuItem>
            <MenuItem value={"Oracle"}>Oracle</MenuItem>
            <MenuItem value={"Game"}>Game</MenuItem>
            <MenuItem value={"AI"}>AI</MenuItem>
            <MenuItem value={"Meme"}>Meme</MenuItem>
            <MenuItem value={"NFT"}>NFT</MenuItem>
            <MenuItem value={"Infra"}>Infra</MenuItem>
            <MenuItem value={"RWA"}>RWA</MenuItem>
            <MenuItem value={"Bridge"}>Bridge</MenuItem>
            <MenuItem value={"Liquid Staking"}>Liquid Staking</MenuItem>
            <MenuItem value={"Wallet"}>Wallet</MenuItem>
            <MenuItem value={"Layer1"}>Layer1</MenuItem>
            <MenuItem value={"Layer2"}>Layer2</MenuItem>
            <MenuItem value={"DeFi"}>DeFi</MenuItem>
            <MenuItem value={"Asset Management"}>Asset Management</MenuItem>


          </Select>
        </FormControl>
        {/* <div className={styles.selectTitle}>
          {t('MAP Protocol is available in the following languages:')}
        </div> */}
        {/* <div className={styles.input}>
          <TextField
            sx={{ width: '100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}

            onChange={searchOnchange}
            id="outlined-basic"
            placeholder={t("Filter")}
            variant="outlined" />
        </div> */}
        {/* <div className={styles.input}></div> */}
        <div className={styles.languageCards}>
          {languageResCard.map((item: project) =>
            <>{(type == "" || type == item.tag) && <div
              key={item.name}
              onClick={() => { }} className={styles.card}>
              <div className={styles.cardTop}>
                <img className={styles.projectImage} src={item?.image} />
                <div className={styles.medias}>
                  <Image
                    height={24}
                    width={24}
                    src="/images/ecosystem/website.svg"
                    onClick={() => {
                      window.open(item.website)
                    }}
                    alt="" />
                  <Image
                    height={24}
                    width={24}
                    src="/images/ecosystem/x.png"
                    onClick={() => {
                      window.open(item.x)
                    }}
                    alt="" />
                  {/* <Image
                    height={24}
                    width={24}
                    src="/images/ecosystem/telegram.svg"
                    alt="" /> */}
                </div>
              </div>
              <div className={styles.cardName}>
                {item.name}
              </div>
              <div className={styles.cardDesc}>
                {item.desc}
              </div>
              <div className={styles.tag} style={{
                //@ts-ignore
                backgroundColor: tagColor[item.tag],
              }}>{item.tag}</div>
            </div>}</>)}
        </div>
      </div>
      <Footer />

    </>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'language',
      'common'
    ])),
  },
})