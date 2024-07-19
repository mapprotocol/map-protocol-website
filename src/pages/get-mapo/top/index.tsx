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
        src={`/fonts/getMapTop${index}.png`}
        alt="" />
      <div className={styles.cardTitle}>{cardInfo.cardTitle}</div>
      <div className={styles.cardDesc}>{cardInfo.cardContent}</div>

      <div onClick={() => {
        index < 3
          ? handleButtonClick(cardInfo.cardLink) : Router.push(cardInfo.cardLink as Url)
      }} className={styles.cardLink}>{cardInfo.cardLinkText} <Image
          width={11}
          height={11}
          src={`/fonts/more.svg`}
          alt="" /></div>
    </div>)
}

export default function GetMapTop(

) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation('get-map-1');
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

  const cardData: Array<CardInfo> = [
  {
    cardTitle: t('Decentralized Exchanges (DEXs)'),
    cardContent: t('DEXs give you more control over your funds. With a DEX, you can trade MAPO with more freedom and flexibility.'),
    cardLink: 'dexs',
    cardLinkText: t('Go to a DEX'),
  }, {
    cardTitle: t('Centralized Exchanges (CEXs)'),
    cardContent: t('CEXs are businesses that let you buy crypto using traditional currencies. They have custody over any MAPO you buy until you send it to a wallet you control.'),
    cardLink: 'cexs',
    cardLinkText: t('Find a CEX'),
  }, {
    cardTitle: t('Wallets'),
    cardContent: t('Some wallets let you buy crypto with a debit/credit card, bank transfer, or even Apple Pay. Geographical restrictions apply.'),
    cardLink: '/find-a-wallet',
    cardLinkText: t('Find a wallet'),
  }, {
    cardTitle: t('Staking rewards'),
    cardContent: t('If you already have some MAPO, you can earn more by running a validator node or voting for validators of your choice.'),
    cardLink: '/stake-mapo',
    cardLinkText: t('Learn more about staking'),
  }, {
    cardTitle: t('Earn MAPO'),
    cardContent: t('You can earn MAPO by working for MAPDAO or companies that pay in crypto, winning bounties, finding software bugs, and more.'),
    cardLink: '',
    cardLinkText: t('Learn about MAPDAO'),
  }]
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <CustomHead
        title={t('Get MAPO') + ' - ' + 'Map Protocol'}
      />
      <div className={fade} >
        <div className={styles.mainLeft}>
          <div className={styles.title}>{t('Where to Get MAPO')}</div>
          <div className={styles.desc}>{t('You can earn MAPO, or buy it from decentralized and centralized exchanges.')}</div>

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
          {/* <div className={styles.getMapButton}><Button variant="contained">{t('Get MAPO')}</Button></div> */}
        </div>
        <div className={styles.mapCoinsImage}

        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/map-coin-colors.png"
            alt="map-coin-colors" />
        </div>

      </div>
      <div className={styles.whatsMAPOText}>
        <HandTip style={{
          marginTop: '48px',
          background: "#F7F7F7",
          maxWidth:'719px',
         
        }}> {<div><Trans ns="get-map-1" i18nKey="New to MAP Protocol? Here's an overview to get you started. What's MAPO?" components={{
          link1: <Link href={"/what-is-mapo"} className={styles.linkText}></Link>,
        }} /></div>}</HandTip>
      </div>
      <div className={styles.cardList}>
        {cardData.map((item, index) => <GetMapCard key={index} cardInfo={item} index={index} />)}
      </div>


      <div id="mapo" className={styles.mapoDesc}>
        <div className={styles.mapCoinWallet}
          
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/map-coin-wallet.png"
            alt="map-coin-wallet" />
        </div>

        <div className={styles.mapoDescRight}>
          <div className={styles.mapoTitle}>{t('MAPO')}</div>

          <div className={styles.mapoContent}>
            <Trans ns="get-map-1" i18nKey="MAPO is the ticker name for MAP Protocol’s native token on the MAP Relay Chain, while MAP is the ticker name of MAP Protocol’s native token on other chains such as Ethereum, BNB Smart Chain, and Polygon. It can be obtained and traded directly in centralized exchanges such as Kucoin, Bithumb, Coinone, and MEXC Global." components={{
              link1: <Link target="_blank" href={"https://www.kucoin.com/ko/trade/MAP-USDT"} className={styles.linkText}></Link>,
              link2: <Link target="_blank" href={"https://www.bithumb.com/react/trade/order/MAP-KRW"} className={styles.linkText}></Link>,
              link3: <Link target="_blank" href={"https://coinone.co.kr/exchange/trade/mapo/krw"} className={styles.linkText}></Link>,
              link4: <Link target="_blank" href={"https://www.mexc.com/exchange/MAP_USDT?_from=search"} className={styles.linkText}></Link>,
              link5: <Link target="_blank" href={"https://www.Bitget.com/spot/MAPOUSDT"} className={styles.linkText}></Link>,
              link6: <Link target="_blank" href={"https://www.gate.io/trade/MAPO_USDT"} className={styles.linkText}></Link>,

              link7: <Link target="_blank" href={"https://www.htx.com/trade/mapo_usdt?type=spot"} className={styles.linkText}></Link>,
            }} /></div>

        </div>

      </div>
    </>
  )
}

