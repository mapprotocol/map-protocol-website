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
import queryDate from '@/api/mapData';
import { convertToMillion, toThousands } from '@/utils/number';
type Props = {
  // Add custom props here
}
interface CardInfo {
  cardTitle: string,
  cardContent: string,
  cardNumber: number | string
}




export default function Data(

) {
  const { t } = useTranslation('home-page');
  const [formData, setFormData] = useState(
    {
      staking: "537978228360223933322550395",
      validators: 45,
      addAddress: 577834,
      day7Transactions: 36384,
      day30Transactions: 153431
    }
  )

  useEffect(() => {

    queryDate().then(res => {
      setFormData(res.data)
    })
  }, [])


  const cardData: Array<CardInfo> = [{
    cardTitle: t('TOTAL MAPO STAKED'),
    cardContent: t("The total amount of MAPO currently being staked and securing the network."),
    cardNumber: convertToMillion(formData.staking)
  },
  {
    cardTitle: t('NODES'),
    cardContent: t('MAP Relay Chain is run by volunteers around the globe, known as nodes.'),
    cardNumber: formData.validators

  },
  {
    cardTitle: t('TRANSACTIONS'),
    cardContent: t('The number of cross-chain transactions successfully processed by the network.'),
    cardNumber: toThousands(formData.day7Transactions)

  },
  {
    cardTitle: t('TOTAL ADDRESS'),
    cardContent: t('The number of users in MAP Protocol grows every day.'),
    cardNumber: toThousands(formData.addAddress)
  }
  ]


  return (
    <view>
      <div className={styles.dataTitle}>
        <div >
          {t('MAP Protocol today')}
        </div>
        <div className={styles.dataDesc}>
          <Trans ns="home-page" i18nKey=
            'The latest MAP Relay Chain statistics (Data Source: MAPO explorer)' components={{
              link1: <Link target="_blank" href={"https://maposcan.io/"} ></Link>,
            }} />
        </div>
      </div>
      <div className={styles.dataCardList}>
        {cardData.map((item, index) =>
          <div key={index}
            className={styles.dataCard}
          >
            {/* <div className={styles.boxShadow} style={{backgroundColor:'#C6D4FF'}}></div> */}
            <div className={styles.lineImage}>
              <Image
                fill
                style={{ objectFit: "contain" }}
                src={`/images/home-page/line-${index}.png`}
                alt="line-0" />
            </div>
            <div className={styles.dataCardTitle}>
              {item.cardTitle}
            </div>
            <div className={styles.dataCardDesc}>
              {item.cardContent}
            </div>
            <div className={styles.dataNumber}>
              {item.cardNumber}
            </div>
            {
              index == 2 ? <div>
                <div className={styles.weekButton}>{'7D'}</div>
              </div> : <div>
                <div className={styles.weekButton}>{'All'}</div>
              </div>
            }
          </div>
        )
        }

      </div>


      <div className={styles.contribute}>
        <div className={styles.contributeLeft}>
          <div className={styles.contributeTitle}>{t('Join MAP Protocol community')}</div>
          <div className={styles.contributeDesc}>{t('Join over 5,000 members on MAPDAO Discord community!')}</div>
          <div className={styles.contributeDesc}>{t("We hold monthly community calls for exciting updates on MAP Protocol development and important ecosystem news. Get the chance to ask questions, share ideas, and contribute in different ways —  it's the perfect opportunity to be part of the thriving MAPDAO community.")}</div>
          <div   className={styles.button}>
            <Button
              onClick={
                () => {
                  window.open('https://t.me/MAPprotocol/')
                }}
               variant="contained">{t('Join Telegram')}</Button>
            <Button
              onClick={
                () => {
                Router.push('/article?id=learn-about-MAPDAO')
                }}
              style={{
              }} variant="outlined">{t('Learn about MAPDAO')}</Button>
          </div>
        </div>
        <div className={styles.contributeImage}>
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/community/community-1.png"
            alt="community-1" />
        </div>
      </div>

      <CardList />
    </view>
  )
}

