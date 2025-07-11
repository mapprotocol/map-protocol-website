
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import Image from 'next/image'
import InputAdornment from '@mui/material/InputAdornment';
import styles from './index.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

import TextField from '@mui/material/TextField';

import Header from '../../components/header'
// import Faqs from './faqs'
import { useTranslation, Trans, i18n } from 'next-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Footer from '@/components/footer';
import CustomHead from '@/components/CustimHead';
type Props = {}

type language = {
  id: string,
  name: string,
  englishName: string

}

export const languageCards: Array<language> = [
  // {
  //   id: 'ar',
  //   name: 'عربي',
  //   englishName: 'ARABIC'
  // },
  {
    id: 'en',
    name: 'English',
    englishName: 'ENGLISH'
  },
  {
    id: 'zh',
    name: '简体中文',
    englishName: 'CHINESE SIMPLIFIED'
  },
  // {
  //   id: 'zh-TW',
  //   name: '繁體中文',
  //   englishName: 'CHINESE TRADITIONAL'
  // },
  // {
  //   id: 'fr',
  //   name: 'Français',
  //   englishName: 'FRENCH'
  // },
  // {
  //   id: 'de',
  //   name: 'Deutsch',
  //   englishName: 'GERMAN'
  // },
  // {
  //   id: 'hi',
  //   name: 'हिंदी',
  //   englishName: 'HINDI'
  // },


  // {
  //   id: 'it',
  //   name: 'Italiano',
  //   englishName: 'ITALIAN'
  // },
  //
  // {
  //   id: 'ja',
  //   name: '日本語',
  //   englishName: 'JAPANESE'
  // },
  {
    id: 'kr',
    name: '한국어',
    englishName: 'KOREAN'
  },

  // {
  //   id: 'ru',
  //   name: 'Русский',
  //   englishName: 'RUSSIAN'
  // },
  //
  // {
  //   id: 'es',
  //   name: 'Español',
  //   englishName: 'SPANISH'
  // },
  //
  // {
  //   id: 'tr',
  //   name: 'Türkiye',
  //   englishName: 'TURKISH'
  // },
  // {
  //   id: 'uk',
  //   name: 'Україна',
  //   englishName: 'UKRAINIAN'
  // },
  // {
  //   id: 'vi',
  //   name: 'Tiếng Việt',
  //   englishName: 'VIETNAMESE'
  // },
]
export default function Language(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [languageResCard, setLanguageResCard] = useState(languageCards)
  const { t } = useTranslation('language');
  const [fade, setFade] = useState(styles.main)
  const router = useRouter();

  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])

  const changeLanguageFunc = (item: language) => {
    router.push(router.query.from as string, undefined, { locale: item.id });

  }
  const searchOnchange = (event: any) => {
    setLanguageResCard(languageCards.filter(item => {
      return item.englishName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.id.toLowerCase().includes(event.target.value.toLowerCase())
    }))

  }
  return (
    <>
      <CustomHead
        title={t('Language Support') + ' - ' + 'Map Protocol'}
      />
      <Header />
      <div className={fade} >
        <div className={styles.languageImage}
          style={{
            position: 'relative', width: '235px', height: '459px'
          }}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/language/1.png"
            alt="" />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.title}>{t('Language Support')}</div>
          <div className={styles.desc}>
            <Trans ns="language" i18nKey="MAP Protocol is an open project, meaning it is accessible to everyone, regardless of their nationality or language. Join MAP Protocol Translation Program! We’d love to have you to be part of the global power to tear down the artificial borders that separate us here on Earth." components={{
              link1: <Link target="_blank" href={"https://www.notion.so/permadao/Translation-Guild-3fa48da65de24f998117d46e167050ca"} className={styles.linkText}></Link>,
            }} />
          </div>
          <div className={styles.desc}>
            <Trans ns="language" i18nKey="You can also read content in MAP Protocol roadmap, MAP Protocol glossary, and MAP Protocol whitepaper to learn more about MAP Protocol in general." components={{
              link1: <Link target="_blank" href={"http://localhost:3000/article?id=whitepaper"} className={styles.linkText}></Link>,
            }} /></div>
        </div>
        <div className={styles.languageImage}
          style={{
            position: 'relative', width: '213px', height: '459px'
          }}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/language/2.png"
            alt="" />
        </div>
      </div>
      <div className={styles.select}>
        <div className={styles.selectTitle}>
          {t('MAP Protocol is available in the following languages:')}
        </div>
        <div className={styles.input}>
          <TextField
            sx={{ width: '100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}

            onChange={searchOnchange}
            id="outlined-basic"
            placeholder={t("Filter")}
            variant="outlined" />
        </div>
        {/* <div className={styles.input}></div> */}
        <div className={styles.languageCards}>
          {languageResCard.map(item =>
            <div
              key={item.id}
              onClick={() => changeLanguageFunc(item)} className={styles.card}>
              <div className={styles.englishName}> {item.englishName}</div>
              <div className={styles.cardName}>{item.name}</div>
            </div>)}
        </div>
      </div>
      <Footer />

    </>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'language',
      'common'
    ])),
  },
})