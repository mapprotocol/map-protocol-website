import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';

import { useEffect, useState } from 'react';
import Router from 'next/router'
import { handleButtonClick } from '@/utils/dom';
import Head from 'next/head';
type Props = {
  // Add custom props here
}
interface CardInfo {
  cardTitle: String,
  cardContent: any,
}


const GetMapCard = ({ cardInfo, index }: { cardInfo: CardInfo, index: number }) => {

  return (
    <div className={styles.card}>
      <Image
        width={40}
        height={40}
        className={styles.cardIcon}
        src={`/fonts/home-page/home${index}.svg`}
        alt="" />
      <div className={styles.cardTitle}>{cardInfo.cardTitle}</div>
      <div className={styles.cardDesc}>{cardInfo.cardContent}</div>


    </div>)
}


export default function HomePageTop(
  { imageArray = [] }: { imageArray: number[] }
) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation('home-page');
  const [fade, setFade] = useState(styles.main)

  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])

  const Layer2List = [
    { title: 'Fuel the Bitcoin ecosystem to open doors for new innovations.' },
    { title: 'Empower MAPO as gas fees for MAP Protocol to grow with more utilities.' },
    { title: 'Enable users as self-governing entities to navigate in the Web3 world.' },
    { title: 'Support dApps running all their assets, data storage, and computing all on-chain.' },
  ]

  const cardData: Array<CardInfo> = [{
    cardTitle: t('The Bitcoin layer-2 for Bitcoin ecosystem transformation'),
    cardContent: <Trans ns="home-page" i18nKey=
      'By leveraging the Bitcoin network’s security mechanism, MAP Protocol strengthened its network security and serves as a Bitcoin layer-2 to enable BRC-20 cross-chain and allow assets and users to from other public chains interact with the Bitcoin network via peer-to-peer cross-chain.' components={{
        link1: <Link target="_blank" href={"https://mapo.gitbook.io/docs-en/base/index_en-2/brc201"} ></Link>,
      }} />
    ,
  }, {
    cardTitle: t('The Bitcoin-level peer-to-peer cross-chain network'),
    cardContent: t("Similar to the “purely peer-to-peer” Bitcoin network, MAP Protocol’s cross-chain network is also peer-to-peer without going through any third party. The validity of a cross-chain request depends purely on the fact that it has occurred on the source chain, not on decisions or proofs made by trusted third parties."),
  },
  {
    cardTitle: t('The frontier for building anything cross-chain'),


    cardContent: <Trans ns="home-page" i18nKey=
      'Cross-chain should be made easy. We provide a full suite of development tools, tutorials, and SDKs for you to build your cross-chain dApps or expand your chain connectivity with as little effort as possible. Building things cross-chain is as easy as building on a single chain.' components={{
        link1: <Link target="_blank" href={"https://mapo.gitbook.io/docs-en/"} ></Link>,
      }} />,
  },
  {
    cardTitle: t('The infra for interoperable on-chain assets, storage, and computing'),
    cardContent: t('Interoperability goes beyond connecting different tokens on different chains. A truly decentralized Web3 is where assets, storage, and computing are all on-chain and interoperable. We provide the infrastructure for interoperable on-chain assets, storage, and computing.'),
  }]


  const getStartCardData = [
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(48px)',
      title: t('Start with a Wallet'),
      image: "/images/home-page/get-start-2.png",
      boxShadow: "#C6D4FF",
      desc: t('Find the wallet that allows you to connect with MAP Protocol and manage your funds.'),
      link: '/find-a-wallet'
    },
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(48px)',
      image: "/images/stake-mapo/stake-mapo-top.png",
      title: t('Get some MAPO'),
      boxShadow: "#DAD4FF",
      desc: t('MAPO is the currency of MAP Protocol — you can use it for various purposes.'),
      link: '/get-map'

    },
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(48px)',
      image: "/images/home-page/get-start-1.png",
      boxShadow: "#FFEDC8",
      title: t('Try decentralized exchanges (DEXs)'),
      desc: t('DEXs hold transformative significance for decentralized finance (DeFi). Grab your MAPO and familiarize yourself with the mechanics of trading on a DEX.'),
      link: '/get-map#dexs'

    },
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(48px)',
      image: "/images/run-a-node/run-a-node-1.png",
      boxShadow: "#D6F5FA",
      title: t('Build an omnichain dApp or become omnichain'),
      desc: t('Start coding with MAP Protocol – the Bitcoin layer-2 by first farmilirize yourself with key concepts such as BRC-201 in MAP Protocol.'),
      link: 'https://mapo.gitbook.io/docs-en/'

    },


  ]
  const open = Boolean(anchorEl);
  return (
    <>
      <Head>
        <title>{'Map Protocol - A Bitcoin layer-2 for peer-to-peer cross-chain interoperability.'}</title>
        <link rel="icon" href="/images/logo-h5.png" />
      </Head>
      <div dir="ltr" className={fade} >
        <div className={styles.homepageImage} >
          {imageArray.map((item, index) =>
            <div
              key={index}
              className={styles.sliceImage}
            >
              <Image
                fill
                style={{ objectFit: "contain" }}
                src={`/images/home-page/${item}.png`}
                alt="" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{t('Welcome to MAP Protocol')}</div>
        <div className={styles.desc}> {t('MAP Protocol is a Bitcoin layer-2 for peer-to-peer cross-chain interoperability.')}</div>
        <div className={styles.exploreButton}>
          <Button
            onClick={
              () => {
                handleButtonClick('get-start')
              }
            } variant="contained">{t('Explore MAP Protocol')}</Button>
        </div>
      </div>
      <div className={styles.cardList}>
        {cardData.map((item, index) => <GetMapCard key={index} cardInfo={item} index={index} />)}
      </div>
      <div id={'get-start'} className={styles.getStart}>
        <div className={styles.getStartLeft}>
          <div className={styles.getStartTitle}>{t('Get started')}</div>
          <div className={styles.getStartDesc}>{t('MAP Protocol is your gateway into the fully interoperable on-chain world. Below are the simple steps for you to quickly familiarize yourself with the ever-evolving technology.')}</div>
        </div>
        <div className={styles.getStartImage}>
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/map-coin-colors.png"
            alt="map-coin-colors" />
        </div>
      </div>

      <div className={styles.getStartCardList}>
        {getStartCardData.map((item, index) =>
          <div
            key={index}
            className={styles.getStartCard}
            style={{ boxShadow: `5px 5px 0px ${item.boxShadow}` }}
            onClick={
              () => {
                Router.push(item.link)
              }}
          >
            <div className={styles.getStartCardTop}>
              <div className={styles.getStartCardImage}
                style={{
                  position: 'relative',
                  width: '306px',
                  height: '299px',
                  transform: 'translateY(48px)'
                }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={item.image}
                  alt="map-coin-colors" />
              </div>
            </div>
            <div className={styles.getStartCardTitle}>
              {item.title}
            </div>
            <div className={styles.getStartCardDesc}>
              {item.desc}
            </div>

          </div>)}

      </div>

    </>
  )
}

