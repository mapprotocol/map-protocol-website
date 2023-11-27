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
import CardList from '@/components/ExploreCard';
import CustomHead from '@/components/CustimHead';
type Props = {
  // Add custom props here
}
interface CardInfo {
  cardTitle: String,
  cardContent: String,
}



export default function HomePageTop(

) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation('brand-assets');
  const [fade, setFade] = useState(styles.main)


  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])




  const logoCard: any[] = [
    {
      title: 'Fuchsia Logo #1',
      src: '/images/brand-assets/fuchsia-logo-1.png',
      width: "234px",
      height: "47px"
    },
    {
      title: 'Fuchsia Logo #2',
      src: '/images/brand-assets/fuchsia-logo-2.png',
      width: "234px",
      height: "47px"
    },
    {
      title: 'Fuchsia Logo #3',
      src: '/images/brand-assets/fuchsia-logo-3.png',
      width: "160px",
      height: "86px"
    },
    {
      title: 'Fuchsia Logo #4',
      src: '/images/brand-assets/fuchsia-logo-4.png',
      width: "160px",
      height: "86px"
    },


    {
      title: 'Black Logo',
      src: '/images/brand-assets/fuchsia-logo-1.png',
      width: "234px",
      height: "47px"
    },
    {
      title: 'White Logo',
      src: '/images/brand-assets/fuchsia-logo-2.png',
      width: "234px",
      height: "47px"
    },
    {
      title: 'Fuchsia Logo',
      src: '/images/brand-assets/fuchsia-logo-3.png',
      width: "234px",
      height: "47px"
    },
    {
      title: 'Gradient Logo',
      src: '/images/brand-assets/fuchsia-logo-4.png',
      width: "234px",
      height: "47px"
    },
    {
      title: 'Black Logo',
      src: '/images/brand-assets/fuchsia-logo-1.png',
      width: "158px",
      height: "84px"
    },
    {
      title: 'White Logo',
      src: '/images/brand-assets/fuchsia-logo-2.png',
      width: "158px",
      height: "84px"
    },
    {
      title: 'Fuchsia Logo',
      src: '/images/brand-assets/fuchsia-logo-3.png',
      width: "158px",
      height: "84px"
    },
    {
      title: 'Fuchsia Logo',
      src: '/images/brand-assets/fuchsia-logo-4.png',
      width: "158px",
      height: "84px"
    },
    {
      title: 'Black Symbol',
      src: '/images/brand-assets/fuchsia-logo-1.png',
      width: "72px",
      height: "64px"
    },
    {
      title: 'White Symbol',
      src: '/images/brand-assets/fuchsia-logo-2.png',
      width: "72px",
      height: "64px"
    },
    {
      title: 'Fuchsia Symbol',
      src: '/images/brand-assets/fuchsia-logo-3.png',
      width: "72px",
      height: "64px"
    },
    {
      title: 'Fuchsia Symbol',
      src: '/images/brand-assets/fuchsia-logo-4.png',
      width: "72px",
      height: "64px"
    },

  ]

  const badgesCard: any[] = [
    {
      title: 'Fuchsia Logo #1',
      src: '/images/brand-assets/fuchsia-logo-1.png',
      width: "264px",
      height: "54px"
    },
    {
      title: 'Fuchsia Logo #2',
      src: '/images/brand-assets/fuchsia-logo-2.png',
      width: "264px",
      height: "54px"
    },
    {
      title: 'Fuchsia Logo #3',
      src: '/images/brand-assets/fuchsia-logo-3.png',
      width: "264px",
      height: "54px"
    },
    {
      title: 'Fuchsia Logo #4',
      src: '/images/brand-assets/fuchsia-logo-4.png',
      width: "264px",
      height: "54px"
    },


  ]
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <view>
      <CustomHead
        title={t('Community center') + ' - ' + 'Map Protocol'}
      />
      <div className={fade} >
        <div className={styles.mainLeft}>
          <div className={styles.title}>{t('MAP PROTOCOL LOGO')}</div>
          <div className={styles.desc}>{t('The MAP Protocol logo is displayed in the official colors and usage patterns. Do not place the logo on top of other objects and leave a reasonable amount of margin around the outside so the logo is clearly visible.')}</div>
        </div>
        <div className={styles.topImage}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/computer.png"
            alt="community" />
        </div>
      </div>
      <div>
        <div className={styles.logoCards}>
          {logoCard.map((item, index) =>
            <div
              key={index}
              className={styles.card}>
              <div className={styles.cardTop} style={{
                backgroundColor: index % 2 == 0 ? '#fff' : "#1f1f1f"
              }}>
                <div className={styles.cardTopImage}
                  style={{
                    width: item.width,
                    height: item.height,
                  }}
                >
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={`/logos/${index + 1}.png`}
                    alt={item.title} />
                </div>
              </div>
              <div className={styles.cardName}>{item.title}

                <div className={styles.downloadTabs}>
                  <a
                    className={styles.download}
                    href={`/logos/${index + 1}.svg`} download={`logos.svg`}>
                    SVG
                  </a>
                  <a
                    className={styles.download}
                    href={`/logos/${index + 1}.eps`} download={`logos.eps`}>
                    EPS
                  </a>
                  <a
                    className={styles.download}
                    href={`/logos/${index + 1}.png`} download={`logos.png`}>
                    PNG
                  </a>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      <div className={styles.cardListTitle}>{t('Map Protocol badges')}
        <div className={styles.badgesDesc}>
          {t('Projects using MAP Protocol should display this badge on their pages and apps. Here you can download the badge in PNG format')}
        </div>
      </div>
      <div className={styles.logoCards}>
        {badgesCard.map((item, index) =>
          <div
            key={index}
            className={styles.card}>
            <div className={styles.cardTop} style={{
              backgroundColor: index % 2 == 0 ? '#fff' : "#1f1f1f"
            }}>
              <div className={styles.cardTopImage}
                style={{
                  width: item.width,
                  height: item.height,
                }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={`/logos/${index + 17}.png`}
                  alt={item.title} />
              </div>
            </div>
            <div className={styles.cardName}>{item.title}

              <div className={styles.downloadTabs}>
              <a
                    className={styles.download}
                    href={`/logos/${index + 17}.svg`} download={`badges.svg`}>
                    SVG
                  </a>
                  <a
                    className={styles.download}
                    href={`/logos/${index + 17}.eps`} download={`badges.eps`}>
                    EPS
                  </a>
                  <a
                    className={styles.download}
                    href={`/logos/${index + 17}.png`} download={`badges.png`}>
                    PNG
                  </a>
              </div>
            </div>
          </div>)}
      </div>
      <div style={{
        height: '96px',
        width: '100%'
      }}>

      </div>
    </view>
  )
}

