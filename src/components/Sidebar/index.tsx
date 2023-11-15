
import styles from './index.module.css'

import { ReactNode, useEffect, useState } from 'react';
import React from 'react';
import { handleButtonClick } from '@/utils/dom';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import { useRouter } from 'next/router';




export default function Sidebar(
    { headings,
        mdLocale }: {
            headings: Array<string>,
            mdLocale: string
        }
) {
    const [activeId, setActiveId] = useState('');
    const { t } = useTranslation('common');
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const sections: Array<HTMLElement> = headings.map(item => document.getElementById(item)) as Array<HTMLElement>;

            let currentSectionId = null;
            for (let section of sections) {
                const rect = section?.getBoundingClientRect();
                if (rect && rect.top <= 164 && rect.bottom >= 0) {
                    currentSectionId = section.id;
                    break;
                }
            }

            if (currentSectionId) {
                setActiveId(currentSectionId);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [headings])


    return (
        <div className={styles.sidebar}>

            {headings.map((item) => {
                return <div key={item} className={styles.sidebarItem}>
                    {item === activeId && <div className={styles.activeDot}>
                    </div>}
                    <div
                        className={item === activeId ?
                            `${styles.isCurrent} ${styles.sidebarText}`
                            : styles.sidebarText}
                        onClick={() => handleButtonClick(item)}>

                        {item}
                    </div>
                </div>
            })}
            <div
                onClick={() => {
                    window.open(`https://github.com/mapprotocol/map-protocol-website/blob/dev/src/article/${mdLocale}/${router.query.id}.md`)

                }} className={styles.githubButton}>
                <Image
                    width={24}
                    height={24}
                    src={'/fonts/github.svg'}
                    alt="logo" />
                {t('Edit Page')}
                <Image
                    width={15}
                    height={15}
                    src="/fonts/link.svg"
                    alt="" />
            </div>
        </div>
    )
}


