import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './index.module.css'
import { useTranslation, Trans } from 'next-i18next';
import CloseIcon from '@mui/icons-material/Close';
import Router from 'next/router';
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/router';
import { languageCards } from '@/pages/language';
import { Button } from '@mui/material';
import Head from 'next/head';
export interface TabItem {
    name: string;
    path?: string;
}

interface TabsArray {
    [key: string]: TabItem[];
}
export const tabsArray: TabsArray = {
    'Bitcoin layer-2': [
        {
            name: 'Understand Bitcoin layer-2',
            path: '/article?id=understand-bitcoin'
        },
        {
            name: 'Security features',
            path: '/article?id=security-features'
        },
        {
            name: 'MAP Protocol as Bitcoin layer-2',
            path: '/article?id=map-as-bitcoin-layer2'

        }, {
            name: 'Understand BRC-20',
            path: '/article?id=understand-brc20'
        },
        {
            name: 'BRC 201: From BRC-20 to EVMs',
            path: '/article?id=from-BRC-20-to-EVMs'
        },
        {
            name: 'Unlocking Bitcoin ecosystem with MAP Protocol',
            path: '/article?id=unlocking-bitcoin-ecosystem'

        },

    ],
    'Use MAP Protocol': [
        // {
        //     name: 'Bitcoin layer-2',
        //     path: '/article?id=map-as-bitcoin-layer2'
        // },
        {
            name: 'Find a wallet',
            path: '/find-a-wallet'
        },
        {
            name: 'Get MAPO',
            path: '/get-map'

        },
        {
            name: 'Stake MAPO',
            path: '/stake-mapo'

        },
        {
            name: 'Run a node',
            path: '/run-a-node'

        },
        {
            name: 'OmniApp',
            path: '/article?id=omniapp'
        },
        {
            name: 'Decentralized finance (DeFi)',
            path: '/article?id=what-is-defi'

        },
        {
            name: 'Decentralized autonomous organizations (DAO)',
            path: '/article?id=what-are-DAOs'

        },
        // {
        //     name: 'Decentralized omnichain payment',
        //     path: '/get-map'

        // },
        {
            name: 'Omnichain token issuance',
            path: '/article?id=omnichain-token-issuance'

        },
        // {
        //     name: 'Decentralized omnichain identity',
        //     path: '/get-map'

        // },
    ],
    'Learn': [
        {
            name: 'What is MAP Protocol?',
            path: '/what-is-map-protocol'
        },
        {
            name: 'What is MAPO?',
            path: '/what-is-mapo'
        },
        {
            name: 'MAP Protocol WhitePaper',
            path: '/article?id=whitepaper'
        },
        {
            name: 'MAP Relay Chain',
            path: '/article?id=introducing-the-MAP-relay-chain'

        },
        {
            name: 'MAP Omnichain Serivice (MOS)',
            path: '/article?id=understanding-MAP-omnichain-service'
        },
        {
            name: 'MAP Protocol as Bitcoin layer-2',
            path: '/article?id=map-as-bitcoin-layer2'
        },
        {
            name: 'Gas fee',
            path: '/article?id=gas-fee'
        },
        {
            name: 'Omnichain and fully on-chain',
            path: '/article?id=a-truly-interoperable-future-onwards'
        },
        {
            name: 'Light clients',
            path: '/article?id=light-clients'
        },
        {
            name: 'Zero-knowledge proofs',
            path: '/article?id=zero-knoeledge-proofs'
        },
        {
            name: 'Refactor light clients with ZK-proof',
            path: '/article?id=refactor-light-clients-with-ZK-proof'
        },


        // {
        //     name: 'MAP Protocol staking',
        //     path: '/stake-mapo'
        // },


        // {
        //     name: 'MAP Protocol nodes',
        //     path: '/run-a-node'
        // },

        // {
        //     name: 'MAP Protocol roadmap',
        //     path: '/get-map'
        // },

        // {
        //     name: 'History of MAP Protocol',
        //     path: '/get-map'
        // },



        // {
        //     name: 'MAP Protocol glossary',
        //     path: '/get-map'
        // },
    ],
    'Developer': [
        // {
        //     name: 'Develoer’s home',
        //     path: '/find-a-wallet'
        // },
        {
            name: 'Documentation',
            path: 'https://docs.mapprotocol.io/'

        },
        {
            name: 'MAPO explorer',
            path: 'https://mapscan.io/'

        },
        {
            name: 'MAPO testnet explorer',
            path: 'https://testnet.maposcan.io/'

        },
        // {
        //     name: 'Tutorials',
        //     path: '/stake-mapo'

        // },
        // {
        //     name: 'Learn by coding',
        //     path: '/run-a-node'

        // },
        // {
        //     name: 'Set up local environment'
        // },
        // {
        //     name: 'Developer incubation',
        //     path: '/get-map'

        // },
    ],
    'Enterprise': [
        {
            name: 'MAP Protocol for enterprises',
            path: '/article?id=MAP-protocol-for-enterprise'
        },
    ],
    'Community': [
        {
            name: 'Community center',
            path: '/community'
        },
        {
            name: 'Online community',
            path: '/article?id=online-communities'

        },
        {
            name: 'Learn about MAPDAO',
            path: '/article?id=learn-about-MAPDAO'

        }
    ]
}
export const tabs = [
    'Bitcoin layer-2', 'Use MAP Protocol', 'Learn', 'Developer', 'Enterprise', 'Community'

]
const Header = (

) => {
    const [currentTab, setCurrentTab] = useState<string | null>(null);
    const [fade, setFade] = useState(styles.header)
    const { t } = useTranslation('common');
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const [languageLabel, setLanguageLabel] = useState('English')
    const navbarRef = useRef<any>(null);
    const [showPanel, setShowPanel] = useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    };

    const jumpRouter = (item: TabItem) => {
        if (item.name == 'Documentation')
            Router.push(router.locale == 'zh' ? 'https://mapo.gitbook.io/docs-zh/' : 'https://mapo.gitbook.io/docs-en/')
        else
            item?.path && Router.push(item.path)
    }


    const list = () => (
        <>
            <div
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                className={`${styles.customScrollbar}`}
            >
                {
                    <div className={`${styles.drawerList} ${styles.customScrollbar}`}>
                        <div className={`${styles.closeIcon}`}> <CloseIcon
                            style={{ cursor: 'pointer' }} onClick={toggleDrawer(false)} /></div>
                        {Object.keys(tabsArray).map((category) => (
                            <div key={category} className={styles.category}>
                                <div className={styles.categoryTitle}>{t(category)}</div>
                                <div>
                                    {tabsArray[category].map((item) => (
                                        <div onClick={() => jumpRouter(item)} className={styles.categoryItem} key={item.name}>
                                            <div >{t(item.name)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    );
    useEffect(() => {
        const headerVisibility = () => {
            if (window.pageYOffset > 100) {
                setFade(`${styles.header} ${styles.shadow}`)
            } else {
                setFade(`${styles.header}`)
            }
        };

        const handleOutsideClick = (e: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
                setCurrentTab(null);
                setShowPanel(false)
            }
        };

        window.addEventListener('click', handleOutsideClick);


        window.addEventListener("scroll", headerVisibility);
        setLanguageLabel(languageCards.find(item => item.id === router.locale)?.name || 'English')
        return () => {
            window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('scroll', headerVisibility);
        };

    }, [])

    const jumpToLanguageSelect = () => {
        if (router.pathname !== "/language")
            Router.push(`/language?from=${router.asPath}`)
    }

    return (
        <>
            <header className={fade}>
                <div onClick={() => {
                    Router.push('/')
                }} className={styles.logoImage} >
                    <div className={styles.pc}>
                        <Image
                            width={178}
                            height={30}
                            src="/images/logo.png"
                            alt="logo" />
                    </div>
                    <div className={styles.h5}
                        style={{ transform: 'translateY(-2px)' }}>
                        <Image
                            width={30}
                            height={30}
                            src="/images/logo-h5.png"
                            alt="logo" />
                    </div>
                </div>
                <div className={styles.headerRight} ref={navbarRef}>
                    {tabs.map((item, index) =>
                        <div key={item} className={styles.tab}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (currentTab === item) {
                                    setCurrentTab(null);
                                    return;
                                }
                                setCurrentTab(item);
                                setShowPanel(false)
                                setTimeout(() => {
                                    setShowPanel(true)
                                }, 10);
                            }}
                        >
                            <div className={showPanel && currentTab == item ? `${styles.tabText} ${styles.tabTextShow}` : styles.tabText}>
                                {t(item)}
                                {currentTab == item &&
                                    <div className={showPanel ? `${styles.tabPanel} ${styles.tabPanelShow}` : styles.tabPanel}>
                                        {
                                            //@ts-ignore
                                            tabsArray[item].map((item) =>
                                                <div
                                                    key={item.name}
                                                    onClick={() => jumpRouter(item)}
                                                    className={`${styles.tabPanelItem}`}>
                                                    <div className={styles.tabPanelItemText}>
                                                        {t(item.name)}
                                                    </div>
                                                </div>)}
                                    </div>}
                            </div>
                        </div>)}
                    <div className={`${styles.tab} ${styles.h5}`} onClick={toggleDrawer(true)}>
                        <div className={styles.tabText}><MenuIcon />
                        </div>
                    </div>
                    <div className={styles.languageTab}
                        onClick={jumpToLanguageSelect}
                    >
                        <div className={styles.tabText}>
                            <LanguageIcon className={styles.languageIcon} />
                            <div className={styles.pc}>{languageLabel}
                            </div>

                        </div>
                    </div>
                </div>


                <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </header>
        </>
    );
};

export default Header;

