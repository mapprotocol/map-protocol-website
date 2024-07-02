import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';
import CardList from '@/components/ExploreCard';
import CardWithPagination from '@/components/CardWithPagination';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import queryMaprelayeChainData from '@/api/queryMaprelayeChainData';
import { convertToMillion, formatToMillionDollars, toThousands } from '@/utils/number';



export default function ColorsContent(

) {
    const [data, setData] = useState([
        {
            data: 0,
            text: 'Cross-chain assets powered by MAP Protocol'
        }, {
            data: '0',
            text: 'Accounts (wallets) with MAPO balance'
        },
        {
            data: '0',
            text: 'Smart contracts on MAP Protocol'
        },
        {
            data: '0',
            text: 'Number of transactions powered by MAP Protocol'
        },
        {
            data: '0',
            text: 'Total MAPO staked'
        },
        {
            data: '0',
            text: 'Number of nodes on MAP Protocol'
        }
    ])
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };
    const { t } = useTranslation(['what-is-map-protocol-3']);
    useEffect(() => {
        queryMaprelayeChainData().then((res) => {
            setData([
                {
                    data: formatToMillionDollars(res.data.crossAssetCount),
                    text: 'Cross-chain assets powered by MAP Protocol'

                }, {
                    data: toThousands(res.data.address),
                    text: 'Accounts (wallets) with MAPO balance'
                },
                {
                    data: toThousands(res.data.contract),
                    text: 'Smart contracts on MAP Protocol'
                },
                {
                    data: toThousands(res.data.txCount),
                    text: 'Number of transactions powered by MAP Protocol'
                },
                {
                    data: convertToMillion(res.data.staking),
                    text: 'Total MAPO staked'
                },
                {
                    data: res.data.validators,
                    text: 'Number of nodes on MAP Protocol'
                }
            ])
        })
    }, [])

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    return (
        <>
            <div className={styles.whyUseMap}>
                <div className={styles.title}>
                    {t('Why would I use MAP Protocol?')}
                </div>
                <div className={styles.whyUseMapContent}>
                    <CardWithPagination />
                    <div className={styles.contentImage}
                        style={{
                            position: 'relative',
                            width: '397px',
                            height: '390px',
                        }}
                    >
                        <Image
                            fill
                            style={{ objectFit: "contain" }}
                            src="/images/article/bitcoin.png"
                            alt="bitcoin" />
                    </div>
                </div>
            </div>


            <div className={styles.mapStats}>
                <div className={styles.statsTitle}>
                    {t('MAP Protocol stats')}
                    <Image
                        aria-describedby={id}
                        onClick={handleClick}
                        width={24}
                        height={24}
                        className={styles.tipIcon}
                        src="/fonts/tip-1.svg"
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
                            <Link href="https://maposcan.io/" target="_blank" >
                                {'maposcan.io'}
                            </Link></Typography>
                    </Popover>
                </div>
                <div className={styles.table}>
                    {data.map((item, index) =>
                        <div key={index} className={styles.tableItem}>
                            <div className={styles.tableData}>{item.data}</div>
                            <div className={styles.tabletext}>{t(item.text)} </div>
                        </div>)}
                </div>
            </div>
            <div className={styles.contentItem}>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                        // transform: 'translateY(48px)'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/run-a-node/run-a-node.png"
                        alt="get-start-1" />
                </div>
                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('Who runs MAP Protocol?')}
                    </div>
                    <div className={styles.desc}>
                        {t('MAP Protocol is not controlled by any particular entity. It exists whenever there are connected computers running software following the MAP Protocol and adding to the MAP Protocol blockchain. Each of these computers is known as a node. Nodes can be run by anyone, although to participate in securing the network you have to stake MAPO (MAP Protocol’s native token).')}
                    </div>

                    <div className={styles.button}>
                        <Button
                            onClick={() => {
                                Router.push('/run-a-node')
                            }}
                            variant="contained">{t('Run a node')}</Button></div>
                </div>

            </div>
            <div className={styles.contentItem}>
                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('What is MAP Relay Chain?')}
                    </div>
                    <div className={styles.desc}>
                        {t("MAP Relay Chain is an EVM-compatible blockchain built upon the Proof-of-Stake mechanism and Byzantine Fault Tolerant consensus and lives on MAP Protocol’s Protocol Layer. It proactively extends and supports heterogeneous blockchains' features in the virtual machine and constructs a gas-efficient light-client verification network.")}
                    </div>
                    <div className={styles.desc}>
                        {t('The main purpose of MAP Relay Chain is to maintain light clients of all interested blockchains and facilitate trustless verification of cross-chain messages. Validators on MAP Relay Chain are key to guaranteeing the diversity and robustness of the omnichain network. MAPO is the cryptocurrency used to pay network fees iccured on MAP Relay Chain.')}
                    </div>
                    <div className={styles.button}>
                        <Button style={{
                            marginRight: "12px"
                        }}
                            onClick={() => {

                                Router.push('/article?id=introducing-the-MAP-relay-chain')
                            }}
                            variant="contained">{t('More on MAP Relay Chain')}</Button>
                    </div>
                </div>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/home-page/home-page-content-4.png"
                        alt="home-page-content-4" />
                </div>
            </div>
            <div className={styles.contentItem}>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                        // transform: 'translateY(48px)'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/home-page/get-start-1.png"
                        alt="get-start-1" />
                </div>
                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('What is MAP Omnichain Service (MOS)?')}
                    </div>
                    <div className={styles.desc}>
                        {t('MOS is the acronym for MAP Omnichain Service, which is the second layer of MAP Protocol. Similar to Google Mobile Services to Android developers, MOS empowers dApp developers to build cross-chain or omnichain applications with ease. This layer consists of Vaults and Data deployed on each chain, and Messenger Program to transmit messages between chains.')}
                    </div>
                    <div className={styles.desc}>
                        {t('DApp developers can independently run MOS or use services provided by MOS. They can also use Vaults and Data in MOS and share Vaults and Data liquidity with other applications. Messenger Program is an SDK, deployed, operated, and maintained by dApp developers themselves. DApp developers can also independently and flexibly incentivize messenger contributors to transmit omnichain messages for the dApp.')}
                    </div>
                    <div className={styles.button}>
                        <Button
                            onClick={() => {
                                Router.push('/article?id=understanding-MAP-omnichain-service')
                            }}
                            variant="contained">{t('More on MAP Protocol')}</Button></div>
                </div>

            </div>
            <div className={styles.contentItem}
            >

                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('Meet MAPO, MAP Protocol’s native currency')}
                    </div>
                    <div className={styles.desc}>
                        {t('Many actions on the MAP Protocol network require some work to be done on the MAP Relay Chain. This computation is not free; it is paid for using MAP Protocol’s native cryptocurrency called MAPO. This means you need at least a small amount of MAPO to use the network.')}
                    </div>
                    <div className={styles.desc}>
                        {t('MAPO is purely digital, and you can send it to anyone anywhere in the world instantly. The supply of MAPO isn’t controlled by any government or company — it is decentralized and completely transparent. MAPO is issued in a precise manner according to the protocol.')}
                    </div>
                    <div className={styles.button}>
                        <Button style={{
                            marginRight: "12px"
                        }}
                            onClick={() => {
                                Router.push('/what-is-mapo')
                            }}
                            variant="contained">{t('What is MAPO?')}</Button>

                        <Button
                            onClick={() => {
                                Router.push('/get-mapo')
                            }}
                            variant="outlined">{t('Get MAPO')}</Button>
                    </div>

                </div>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',

                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/stake-mapo/stake-mapo-top.png"
                        alt="stake-mapo" />
                </div>
            </div>

            <div className={styles.contentItem}
            >
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                        // transform: 'translateY(48px)'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/home-page/home-page-content-2.png"
                        alt="home-page-content-2" />
                </div>
                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('Network fees on MAP Protocol')}
                    </div>
                    <div className={styles.desc}>
                        {t('Network fees on MAP Protocol’s mainnet are called gas fees. These are small charges incurred for the computational efforts required to process transactions on the MAP Relay Chain. These fees serve as a mechanism to fairly allocate network resources and discourage spam or malicious activities.')}
                    </div>
                    <div className={styles.desc}>
                        {t('Unlike typical blockchain platforms where gas fees are a standard feature, MAP Protocol only charges gas fees for cross-chain transactions processed on the MAP Relay Chain. The more complex the transaction, the higher the gas fees. Fees are also influenced by network congestion; during times of high activity, fees might go up.')}
                    </div>
                    <div className={styles.button}>
                        <Button onClick={() => {
                            Router.push('/article?id=gas-fee')
                        }} variant="contained">{t('More on gas fees')}</Button>
                    </div>
                </div>

            </div>
            <CardList />
        </>
    )
}

