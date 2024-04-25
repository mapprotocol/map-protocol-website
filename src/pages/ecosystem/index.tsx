
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
  "Dex": '#CBF148',
  "Oracle": '#FFCFC9',
  "Game": '#C6DBE1',
  "AI": "#FFE5A0",
  "Meme": "#E6CFF2",
  "NFT": "#C584F1",
  "Infra": "#FFC8AB",
  "RWA": "#D4EDBC",
  "Bridge": "#BFE1F6"
}

export const languageCards: Array<project> = [
  {
    name: 'LessGas',
    desc: 'LessGas is inscription platform with ultra-low gas fees, 0 failure &  0 congestion, deployed on Bitcoin L2s',
    tag: 'Launchpad',
    image: "https://pbs.twimg.com/profile_images/1734191984175353856/zQDl03Yb_400x400.jpg",
    website: 'https://app.lessgas.xyz/',
    x: 'https://twitter.com/Less_Gas',
  },
  {
    name: 'SATSAT',
    desc: 'SATSAT is a Community-Oriented Bitcoin Layer2 BRC-20 Trading Platform.',
    tag: 'Dex',
    image: "https://pbs.twimg.com/profile_images/1739880682804109312/oXV9cR4Y_x96.jpg",
    website: 'https://app.satsat.exchange/',
    x: 'https://twitter.com/satsatstst',
  },
  {
    name: 'ButterSwap',
    desc: 'ButterSwap is the first t ZK light-client cross-chain aggregator swap with minimized ZK verification time & optimized gas fees. One-click exchanges btw popular chains & BTC ecosystem.',
    tag: 'Dex',
    image: "https://pbs.twimg.com/profile_images/1597090686825730049/pmw3ioiY_x96.jpg",
    website: 'https://www.butternetwork.io/',
    x: 'https://twitter.com/ButterNetworkio',
  },
  {
    name: 'HiveSwap',
    desc: 'HiveSwap is the No.1 swap in the Bitcoin ecosystem, providing liquidity services for assets in the Bitcoin ecosystem.',
    tag: 'Dex',
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
    website: 'https://eeaa.world/',
    x: 'https://twitter.com/EEAA_Community',
  },

  {
    name: 'FoxPool',
    desc: "FoxPool is the world's first BTC mining pool to introduce the concept of a native platform token.",
    tag: 'Dex',
    image: "https://pbs.twimg.com/profile_images/1746789554823327744/Zrnbv8Xo_200x200.jpg",
    website: 'https://foxpool.io/',
    x: 'https://twitter.com/FoxPool_BTC',
  },

  {
    name: 'rootMUD',
    desc: "rootMUD is an AI-powered text-based virtual web3 community & buidl the autonomous AI Agent network",
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
    desc: "Miark Finance is an all-in-one Bitcoin farming solution, offering Yield Farming, Lending, Staking, Restaking, and more for streamlined investment growth",
    tag: 'Dex',
    image: "https://pbs.twimg.com/profile_images/1754820780301459456/V1a8f3-A_200x200.jpg",
    website: 'https://www.mirak.finance/',
    x: 'https://twitter.com/MirakFinance',
  },


  {
    name: 'DRPX',
    desc: "DRPX is your gateway to effortless token innovation, cross-chain synergy, and smart contract automation, harmonizing with Bitcoin Layer2",
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
    desc: "Candy Designer open source community, copyright-free open source material, Mapo-based NFT platform",
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
    name: 'BitRealms',
    desc: "AI-driven entertainment metaverse in the Bitcoin ecosystem ᛤ enhancing community engagement with custom short dramas, interactive games & meme coins adventure",
    tag: 'AI',
    image: "https://pbs.twimg.com/profile_images/1763495057280176128/K_Y2Go5m_200x200.jpg",
    website: 'http://app.bitrealms.ai/',
    x: 'https://twitter.com/BitRealms_web3',
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
          <div className={styles.title}>{t('ECOSYSTEM')}</div>
          <div className={styles.desc}>
            {t('Discover a vibrant MAP Protocol Bitcoin L2 dApps — spanning DeFi, Inscription, NFTs, Gaming, and more. Each designed to harness the full potential of Bitcoin Layer 2!')}
          </div>

        </div>

      </div>
      <div className={styles.select}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
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
          <MenuItem value={"Dex"}>Dex</MenuItem>
          <MenuItem value={"Oracle"}>Oracle</MenuItem>
          <MenuItem value={"Game"}>Game</MenuItem>
          <MenuItem value={"AI"}>AI</MenuItem>
          <MenuItem value={"Meme"}>Meme</MenuItem>
          <MenuItem value={"NFT"}>NFT</MenuItem>
          <MenuItem value={"Infra"}>Infra</MenuItem>
          <MenuItem value={"RWA"}>RWA</MenuItem>
          <MenuItem value={"Bridge"}>Bridge</MenuItem>
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
            <>{(type == "" || type==item.tag) && <div
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