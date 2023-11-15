import React from 'react';
import { TabItem, tabsArray } from '../header';
import styles from './index.module.css'
import Router, { useRouter } from 'next/router';

import Image from 'next/image'
import { useTranslation } from 'next-i18next';

const iconArray = [
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
                    {Object.keys(tabsArray).slice(0, 3).map((category) => (
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
                        {Object.keys(tabsArray).slice(3, 6).map((category) => (
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