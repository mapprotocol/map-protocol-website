
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import Image from 'next/image'
import InputAdornment from '@mui/material/InputAdornment';
import styles from './index.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

import TextField from '@mui/material/TextField';

import Header from '../../components/header'
// import Faqs from './faqs'
import { useTranslation, Trans, i18n } from 'next-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import CustomHead from '@/components/CustimHead';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
  "Asset Management":"#E79AE4"

}

export const languageCards: Array<project> = [
  {
    name: 'Ethereum',
    desc: "Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.",
    tag: 'Layer1',
    image: "https://pbs.twimg.com/profile_images/1627642622645878784/TP1GH9TM_400x400.jpg",
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
    image: "https://pbs.twimg.com/profile_images/1781425963265327104/TB5fMI9O_x96.jpg",
    website: 'https://polygon.technology/',
    x: 'https://twitter.com/0xPolygon',
  },

  {
    name: 'Klaytn',
    desc: "Klaytn is an open source public blockchain designed for tomorrow’s on-chain world.",
    tag: 'Layer1',
    image: "https://pbs.twimg.com/profile_images/1747551844405297152/732rFLWS_x96.jpg",
    website: 'https://klaytn.foundation/',
    x: 'https://twitter.com/klaytn_official',
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
    image: "https://pbs.twimg.com/profile_images/1726739354700173312/OeT9Ef1J_400x400.jpg",
    website: 'https://blast.io/en',
    x: 'https://twitter.com/Blast_L2',
  },

  {
    name: 'zkSync',
    desc: "Scaling Ethereum’s technology and values.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1647563917349060608/S1P_lNAN_400x400.jpg",
    website: 'https://zksync.io/',
    x: 'https://twitter.com/zksync',
  },


  {
    name: 'NEAR',
    desc: "Delivering on the promises of Web3, with Chain Abstraction.",
    tag: 'Layer1',
    image: "https://pbs.twimg.com/profile_images/1631021064171196431/_ahCp9jR_400x400.jpg",
    website: 'https://near.org/',
    x: 'https://twitter.com/NEARProtocol',
  },
  {
    name: 'Merlin Chain',
    desc: "A Native Bitcoin Layer2 powered by BitmapTech, building upon the native assets, protocols, and products on Bitcoin Layer1, to Make #Bitcoin Fun Again.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1752499460175962112/C4IPI-zt_x96.jpg",
    website: 'https://zksync.io/',
    x: 'https://twitter.com/MerlinLayer2',
  },
  {
    name: 'BEVM',
    desc: "BEVM is the first fully decentralized EVM-compatible Bitcoin L2 that uses BTC as Gas. It allows all DApps which can run in the Ethereum ecosystem to operate on Bitcoin L2.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1738138565874425856/xOG10LN0_400x400.jpg",
    website: 'https://zksync.io/',
    x: 'https://twitter.com/BTClayer2',
  },
  {
    name: 'AINN Layer2',
    desc: "The Ultimate AI-modular Bitcoin Layer2 solution.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1763669638033084416/Zlup0Y1B_x96.jpg",
    website: 'https://zksync.io/',
    x: 'https://twitter.com/AINNLayer2',
  },

  {
    name: 'MerlinStarter',
    desc: "The 1st native launchpad on Merlin Chain. The accelerator for all #BTCLayer2 projects.",
    tag: 'Launchpad',
    image: "https://pbs.twimg.com/profile_images/1760956700981698561/i0vaeLiR_normal.jpg",
    website: 'https://merlinstarter.com/',
    x: 'https://twitter.com/Merlin_Starter',
  },

  {
    name: 'BSquaredNetwork',
    desc: "The Most Practical Bitcoin Layer-2 Network .The First Bitcoin DA Layer.",
    tag: 'Layer2',
    image: "https://pbs.twimg.com/profile_images/1722440713886130176/JxGtDv9Y_x96.jpg",
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
    name: 'ButterSwap',
    desc: 'ButterSwap is the first t ZK light-client cross-chain aggregator swap with minimized ZK verification time & optimized gas fees. One-click exchanges btw popular chains & BTC ecosystem.',
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1597090686825730049/pmw3ioiY_x96.jpg",
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

  {
    name: 'THE BALL',
    desc: 'The Ball is an on-chain game that takes you through a spiraling tower maze with simple controls, vivid graphics, and addictive gameplay.',
    tag: 'Game',
    image: "https://pbs.twimg.com/profile_images/1765279944102526976/l3KC6MBI_200x200.jpg",
    website: 'https://web3-roblox.com/',
    x: 'https://twitter.com/TheBall_B',
  },


  {
    name: 'EEAA',
    desc: "EEAA is the world's first gaming application on Bitcoin Layer 2, pioneering new experiences in the web3 ecosystem.",
    tag: 'Game',
    image: "https://pbs.twimg.com/profile_images/1737054067279400960/YL56YEpD_200x200.jpg",
    website: 'https://eeaa.life/',
    x: 'https://twitter.com/EAFE_Dao',
  },

  {
    name: 'FoxPool',
    desc: "FoxPool is the world's first BTC mining pool to introduce the concept of a native platform token.",
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1746789554823327744/Zrnbv8Xo_200x200.jpg",
    website: 'https://foxpool.io/',
    x: 'https://twitter.com/FoxPool_BTC',
  },

  {
    name: 'rootMUD',
    desc: "rootMUD is an AI-powered text-based virtual web3 community & buidl the autonomous AI Agent network.",
    tag: 'AI',
    image: "https://pbs.twimg.com/profile_images/1744641658262872064/D3mOmDur_x96.jpg",
    website: 'https://rootmud.xyz/',
    x: 'https://twitter.com/root_mud',
  },

  {
    name: 'MMAI',
    desc: "MMAI is the meme powered AI built on Bitcoin Layer2.",
    tag: 'Meme',
    image: "https://pbs.twimg.com/profile_images/1767795062568792064/RhZZXXsn_x96.jpg",
    website: 'https://mmai.wtf/',
    x: 'https://twitter.com/mmaibtc/',
  },

  {
    name: 'Tyche',
    desc: "Tyche is the world's first NFT dividend game driven by inscriptions, and currently supports MAP Protocol Network.",
    tag: 'NFT',
    image: "https://pbs.twimg.com/profile_images/1757568842199609344/KC75dkeA_200x200.jpg",
    website: 'https://mapo.tyche.fund/',
    x: 'https://twitter.com/tychegame',
  },

  {
    name: 'Mirak Finance',
    desc: "Miark Finance is an all-in-one Bitcoin farming solution, offering Yield Farming, Lending, Staking, Restaking, and more for streamlined investment growth.",
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1754820780301459456/V1a8f3-A_200x200.jpg",
    website: 'https://www.mirak.finance/',
    x: 'https://twitter.com/MirakFinance',
  },


  {
    name: 'DRPX',
    desc: "DRPX is your gateway to effortless token innovation, cross-chain synergy, and smart contract automation, harmonizing with Bitcoin Layer2.",
    tag: 'Infra',
    image: "https://pbs.twimg.com/profile_images/1760950392026693632/OJQ92ryL_x96.jpg",
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
    name: 'POP2',
    desc: "Candy Designer open source community, copyright-free open source material, Mapo-based NFT platform.",
    tag: 'NFT',
    image: "https://pbs.twimg.com/profile_images/1755809473149763584/mxGrCMWX_x96.jpg",
    website: 'https://pop2.io/#/',
    x: 'https://twitter.com/community_candy',
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
    name: 'Bitscale Labs',
    desc: "Infuse AI power into the BTC network for mass adoption.",
    tag: 'AI',
    image: "https://pbs.twimg.com/profile_images/1543950982828023808/EEFbeEL9_400x400.jpg",
    website: 'https://www.bitscale.one/',
    x: 'https://twitter.com/BitscaleLabs',
  },

  {
    name: 'Friend3AI',
    desc: "Make friends & profits with Friend3 | An open #SocialFi platform that blends social dApp, inscriptions marketplace, AI, BTC eco, & trending tech.",
    tag: 'AI',
    image: "https://pbs.twimg.com/profile_images/1744435081140387841/OkWORgfK_400x400.jpg",
    website: 'https://friend3.group/',
    x: 'https://twitter.com/Friend3AI',
  },

  {
    name: 'Bitget Wallet',
    desc: "Join 20M users in seamlessly navigating the Web3 space with Bitget Wallet-Your Web3 Trading Wallet of the Future.",
    tag: 'Wallet',
    image: "https://pbs.twimg.com/profile_images/1742532543507992576/Kg_Q4dU__400x400.png",
    website: 'https://web3.bitget.com/en',
    x: 'https://twitter.com/BitgetWallet',
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
    image: "https://pbs.twimg.com/profile_images/1414514212915748873/Grz0B2t2_400x400.jpg",
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
    image: "https://pbs.twimg.com/profile_images/1638065819581300737/gM2GUNLi_400x400.jpg",
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
    image: "https://pbs.twimg.com/profile_images/1742786697606340608/449zhZuK_400x400.jpg",
    website: 'https://www.bitsmiley.io/',
    x: 'https://twitter.com/bitsmiley_labs',
  },

  {
    name: 'Surf Protocol',
    desc: "The Defi Hub on Bitcoin Ecosystem.",
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1710521347670257664/Pq8lYeHT_x96.png",
    website: 'https://www.surf.one/',
    x: 'https://twitter.com/surf_protocol',
  },

  {
    name: 'Babylon',
    desc: "Unlocking 21 Million Bitcoins to Secure the Decentralized Economy.",
    tag: 'DeFi',
    image: "https://pbs.twimg.com/profile_images/1781168613661274112/DVPEQLrM_x96.jpg",
    website: 'https://babylonchain.io/',
    x: 'https://twitter.com/babylon_chain',
  },


 
  {
    name: 'TrustWallet',
    desc: "The worlds most trusted & secure crypto wallet & Web3 gateway, with 100 million+ users.",
    tag: 'Wallet',
    image: "https://pbs.twimg.com/profile_images/1744535601574301696/B6nMXZBV_400x400.jpg",
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

  {
    name: 'CPIC IMHK',
    desc: "CPIC IMHK is a wholly owned Hong Kong asset management platform of China Pacific Insurance (Group) Co. Ltd. (CPIC), has become the investment advisor to the technology company MAPO Labs, the developer of MAP Protocol.",
    tag: 'Asset Management',
    image: "https://media.licdn.com/dms/image/C510BAQE6I9uMRDU1qQ/company-logo_200_200/0/1630570949465?e=1722470400&v=beta&t=UScs9bqyvu9uUArlGH7xSaNm1NMtXZNe6Js6heXnWvI",
    website: 'https://www.linkedin.com/company/cpic-investment-management-h-k-company-ltd',
    x: 'https://twitter.com/MapProtocol/status/1772852066056286460',
  },
  {
    name: 'Meson Finance',
    desc: "Meson is the faster and safer way to execute low-cost, zero-slippage BTC ETH and Stablecoin cross-chain swaps.",
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1486771068115116038/okULTyez_200x200.jpg",
    website: 'https://meson.fi/',
    x: 'https://twitter.com/mesonfi',
   
  },
  {
    name: 'Owlto Finance',
    desc: 'Owlto Finance is an intent-centric interoperability protocol, "Bridge the World with AI Agent".',
    tag: 'DEX',
    image: "https://pbs.twimg.com/profile_images/1742900205241106432/OAYGxT31_200x200.jpg",
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
  {
    name: 'Gate Web3 Wallet',
    desc: "Your GateWay to Web3 FREE Airdrops | Wallet | Trade | NFT | DeFi",
    tag: 'Wallet',
    image: "https://pbs.twimg.com/profile_images/1711414778072322048/luieKMM8_x96.jpg",
    website: 'https://trustwallet.com/download?utm_source=twitter&utm_medium=about_section&utm_campaign=branding',
    x: 'https://twitter.com/TrustWallet',
  },
  {
    name: 'AlchemyPay',
    desc: "Alchemy Pay bridges fiat and crypto global economies through its real-world payment network and direct access to Web3 services via its Ramp Solution.",
    tag: 'Infra',
    image: "https://pbs.twimg.com/profile_images/1739915334768041984/LB9lrAsB_200x200.jpg",
    website: 'https://alchemypay.org/',
    x: 'https://twitter.com/AlchemyPay',
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
          style={{
            position: 'relative', width: '498px', height: '307px'
          }}
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
            {t('Discover various networks that MAP Protocol has connected as an interoperable layer in the Bitcoin ecosystem and vibrant interoeprable MAPO dApps — spanning DeFi, Inscription, NFTs, Gaming, and more. Each designed to harness the full potential in the Bitcoin ecosystem')}
          </div>

        </div>

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