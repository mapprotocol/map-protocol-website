import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';
import { Ul } from '@/components/Ul';
import { Li } from '@/components/Li';
import { HandTip } from '@/components/HandTip';
import Router from 'next/router';




const articlesArray = [{
  title: 'Stablecoins',
  authorName: 'Author Name',
  date: '2023.10.10',
  link: '/article?id=introduction-to-stablecoins'
},
{
  title: 'Decentralized finance (DeFi)',
  authorName: 'Author Name',
  date: '2023.10.10',
  link: '/article?id=what-is-defi'
}, {
  title: 'Decentralized organizations (DAOs)',
  authorName: 'Author Name',
  date: '2023.10.10',
  link: '/article?id=what-are-DAOs'

}, {
  title: 'Non-fungible tokens (NFTs)',
  authorName: 'Author Name',
  date: '2023.10.10',
  link: '/article?id=an-Introduction-to-Non-Fungible-Tokens'

},

]

export default function Body(

) {

  const { t } = useTranslation('what-is-mapo');

  return (
    <>
      <div className={styles.whereToGetMAPO}>
        <div className={styles.whereToGetMAPOLeft}>
          <div className={styles.whereToGetMAPOTitle}>{t('Where to get MAPO')}</div>
          <div className={styles.whereToGetMAPODesc}>{t('You can get MAPO from a centralized exchange or decentralized exchange but different countries may have different policies. Check to see which would be the best way for you to get MAPO.')}</div>
          <div className={styles.whereToGetMAPOButton}>
            <Button onClick={
              () => { Router.push('/get-mapo') }
            } variant="contained">{t('Get MAPO')}</Button>
          </div>
        </div>
        <div className={styles.whereToGetMAPOImage}>
          <Image
            fill
            objectFit="contain"
            src="/images/find-a-wallet/find-a-wallet-2.png"
            alt="find-a-wallet-2" />
        </div>
      </div>
      <div className={styles.value}>
        <div className={styles.valueLeft}>
          <Image
            fill
            objectFit="contain"
            src="/images/stake-mapo/stake-mapo-top.png"
            alt="stake-mapo" />
        </div>
        <div className={styles.valueRight}>
          <div className={styles.title}>{t('Why does MAPO have value?')}</div>
          <div className={styles.desc}>{t('MAPO holds different values for different people.')}</div>
          <div className={styles.desc}>{t('For users of MAP Protocol, MAPO is valuable because it lets you pay transaction fees.')}</div>
          <div className={styles.desc}>{t('Others see it as a digital store of value because the creation of new MAPO slows down over time.')}</div>
          <div className={styles.desc}>{t('In the future, MAPO will also become valuable to users of financial apps on MAP Protocol, as they can use MAPO for lending, borrowing, streaming, or even as a payment system.')}</div>
          <div className={styles.desc}>{t('There are also users who are investors who take MAPO as their investment similar to Bitcoin or other cryptocurrencies.')}</div>
        </div>

      </div>
      <div className={styles.token}>
        <div className={styles.tokenLeft}>
          <div className={styles.title}>{t('MAPO is not the only token in crypto')}</div>
          <div className={styles.desc}>{t("The crypto space allows anyone to create new assets and trade them across various platforms. These assets are often labeled as 'tokens'. From traditional assets like gold and real estate to innovative concepts like art and even personal value, tokenization is reshaping how we think of ownership.")}</div>
          <div className={styles.desc}>{t("The crypto landscape houses countless tokens, each with its unique utility and value. The ongoing innovation by developers ensures that new tokens continually emerge, each paving the way for novel opportunities and market expansion.")}</div>
          <div className={styles.title}
            style={{ marginTop: '36px' }}>{t('More on tokens')}</div>
          <div className={styles.articles}>
            {articlesArray.map((item, index) => <div
              key={index}
              onClick={
                () => { Router.push(item.link) }
              }
              className={styles.articleItem}>
              <div className={styles.articleTitle}>
                {t(item.title)}
                {/* <div className={styles.articleAuthor}>
                  {item.authorName}
                </div> */}
              </div>
              <Image
                width={15}
                height={15}
                src="/fonts/link.svg"
                alt="" />
            </div>)}

          </div>
        </div>
        <div className={styles.tokenRight}>
          <div className={styles.title}>{t('Different types of tokens')}</div>
          <div className={styles.buildStep}>
            <div className={styles.stepTitle} >
              <Image
                width={40}
                height={40}
                src="/fonts/what-is-mapo/token-0.svg"

                alt="" />
              {t('Stablecoins')}
            </div>
            <div className={styles.desc}>
              {t("Tokens that mirror the value of a traditional currency such as dollars. This solves the volatility problem with many cryptocurrencies.")}
            </div>
          </div>
          <div className={styles.buildStep}>
            <div className={styles.stepTitle} >
              <Image
                width={40}
                height={40}
                src="/fonts/what-is-mapo/token-1.svg"

                alt="" />
              {t('Governance tokens')}
            </div>
            <div className={styles.desc}>
              {t("Tokens that represent voting power in decentralized organizations.")}
            </div>
          </div>
          <div className={styles.buildStep}>
            <div className={styles.stepTitle} >
              <Image
                width={40}
                height={40}
                src="/fonts/what-is-mapo/token-2.svg"

                alt="" />
              {t('Sh*t coins')}
            </div>
            <div className={styles.desc}>
              {t("Because anyone — even people with bad intentions — can create a new token, always do your research before deciding to invest in them!")}
            </div>
          </div>
          <div className={styles.buildStep}>
            <div className={styles.stepTitle} >
              <Image
                width={40}
                height={40}
                src="/fonts/what-is-mapo/token-3.svg"
                alt="" />
              {t('Collectible tokens')}
            </div>
            <div className={styles.desc}>
              {t("Tokens that represent a collectible game item, piece of digital art, or other unique assets. Commonly known as non-fungible tokens (NFTs).")}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

