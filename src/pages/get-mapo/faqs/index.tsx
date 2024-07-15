import * as React from 'react';
import styles from './index.module.css'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation, Trans } from 'next-i18next';
import Image from 'next/image'
import Link from 'next/link';
import { Ul } from '@/components/Ul';
import { Li } from '@/components/Li';
import { AccordionMap } from '@/components/Accordion';



export default function GetMapFaqs() {

    const { t } = useTranslation('get-map-2');
    const accordionData = [
        {
            title: t('How do I add MAP Relay Chain to my Metamask/Token Pocket/Particle wallet?'),
            content: <>
                <Ul title={t('Metamask or Token Pocket Wallet Users')}>
                    <Li title={t('Enter the following chain info to add')}>
                        <div >{t('Network name: MAP Relay Chain (You can also enter MAP Mainnet)')}</div>
                        <div >{t('New RPC URL')}</div>
                        <div >{t('Chain ID: 22776')}</div>
                        <div >{t("Currency symbol: MAPO")}</div>
                        <div >
                            <Trans ns="get-map-2" i18nKey="Block explorer URL: https://maposcan.io/" components={{
                                link1: <Link target="_blank" href={"https://maposcan.io/"} className={styles.linkText}></Link>
                            }} /></div>
                    </Li>
                </Ul>
                <div style={{ marginTop: '20px' }}>
                    <Ul title={t('Particle Wallet Users')}>
                        <Li title={t('Log in to your Particle Wallet account')}> </Li>
                        <Li title={t('Search and choose “MAP Relay Chain” in the search bar')}></Li>
                        <Li title={t('Check the network name on the wallet page')}></Li>
                    </Ul>
                </div>
            </>
        },
        {
            title: t('How do I add MAP to my wallet?'),
            content: <>
                <div>
                    {t('MAP is available on Ethereum, BNB Smart Chain, and Polygon. You can follow the guide below to add MAP to your Metamask wallet.')}
                </div>
                <div style={{ fontWeight: 500 }}>
                    {t('*IMPORTANT: To make sure you have entered the correct contract address, please copy the contract addresses in the explorers. Do not copy the address in the article directly.')}
                </div>
                <Ul title={t('If you’re on Ethereum')}>
                    <Li title={t('Click “Import tokens” on Metamask')}></Li>
                    <Li title={t("Enter “Custom token”")}></Li>
                    <Li title={<Trans ns="get-map-2" i18nKey="View the contract address 0x9E976F211daea0D652912AB99b0Dc21a7fD728e4 on Etherscan" components={{
                        link1: <Link target="_blank" href={"https://etherscan.io/token/0x9e976f211daea0d652912ab99b0dc21a7fd728e4"} className={styles.linkText}></Link>,
                    }} />}></Li>
                    <Li title={t('Copy and paste it back to Metamask')}></Li>
                    <Li title={t('Add the token symbol MAP')}></Li>
                </Ul>
                <Ul title={t('If you’re on BNB Chain')}>
                <Li title={t('Click “Import tokens” on Metamask')}></Li>
                    <Li title={t("Enter “Custom token”")}></Li>
                    <Li title={<Trans ns="get-map-2" i18nKey="View the contract address 0x8105ECe4ce08B6B6449539A5db23e23b973DfA8f on BSC Scan" components={{
                        link1: <Link target="_blank" href={"https://bscscan.com/address/0x8105ECe4ce08B6B6449539A5db23e23b973DfA8f"} className={styles.linkText}></Link>,
                    }} />}></Li>
                    <Li title={t('Copy and paste it back to Metamask')}></Li>
                    <Li title={t('Add the token symbol MAP')}></Li>
                </Ul>
                <Ul title={t('If you’re on Polygon')}>
                    <Li title={t('Click “Import tokens” on Metamask')}></Li>
                    <Li title={t("Enter “Custom token”")}></Li>
                    <Li title={<Trans ns="get-map-2" i18nKey="View the contract address 0xBAbceE78586d3e9E80E0d69601A17f983663Ba6a on Polygon Scan" components={{
                        link1: <Link target="_blank" href={"https://polygonscan.com/address/0xBAbceE78586d3e9E80E0d69601A17f983663Ba6a"} className={styles.linkText}></Link>,
                    }} />}></Li>
                    <Li title={t('Copy and paste it back to Metamask')}></Li>
                    <Li title={t('Add the token symbol MAP')}></Li>
                </Ul>
            </>, // Add content for this item
        },
        
        {
            title: t('How do I transfer MAP across Ethereum, BNB Smart Chain, Polygon, Klaytn, and others?'),
            content: <Trans ns="get-map-2" i18nKey="In the world of cryptocurrencies, transferring assets from one chain to another usually requires using a bridge. However, when transferring MAP across different chains, you can simply go to ButterSwap to easily exchange your MAP on different chains in a peer-to-peer way. To get MAPO on MAP Relay Chain, you can also use ButterSwap." components={{
                link1: <Link target="_blank" href={"https://www.butterswap.io/"} className={styles.linkText}></Link>,
            }} />,
        },
        {
            title: t('How do I transfer MAP from centralized exchanges to my wallet?'),
            content: <Trans ns="get-map-2" i18nKey="Your MAP in centralized exchanges is a type of ERC-20 token, which means it lives on the Ethereum. When transferring MAP to your wallet, make sure the target address is also on Ethereum. If you’d like to continue to transfer your MAP across BNB Smart Chain, Polygon, Klaytn, and MAP Relay Chain, simply use ButterSwap." components={{
                link1: <Link target="_blank" href={"https://www.butterswap.io/"} className={styles.linkText}></Link>,

            }} />,
        },
        {
            title: t('What do I do if a transaction on my wallet is pending or stuck?'),
            content: <Trans ns="get-map-2" i18nKey="If you find that your transaction on a wallet is pending or stuck, it could be due to various factors such as network congestion, low gas fees, or other technical issues. Depending on which chain your transaction is on, you can check your transaction status via blockchain explorers such as Etherscan, BscScan, PolygonScan, klaytnscope, and MapoScan." components={{
                link1: <Link target="_blank" href={"https://etherscan.io/"} className={styles.linkText}></Link>,
                link2: <Link target="_blank" href={"https://bscscan.com/"} className={styles.linkText}></Link>,
                link3: <Link target="_blank" href={"https://polygonscan.com/"} className={styles.linkText}></Link>,
                link4: <Link target="_blank" href={"https://scope.klaytn.com/"} className={styles.linkText}></Link>,
                link5: <Link target="_blank" href={"https://maposcan.io/"} className={styles.linkText}></Link>
            }} />
        },
        {
            title: t('Can I get my MAPO back if I send them to the wrong addresses?'),
            content: <>
                <div>{t('The possibility of recovering MAPO sent to the wrong address largely depends on the circumstances of the transaction and the involvement of the recipient. Here are a few scenarios:')}</div>
                <Li title={t('Send MAPO to a public address owned by someone you do not know: Unrecoverable unless the owner agrees to send them back.')}></Li>
                <Li title={t('Send MAPO to a public address not yet activated: Unrecoverable as no one has the private keys to the address.')}></Li>
                <Li title={t("Send MAPO to a contract address: Depends on the contract's code. If the contract has a function for recovery or is upgradeable, there might be a way. However, most contracts are not designed to send tokens back. Recovery is usually impossible.")}></Li>
                <Li title={t("Send MAPO to an exchange address: Maybe, depending on the exchange's policies and technical capabilities. Exchanges might have the ability to retrieve tokens but often charge a fee, so it can be costly and time-consuming.")}></Li>

                <Li title={<div><Trans ns="get-map-2" i18nKey="Send MAPO to your own address on another chain: Maybe, depending on the chain you send it to. If you send it to Ethereum, BNB Smart Chain, Polygon, Klaytn, and MAP Relay Chain, use ButterSwap to bring it back." components={{
                    link1: <Link target="_blank" href={"https://www.butterswap.io/"} className={styles.linkText}></Link>
                }} /></div>}></Li></>
        },
    ];


    return (<>
        <div className={styles.main}>
            <div className={styles.title}>{t('MAPO FAQs')} </div>

            <AccordionMap data={accordionData} />


        </div>
        <div className={styles.recovery}>
            <div className={styles.recoveryLeft}>
                <div className={styles.recoveryTitle}>{t('Tips for funds recovery')}</div>
                <Ul className={styles.recoveryItem} title={t('Always double-check addresses before confirming transactions.')}></Ul>
                <Ul className={styles.recoveryItem} title={t('Reaching out for professional help is advised if large sums are involved.')}></Ul>

                <Ul className={styles.recoveryItem} title={t('Always double-check addresses before confirming transactions.')}></Ul>

            </div>
            <div className={styles.mapCoinsImage}
                    style={{
                        position: 'relative', width: '456px', height: '212px'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/map-coin-recovery.png"
                        alt="map-coin-recovery" />
                </div>

          
        </div>
    </>
    );
}

