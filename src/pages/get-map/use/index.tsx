import * as React from 'react';
import styles from './index.module.css'
import Accordion from '@mui/material/Accordion';
import Image from 'next/image'
import { useTranslation, Trans } from 'next-i18next';
import Link from 'next/link';
import { Button } from '@mui/material';
import Router from 'next/router';

interface CardInfo {
    cardTitle: String,
    cardContent: String,
    color: String,
    cardLinkText?: String
}


const GetMapCard = ({ cardInfo, index }: { cardInfo: CardInfo, index: Number }) => {

    return (
        <div className={styles.card} style={{
            backgroundColor: cardInfo.color as string,
            height: index == 0 ? "100%" : "46.9%",
            paddingBottom: index == 0 ? "96px" : '24px'
        }}>
            <div className={styles.cardTitle}>
                <Image
                    width={29}
                    height={29}
                    className={styles.cardIcon}
                    src={`/fonts/get-map/use${index}.png`}
                    alt="" />{cardInfo.cardTitle}</div>
            <div className={styles.cardDesc}>{cardInfo.cardContent}</div>
            
            {index == 0 && <div className={styles.learnMoreButton} >
                <Button onClick={()=>{
                    Router.push('/article?id=hot-wallets-vs-cold-wallets')
                }} variant="contained">
                    {cardInfo.cardLinkText}
                </Button></div>}
        </div>
    )
}
export default function UseMapCoin() {
    const { t } = useTranslation('get-map-2');


    const cardData: Array<CardInfo> = [{
        cardTitle: t('Store/Hold MAPO'),
        cardContent: t("Many personal investors hold their MAPO with the expectation that it will increase in value. You can store your MAP on your exchanges' wallets(such as Bithumb) or MAPO on crypto wallets( such as Metamask), if you wish to store them for the long term, you can store them in a cold wallet instead of a hot wallet."),
        color: '#F4F7FF',
        cardLinkText: t('Learn More'),
    },
    {
        cardTitle: t("Trade MAPO"),
        cardContent: t("You can trade MAPO for other cryptocurrencies on crypto exchanges. Cex or Dex exchanges offer some trading pairs for MAPO/MAP trading to meet your needs."),
        color: '#F7F6FD',
    }, {
        cardTitle: t("Transfer MAPO"),
        cardContent: t("Unlike sending money overseas, you can send MAPO to anyone in the world virtually instantly."),
        color: '#FDF6FA',
    }, {
        cardTitle: t("Earn MAPO"),
        cardContent: t("Earn Rewards by staking coins. Staking is a great way to maximize your holdings in staking coins that would otherwise be sitting in a wallet or trading account."),
        color: '#F6FDF8',
    }, {
        cardTitle: t("Purchasing Goods"),
        cardContent: t("Some online platforms or offline shops accept crypto as payments. You can purchase goods or services from these places."),
        color: '#FDF9F6',
    }]
    return (
        <>
            <div className={styles.safe}>
                <div className={styles.safeLeft}>
                    <div className={styles.title}>{t('Keep your MAPO safe')} </div>
                    <div className={styles.content}>{t("MAP Protocol isn't controlled by any single organization - it is decentralized.")} </div>
                    <div className={styles.content}>{t("This means you need to take the security of your funds seriously. With MAPO, you’re not trusting a bank or company to look after your assets, you’re taking responsibility for yourself.")} </div>

                    <div className={styles.subtitle}>{t('Keep your MAPO in your Own Wallet')} </div>
                    <div className={styles.content}>{t("This means you don't have to trust any third party with your assets, and you are protected from any custodian acting dishonestly, going bankrupt, or getting hacked. However, it also means you take responsibility for your own security.")} </div>

                    <div className={styles.subtitle}>{t('Check MAPO Transactions')} </div>
                    <div className={styles.content}>  <Trans ns="get-map-2" i18nKey="You can check your MAPO transactions on MAPO Scan, a blockchain explorer for developers and users to monitor cross-chain transactions and activities on the MAP Relay Chain more efficiently." components={{
                        link1: <Link target="_blank" href={"https://maposcan.io/"} ></Link>
                    }} />
                    </div>

                    <div className={styles.subtitle}>{t('Follow Wallet Instructions')} </div>
                    <div className={styles.content}>{t("If you lose access to your account, you’ll lose access to your funds. Your wallet should give you instructions on protecting against this. Be sure to follow them carefully – in most cases, no one can help you if you lose access to your account.")} </div>

                </div>
                <div className={styles.keepSafeImage}>
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/map-coin-safe.png"
                        alt="map-coin-safe" />
                </div>


            </div>


            <div className={styles.use}>
                <div className={styles.title}>{t('Use your MAPO')} </div>
                <div className={styles.useContent}>{t("There are several ways for you to use your MAPO after you have successfully obtained it.")} </div>
            </div>
            <div className={styles.cardList}>
                <div className={styles.cardCol}>
                    <GetMapCard cardInfo={cardData[0]} index={0} />
                </div>
                <div className={styles.cardCol}>
                    <GetMapCard cardInfo={cardData[1]} index={1} />
                    <GetMapCard cardInfo={cardData[2]} index={2} />
                </div>
                <div className={styles.cardCol}>
                    <GetMapCard cardInfo={cardData[3]} index={3} />
                    <GetMapCard cardInfo={cardData[4]} index={4} />
                </div>

            </div>
        </>
    );
}

