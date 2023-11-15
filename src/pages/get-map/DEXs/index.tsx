import * as React from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { useTranslation, Trans } from 'next-i18next';
import Router from "next/router"
import { Button, Box, Popover, Typography, Link } from '@mui/material';
import { Url } from 'next/dist/shared/lib/router/router';
interface CardInfo {
    cardTitle: string,
    cardContent: string,
    cardLink: string,
    swapLink: Url
}


const DexCard = ({ cardInfo, index }: { cardInfo: CardInfo, index: number }) => {
    let pngindex = index + 1
    return (<div className={styles.card}>
        <Image
            width={40}
            height={40}
            className={styles.cardIcon}
            src={`/fonts/dex${pngindex}.png`}
            alt="" />
        <div onClick={() => {
            //@ts-ignore
            window.open(cardInfo.swapLink, '_blank');
        }} className={styles.cardTitle}>{cardInfo.cardTitle}
            <Image
                width={15}
                height={15}
                src="/fonts/link.svg"
                alt="" /></div>

        <div className={styles.cardDesc}> <Trans ns="get-map-1" i18nKey={cardInfo?.cardContent as string & string[]} components={{
            link1: <Link target="_blank" href={cardInfo?.cardLink} className={styles.linkText}></Link>
        }} /></div>
        <div className={styles.cardLink}>
            <Trans ns="get-map-1" i18nKey="*If you would like to get MAPO instead of MAP, please go to Butter Swap to swap directly." components={{
                link1: <Link target="_blank" href={"https://www.butterswap.io/"} className={styles.linkText}>Butter Swap</Link>
            }} />
        </div>
    </div>)
}

export default function GetMapDEXs() {
    const { t } = useTranslation('get-map-1');
    const cardData: Array<CardInfo> = [{
        cardTitle: 'Hiveswap',
        cardContent: 'Hiveswap supports token exchanges on the MAP Relay Chain. You can get MAPO right within Hiveswap.',
        cardLink: '',
        swapLink: "https://swap.hiveswap.io/#/swap"
    },
    {
        cardTitle: 'Uniswap',
        cardContent: "Uniswap supports a diversity of tokens on Ethereum to exchange with MAP on Ethereum, which means the MAP you get on Uniswap will be in ERC-20 token standard.",
        cardLink: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-20/',
        swapLink: "https://app.uniswap.org/#/swap?outputCurrency=0x9e976f211daea0d652912ab99b0dc21a7fd728e4"

    }, {
        cardTitle: 'PancakeSwap',
        cardContent: "PancakeSwap supports tokens on BNB Smart Chain to exchange with MAP on BNB Smart Chain, which means the MAP you get on PancakeSwap will be in the BEP-20 token standard.",
        cardLink: "https://academy.binance.com/en/glossary/bep-20",
        swapLink: "https://pancakeswap.finance/swap?inputCurrency=0x8105ECe4ce08B6B6449539A5db23e23b973DfA8f&outputCurrency=BNB"
    }]

    return (
        <>
            <div id="dexs" className={styles.main}>
                <div className={styles.title}>{t('On Decentralized Exchanges (DEXs)')} </div>
                <div className={styles.subtitle}>{t("Decentralized exchanges operate without a central authority. Instead of using a trusted third party to safeguard funds in the transaction, they use code. The seller's MAP/ MAPO will only be transferred when payment is guaranteed. This type of code is known as a smart contract. More on smart contracts. To use d DEX, you will need a wallet to get started.")} </div>
                <div className={styles.findButton} >
                    <Button variant="contained">{t('Find a wallet')}</Button>
                </div>
                <div className={styles.swapTip}>
                    <Trans ns="get-map-1" i18nKey="You can get MAPO directly on Butter Swap and Hiveswap, and MAP on Uniswap, PancakeSwap, and Butter Swap." components={{
                        link1: <Link target="_blank" href={"https://www.butterswap.io/"} className={styles.linkText}></Link>,
                        link2: <Link target="_blank" href={"https://swap.hiveswap.io/#/swap"} className={styles.linkText}></Link>,
                        link3: <Link target="_blank" href={"https://app.uniswap.org/#/swap?outputCurrency=0x9e976f211daea0d652912ab99b0dc21a7fd728e4"} className={styles.linkText}></Link>,
                        link4: <Link target="_blank" href={"https://pancakeswap.finance/swap?inputCurrency=0x8105ECe4ce08B6B6449539A5db23e23b973DfA8f&outputCurrency=BNB"} className={styles.linkText}></Link>,
                        link5: <Link target="_blank" href={"https://www.butterswap.io/"} className={styles.linkText}></Link>
                    }} /></div>

                <div className={styles.butterSwap}>
                    <div className={styles.butterLeft}>
                        <div className={styles.buttertitle} >
                            <Image
                                width={34}
                                height={34}
                                src="/fonts/dex0.png"
                                alt="" />
                            <div className={styles.butterTitleText}> {'Butter Swap'}</div>
                            <Image
                                width={15}
                                height={15}
                                src="/fonts/link.svg"
                                alt="" />
                        </div>
                        <div className={styles.butterContent}> {t("Butter Swap supports seamless token movement from one chain to another in a trustless way. You can get MAP on Ethereum, BNB Smart Chain, Polygon, and NEAR and MAPO on MAP Relay Chain right within Butter Swap with different kinds of tokens you have in your wallet.")}</div>
                    </div>
                    <div className={styles.butterImage}

                    >
                        <Image
                            fill
                            style={{ objectFit: "contain" }}
                            src="/images/map-coin-swap.png"
                            alt="" />
                    </div>

                    <div className={styles.tip}>
                        <Image
                            width={15}
                            height={15}
                            className={styles.tipIcon}
                            src="/fonts/tip-white.svg"
                            alt="" />
                        <text className={styles.tipText}>   {t("IMPORTANT: Please double-check the token info and the chain info you have selected before confirming “Swap”.")}</text>
                    </div>
                </div>

            </div>
            <div className={styles.cardList}>
                {cardData.map((item, index) => <DexCard key={index} cardInfo={item} index={index} />)}
            </div>
        </>
    );
}

