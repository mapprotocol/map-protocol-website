import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';

import { useEffect, useState } from 'react';
import { useMapPrice } from '@/hooks/useMapPrice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Router from 'next/router'
import { handleButtonClick } from '@/utils/dom';
import { Url } from 'next/dist/shared/lib/router/router';
import { HandTip } from '@/components/HandTip';
import { Li } from '@/components/Li';
import CustomHead from '@/components/CustimHead';
type Props = {
  // Add custom props here
}
interface CardInfo {
  cardTitle: String,
  cardContent: String,
  cardLink: string,
  cardLinkText: String
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

export default function GetMapTop(

) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation('what-is-mapo');
  const [fade, setFade] = useState(styles.main)
  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const mapPrice = useMapPrice()
  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cardData: Array<CardInfo> = [{
    cardTitle: t('Open to all, truly borderless'),
    cardContent: t("MAPO is open and accessible to anyone with an internet connection and a crypto wallet, transcending geographical boundaries."),
    cardLink: 'mapo',
    cardLinkText: t('View more details'),
  },
  {
    cardTitle: t('You have the full autonomy'),
    cardContent: t('MAPO users have full control over their funds and transactions, eliminating the need for intermediaries like banks or any other third parties.'),
    cardLink: 'dexs',
    cardLinkText: t('Go to a DEX'),
  }, {
    cardTitle: t('Privacy by default'),
    cardContent: t('MAPO prioritizes user privacy by default. While transactions are recorded on a public ledger, user identities are often pseudonymous.'),
    cardLink: 'cexs',
    cardLinkText: t('Find a CEX'),
  }, {
    cardTitle: t('Peer-to-peer, no third parties'),
    cardContent: t('You can send your MAPO without any intermediaries such as banks or payment processors. Sending MAPO is just like cash handover, but it’s online and secured by cryptography.'),
    cardLink: 'stake-mapo',
    cardLinkText: t('Find a wallet'),
  }, {
    cardTitle: t('Transparency and equity'),
    cardContent: t('All MAPO transactions are recorded on the MAP Relay Chain, ensuring transparency and immutability. This means you can verify transactions independently.'),
    cardLink: 'stake-mapo',
    cardLinkText: t('Learn more about staking'),
  }, {
    cardTitle: t('Code is law'),
    cardContent: t("MAPO operates based on predefined, immutable rules encoded in the software. The system's rules and monetary policy cannot be altered by any central authority."),
    cardLink: 'stake-mapo',
    cardLinkText: t('Learn about MAPDAO'),
  }]
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
       <CustomHead
        title={t('What is MAPO?') + ' - ' + 'Map Protocol'}
      />
      <div className={fade} >
        <div className={styles.mainLeft}>
          <div className={styles.pretitle}>{t('What is MAPO?')}</div>
          <div className={styles.title}>{t('Currency for the permissionless, digital future.')}</div>
          <div className={styles.desc}>{t('Currency of MAP Protocol omnichain apps.')}</div>

          <div className={styles.priceCard}>
            <div className={styles.priceTitle}>{t('Current MAPO Price（USD）')}
              <Image
                aria-describedby={id}
                onClick={handleClick}
                width={15}
                height={15}
                className={styles.tipIcon}
                src="/fonts/tip.svg"
                alt="" />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ padding: '8px 16px', marginTop: '2px' }}>{t('Data Source: ')}
                  <Link href="https://www.coingecko.com/" target="_blank" >
                    {'coingecko.com'}
                  </Link></Typography>
              </Popover></div>

            <text className={styles.priceNumber}>{`$${mapPrice.usd}`}</text>
            <div className={styles.change}>
              <text className={styles.changeNumber} style={{
                color: mapPrice.simbol == 0 ? '#E32222' : '#35B600',
                backgroundColor: mapPrice.simbol == 0 ? '#F7E3E3' : '#EAF7E4',
              }}>{`${mapPrice.usd_24h_change}%`}  {mapPrice.simbol == 0 ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}</text>

              <text className={styles.changeDesc}>{t('(LAST 24 HOUR)')}</text>
            </div>
          </div>
          <div className={styles.getMapButton}><Button onClick={() => {
            Router.push('/get-mapo')
          }} variant="contained">{t('Get MAPO')}</Button></div>
        </div>
        <div className={styles.mapCoinsImage}>
          <Image
            fill
            objectFit="contain"
            src="/images/home-page/home-page-content-1.png"
            alt="home-page-content-1" />
        </div>

      </div>
      <div className={styles.listTitle}>
        <div className={styles.cardListTitle}>
          {t("MAPO is a cryptocurrency. It is the digital money that opens the door for you to access the Bitcoin-level peer-to-peer omnichain network. If you’re new to crypto, here's how MAPO differs from traditional money.")}
        </div>

      </div>

      <div className={styles.cardList}>
        {cardData.map((item, index) => <GetMapCard key={index} cardInfo={item} index={index} />)}
      </div>

      <div className={styles.centerContent}>
        <HandTip style={{
          marginTop: '20px',
          marginBottom: '50px',
          maxWidth: '100%',
          padding: '24px',
          fontWeight: '400',
        }}> {<div>
          <div>{t("Want to buy some MAPO? It's common to mix up MAP and MAPO. MAPO is the ticker name on the MAP Relay Chain, while MAP is the name on other chains.")}</div>
          <div style={{ marginTop: '6px' }}>{
            <Trans ns="what-is-mapo" i18nKey="To explore the MAP Protocol ecosystem,  MAPO is what you're probably looking to buy. More on Get MAPO." components={{
              link1: <Link href={"/get-mapo"} ></Link>,
            }} />}</div>
        </div>}
        </HandTip>

        <div className={styles.centerTitle}>
          {t('What’s unique about MAPO?')}
        </div>
        <div className={styles.centerDesc}>
          {t('There are many cryptocurrencies and lots of other tokens in the blockchain space, but there are some things that only MAPO can do.')}
        </div>
        <div className={styles.centerImage}>
          <Image
            fill
            objectFit="contain"
            src="/images/home-page/home-page-content-3.png"
            alt="home-page-content-1" />
        </div>

      </div>

      <div className={styles.textContent}>
        <div className={styles.textTitle}>
          {t('MAPO fuels MAP Protocol')}
        </div>
        <p>
          {t("MAPO is the heart of MAP Protocol. When you send MAPO or use an app on MAP Protocol, you'll pay a fee in MAPO to use the MAP Protocol network. This fee serves as an incentive for a block producer to process and verify your activity on the network.")}
        </p>
        <p>
          {t("Validators are like the gatekeepers of MAP Protocol—they check and ensure all the transactions are valid and accurate. They are randomly selected to verify new translations and add them to a blockchain. Validators will be rewarded with a small amount of MAPO for the work they do.")}
        </p>
        <p>
          {<Trans ns="what-is-mapo" i18nKey="There are certain hardware and software requirements you need to meet to become a validator. You can check out the details on Run a Node." components={{
            link1: <Link href={"/run-a-node"} ></Link>,
          }} />}
        </p>
        <p>
          {<Trans ns="what-is-mapo" i18nKey="Besides those requirements, validators also need to stake a certain amount of MAPO to help secure the whole MAP Protocol network and earn rewards. If prefer to secure the omnichain network without building a node, you can still participate in staking by delegating your MAPO. More on staking." components={{
            link1: <Link href={"/stake-mapo"}></Link>,
          }} />}
        </p>
        <div onClick={() => {
          Router.push('/what-is-map-protocol')
        }} className={styles.textCard}>
          <div className={styles.textCardLeft}>
            <div className={styles.textCardImage}
            >
              <Image
                fill
                objectFit="contain"
                src="/images/map-coin-colors.png"
                alt="home-page-content-1" />
            </div>
          </div>
          <div className={styles.textCardRight}>
            <div className={styles.textCardTitle}>
              {t('What is MAP Protocol?')}</div>
            <div className={styles.textCardDesc}>{t('To know more about MAP Protocol — the technology behind MAPO, check out the info on this page.')}</div>
          </div>
        </div>
        <div className={styles.textTitle}>
          {t('MAPO underpins the omnichain financial system')}
        </div>
        <p>
          {t("Moving beyond mere transactions, the omnichain community is crafting an all-encompassing financial network that is peer-to-peer and universally accessible.")}
        </p>
        <p>
          {t("Currently, users can earn MAPO through staking. However, as MAP Protocol evolves and expands, forthcoming functionalities like borrowing and lending will be introduced, broadening the utility of MAPO.")}
        </p>
        <div className={styles.textTitle}>
          {t('Uses for MAPO grow every day')}
        </div>
        <p>
          {t("Because MAP Protocol is programmable, developers can shape MAPO in countless ways. Here are just some of the things you can do with MAPO.")}
        </p>
        <Li className={styles.li} title={
          <Trans ns="what-is-mapo" i18nKey="Swap tokens — you can trade MAPO with tokens on multiple different chains." components={{
            link1: <Link target="_blank" href={"https://www.butterswap.io/?from=22776%3AMAPO"}></Link>,
          }} />
        }></Li>
        <Li className={styles.li} title={
          <Trans ns="what-is-mapo" i18nKey="Earn interest — stake MAPO and get rewarded." components={{
            link1: <Link target="_blank" href={"https://staking.mapprotocol.io/"}></Link>,
          }} />
        }></Li>
        <Li className={styles.li} title={
             <Trans ns="what-is-mapo" i18nKey="Get stablecoins — access the world of cryptocurrencies with a steady, less volatile value." components={{
              link1: <Link  href={"/article?id=introduction-to-stablecoins"}></Link>,
            }} />
          }></Li>

      </div>
    </>
  )
}

