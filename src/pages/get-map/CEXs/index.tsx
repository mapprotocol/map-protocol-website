import * as React from 'react';
import styles from './index.module.css'
import { useTranslation, Trans } from 'next-i18next';
import Link from 'next/link';
import { useMapTickers } from '@/hooks/useMapTickers';
import { toThousands } from '@/utils/number';
import Image from 'next/image'


const accordionSx = {
    marginBottom: '10px',
    backgroundColor: '#F7F7F7',
    borderRadius: '10px',
    borderStyle: 'none',
    boxShadow: 'none',
    overflow: 'hidden'
}
export default function GetMapCEXs() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const { t } = useTranslation('get-map-1');
    const tickers = useMapTickers()
    const steps = [
        {
            title: t("Step") + " 1",
            description: t("Register an account on a CEX's official website or its app. (Check Exchange Ranking by CoinGecko)"),
            subDescription: t("If a CEX supports one-step sign-up with your social account, you can sign up with your social account directly.")
        },
        {
            title: t("Step") + " 2",
            description: t("Verify your identity and secure your CEX's account. You are typically required to have a government-issued identification document."),
            subDescription: t("For asset security, it’s recommended to enable Two-step Verification.")
        },
        {
            title: t("Step") + " 3",
            description: t("Use fiat to buy USDT, ETH, BTC, or any other tokens supported. You can use the OTC option right in a CEX."),
            subDescription: t("Additionally, you can use an onramp platform that has your desired fiat-to-crypto option.")
        },
        {
            title: t("Step") + " 4",
            description: t("Transfer the USDT, BTC, etc. you purchased by fiat to a CEX that supports MAP trading."),
            subDescription: t("If the CEX you use supports onramp and the MAP-USDT or MAP-BTC trading pair at the same time, you can skip this.")
        },
        {
            title: t("Step") + " 5",
            description: t("Buy MAP in the spot market via the MAP-USDT or MAP-BTC trading pair."),
            subDescription: t("In the spot market, select either the “Limit” or “Market” option based on your trading preference.")
        },
    ];
    return (<>
        <div id={"cexs"} className={styles.exchanges}>
            <div className={styles.title}>{t('On Centralized Exchanges (CEXs)')} </div>
            <div className={styles.content}>{t('Centralized exchanges are platforms that are managed by a single entity or company. They act as middlemen between buyers and sellers of cryptocurrencies, similar to traditional stock exchanges.')} </div>
            <div className={styles.content}> 
             <Trans ns="get-map-1" i18nKey="ERC-20 MAP (MAP Protocol's native token on Ethereum) is available on Kucoin, Bithumb, Coinone and MEXC Global. MRC-20 MAPO (MAP Protocol's native token on MAP Relay Chain thus the MAPO Mainnet) is available on LBank." components={{
                link1: <Link target="_blank" href={"https://www.kucoin.com/ko/trade/MAP-USDT"} className={styles.linkText}></Link>,
                link2: <Link target="_blank" href={"https://www.bithumb.com/react/trade/order/MAP-KRW"} className={styles.linkText}></Link>,
                link3: <Link target="_blank" href={"https://coinone.co.kr/exchange/trade/map/krw"} className={styles.linkText}></Link>,
                link4: <Link target="_blank" href={"https://www.mexc.com/exchange/MAP_USDT?_from=search"} className={styles.linkText}></Link>,
                link5: <Link target="_blank" href={"https://www.lbank.com/trade/mapo_usdt/"} className={styles.linkText}></Link>

            }} /> </div>

            <div className={styles.form}>
                <div className={styles.formItem}   >
                    <div>{t('Exchange')}</div>
                    <div>{t('Pairs')}</div>
                    <div>{t('Price')}</div>
                    <div>{t('+2% Depth')}</div>
                    <div>{t('-2% Depth')}</div>
                    <div>{t('24h Volume')}</div>
                    <div>{t('Updated')}</div>
                </div>
                {tickers.map((item, index) => <div className={styles.formItem} key={index}>
                    <div className={styles.dexTitle}><Image
                        width={28}
                        height={28}
                        src={`/images/${item.name}.webp`}
                        alt="logo" />{item.name}</div>
                    <div>{item.name =="DeGate"? "MAP/USDT":item.pairs}</div>
                    <div>{`$${item.price}`}</div>
                    <div>{`$${toThousands(item.cost_to_move_up_usd)}`}</div>
                    <div>{`$${toThousands(item.cost_to_move_down_usd)}`}</div>

                    <div>{`$${toThousands(item.volume)}`}</div>
                    <div>{t('Recently')}</div>

                </div>)}
            </div>

        </div>

        <div className={styles.trading}>
            <div className={styles.tradingTitle}>{t('Trading steps on CEXs')}</div>
            <div className={styles.tradingContent}>{t("Since the operation procedures vary from different CEXs, we can't provide you a step-by-step guide on how to buy tokens in all the CEXs, but here are some general steps.")}</div>
            <div className={styles.tradingContent}>{t("Some CEX may not be available in your country or area, you can consult the exchange's customer service or check the announcement from exchanges. As for the tax issue, you may also want to consult the local department for more information.")}</div>
            <div className={styles.steps} >
                {steps.map((step, index) => (
                    <div key={index} className={styles.step} >
                        <div className={styles.up}>
                            <div className={styles.round}>{index + 1}</div>
                            {index !== 4 &&<div className={styles.line}></div>}
                            </div>

                        <div className={styles.stepCard}>
                            <div className={styles.stepTitle}>{step.title}</div>
                            <div className={styles.stepDesc}>{index == 0 ? <Trans ns="get-map-1" i18nKey="Register an account on a CEX's official website or its app. (Check Exchange Ranking by CoinGecko)" components={{
                                link1: <Link target="_blank" href={"https://www.coingecko.com/en/exchanges"} className={styles.linkText}></Link>
                            }} /> : step.description}</div>
                            <div className={styles.stepDesc} style={{ marginTop: '16px' }}>{step.subDescription}</div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    </>

    );
}

