import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import { useTranslation, Trans } from 'next-i18next';

import { useEffect, useState } from 'react';
import Router from 'next/router'
import CustomHead from '@/components/CustimHead';
type Props = {
  // Add custom props here
}
interface CardInfo {
  cardTitle: String,
  cardContent: String,
}


const GetMapCard = ({ cardInfo, index }: { cardInfo: CardInfo, index: number }) => {

  return (
    <div className={styles.card}>
      <Image
        width={40}
        height={40}
        className={styles.cardIcon}
        src={`/fonts/what-is-mapo/${index}.svg`}
        alt="" />
      <div className={styles.cardTitle}>{cardInfo.cardTitle}</div>
      <div className={styles.cardDesc}>{cardInfo.cardContent}</div>
    </div>)
}

export default function WhatIsMapProtocolTop(

) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation('what-is-map-protocol-1');
  const [fade, setFade] = useState(styles.main)

  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cardData: Array<CardInfo> = [{
    cardTitle: t('Bitcoin ecosystem growth'),
    cardContent: t("With MAP Protocol being Bitcoin layer-2, any asset on any chain can easily interact with the Bitcoin network. This will add other types of assets and communities to the existing Bitcoin ecosystem and community."),
  },
  {
    cardTitle: t('Interoperable On-chain Storage and Computing'),
    cardContent: t('Beyond asset transfers, MAP Protocol extends the sphere of interoperability to include on-chain storage and computing resources, allowing dApp developers to efficiently utilize services across multiple blockchains.'),
  }, {
    cardTitle: t('Enhanced Security and Privacy'),
    cardContent: t('Besides building upon the light client and zero-knowledge-proof technology, MAP Protocol further strengthened its security using the Bitcoin network to prevent long-range attacks.'),
  }, {
    cardTitle: t('Developer-Friendly Platform'),
    cardContent: t('With its Web3 user gateway and developer portal, MAP Protocol provides the necessary toolsets for developers to build and deploy cross-chain applications, effectively acting as a catalyst for blockchain innovation.'),
  }, {
    cardTitle: t('User Empowerment'),
    cardContent: t('Users can create a MAP Protocol account with ease and explore or contribute to the omnichain ecosystem. No central authority can change the rules or restrict access, thus offering users unparalleled control.'),
  }, {
    cardTitle: t('Peer-to-Peer Network'),
    cardContent: t("The MAP Protocol omnichain network allows for peer-to-peer transactions and interactions, upholding the original decentralization ethos of blockchain technology while offering the advantages of cross-chain capabilities."),
  }]
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <CustomHead
        title={t('What is MAP Protocol?') + ' - ' + 'Map Protocol'}
      />
      <div  className={fade} >
        <div className={styles.mainLeft}>
          <div className={styles.pretitle}>{t('What is MAP Protocol?')}</div>
          <div className={styles.title}>{t('A Bitcoin layer-2. The foundation for Interoperability')}</div>
          <div className={styles.desc}>{t("A complete beginner's guide to how MAP Protocol works, the benefits it brings, and how it can bring a truly interoperable future where assets, storage, and computing are all on-chain and interoperable into a reality.")}</div>

          {/*<div className={styles.getMapButton}><Button*/}
          {/*  onClick={() => {*/}
          {/*    Router.push('/article?id=understand-bitcoin')*/}
          {/*  }}*/}
          {/*  variant="contained">{t('What is Bitcoin layer-2')}</Button></div>*/}
        </div>
        <div className={styles.mapCoinsImage}>
          <Image
            fill
            objectFit="contain"
            src="/images/home-page/home-page-content-3.png"
            alt="home-page-content-3" />
        </div>
      </div>

      <div className={styles.geteway}>
        <div className={styles.getewayImage}>
          <Image
            fill
            objectFit="contain"
            src="/images/map-coin-colors.png"
            alt="map-coin-colors" />
        </div>
        <div className={styles.getewayRight}>
          <div className={styles.summaryTitle}>
            {t('The user gateway to Web3')}
          </div>
          <div className={styles.summaryDesc}>
            {t('Hardcore technical details and complicated cross-chain steps hold new users back from entering the Web3 world. MAP Protocol makes navigating Web3 intuitive. In MAP Protocol, users only need to know the fact that they have full ownership over their assets, and when they move assets from one chain to another, it is purely peer-to-peer, and no third party could ever intervene.')}
          </div>

          <div className={styles.summaryTitle}>
            {t('The all-in-one developer portal')}
          </div>
          <div className={styles.summaryDesc}>
            {t('Data sovereignty is at the core of Web3, meaning that users have full ownership over their data. To build a Web3 app, developers need to combine the functionality of different blockchains so that user assets, storage, and computing are all on-chain. Through MAP Protocol, developers can seamlessly compose different blockchain components and build apps where users have control over their data and assets.')}
          </div>

          <div className={styles.summaryTitle}>
            {t('The guardian for the free and peer-to-peer flow of assets')}
          </div>
          <div className={styles.summaryDesc}>
            {t('Web3 is the new Internet of value. The flow of Internet value can face safety concerns and challenges from third parties. While the flow of assets in a single blockchain is already peer-to-peer, MAP Protocol takes it one step further by enabling assets on different blockchains to flow in a purely peer-to-peer way.')}
          </div>
        </div>
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryTitle}>
          {t('Summary')}
        </div>
        <div className={styles.summaryDesc}>
          {t('MAP Protocol provides the essential omnichain infrastructure for achieving interoperability among blockchain-based assets, storage, and computing. Built upon the light client and zero-knowledge proof technology, our interoperable cross-chain solution is peer-to-peer, without any trusted third-party entities. The MAP Protocol network serves as a Web3 user gateway and developer portal, empowering users and developers to use and build anything cross-chain in a peer-to-peer way.')}
        </div>
        <div className={styles.summaryDesc}>
          {t('You can create a MAP Protocol account from anywhere, at any time, and explore omnichain apps or build your own. The core innovation is that you can do all things cross-chain without trusting a central authority that could change the rules or restrict your access.')}
        </div>
      </div>

      <div className={styles.cardListTitle}>
        {t('What can MAP Protocol do?')}
      </div>
      <div className={styles.cardList}>
        {cardData.map((item, index) => <GetMapCard key={index} cardInfo={item} index={index} />)}
      </div>
    </>
  )
}

