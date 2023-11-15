import React from 'react';
import { TabItem, TabsArray, tabsArray } from '../header';
import styles from './index.module.css'
import Router, { useRouter } from 'next/router';

import Image from 'next/image'
import { useTranslation } from 'next-i18next';

const iconArray = [
    {
        src: '/fonts/Kakao.png',
        link: 'https://open.kakao.com/o/gP9WduRb/'
    },
    {
        src: '/fonts/Naver.svg',
        link: 'https://blog.naver.com/mapprotocol'
    },
    {
        src: '/fonts/discord.svg',
        link: 'https://discord.com/invite/kt4beeTVnw'
    },
    {
        src: '/fonts/github.svg',
        link: 'https://github.com/mapprotocol'
    },
    {
        src: '/fonts/medium.svg',
        link: 'https://medium.com/@mapprotocolofficial'
    },
    {
        src: '/fonts/telegram.svg',
        link: 'https://t.me/MAPprotocol/'
    },
    {
        src: '/fonts/x.svg',
        link: 'https://twitter.com/mapprotocol'
    },
   
]

export const footerArray: TabsArray = {
    'Official contract addresses': [
        {
            name: 'Ethereum',
            path: 'https://etherscan.io/token/0x9e976f211daea0d652912ab99b0dc21a7fd728e4'
        },
        {
            name: 'BNB Smart Chain',
            path: 'https://bscscan.com/address/0x8105ECe4ce08B6B6449539A5db23e23b973DfA8f'
        },
        {
            name: 'Polygon',
            path: 'https://polygonscan.com/address/0xBAbceE78586d3e9E80E0d69601A17f983663Ba6a'

        }
    ],
    'Ecosystem': [
        {
            name: 'Community center',
            path: '/community'
        },
        {
            name: 'MAPDAO',
            path: '/article?id=learn-about-MAPDAO'

        },
        {
            name: 'MAP Protocol community grant',
            path: 'https://forum.mapprotocol.io/t/map-community-contributor-grants-program/3988'

        },
        {
            name: 'MAP Protocol research grant',
            path: 'https://forum.mapprotocol.io/t/about-the-academy-category/3989'

        },
        {
            name: 'MAP Protocol builder grant',
            path: 'https://forum.mapprotocol.io/t/stay-updated-for-the-next-openning-map-omnichain-builder-grants-program/3980'

        },
        {
            name: 'Online community',
            path: '/article?id=online-communities'

        },

    ]
}


export const Footer = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const jumpRouter = (item: TabItem) => {
        if (item.name == 'Documentation')
            Router.push(router.locale == 'zh' ? 'https://mapo.gitbook.io/docs-zh/' : 'https://mapo.gitbook.io/docs-en/')
        else
            item?.path && Router.push(item.path)

    }

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.iconList}>
                    {iconArray.map((item, index) =>
                        <div key={index} onClick={() => {
                            window.open(item.link)
                        }} className={styles.logoImage} >
                            <Image
                                width={30}
                                height={30}
                                src={item.src}
                                alt="logo" />
                        </div>

                    )}
                </div>
                <div className={styles.footerList}>
                    <div className={styles.category}>
                        {Object.keys(tabsArray).slice(0, 1).map((category) => (
                            <div key={category}
                                style={{
                                    marginBottom: '48px'
                                }}
                                className={styles.category}>
                                <div className={styles.categoryTitle}>{t(category)}</div>
                                <div>
                                    {tabsArray[category].map((item) => (
                                        <div onClick={() => jumpRouter(item)} className={styles.tabItem} key={item.name}>
                                            <div >{t(item.name)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {Object.keys(footerArray).slice(0, 1).map((category) => (
                            <div key={category} className={styles.category}>
                                <div className={styles.categoryTitle}>{t(category)}</div>
                                <div>
                                    {footerArray[category].map((item) => (
                                        <div onClick={() => jumpRouter(item)} className={styles.tabItem} key={item.name}>
                                            <div >{t(item.name)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {Object.keys(tabsArray).slice(1, 3).map((category) => (
                        <div key={category} className={styles.category}>
                            <div className={styles.categoryTitle}>{t(category)}</div>
                            <div>
                                {tabsArray[category].map((item) => (
                                    <div onClick={() => jumpRouter(item)} className={styles.tabItem} key={item.name}>
                                        <div >{t(item.name)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className={styles.category}>
                        {Object.keys(tabsArray).slice(3, 5).map((category) => (
                            <div style={{
                                marginBottom: '48px'
                            }}

                                key={category}>
                                <div className={styles.categoryTitle}>{t(category)}</div>
                                <div>
                                    {tabsArray[category].map((item) => (
                                        <div onClick={() => jumpRouter(item)} className={styles.tabItem} key={item.name}>
                                            <div >{t(item.name)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {Object.keys(footerArray).slice(1, 2).map((category) => (
                            <div

                                key={category}>
                                <div className={styles.categoryTitle}>{t(category)}</div>
                                <div>
                                
                                    {footerArray[category].map((item) => (
                                        <div onClick={() => jumpRouter(item)} className={styles.tabItem} key={item.name}>
                                            <div >{t(item.name)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div>&copy; {new Date().getFullYear()} MAP Protocol. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;