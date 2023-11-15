import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';

import { useEffect, useState } from 'react';
import { useMapPrice } from '@/hooks/useMapPrice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CustomHead from '@/components/CustimHead';




export default function Top(

) {

  const { t } = useTranslation('find-a-wallet');
  const [fade, setFade] = useState(styles.main)

  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])

  return (
    <>
      <CustomHead
        title={t('Find a Wallet') + ' - ' + 'Map Protocol'}
      />
      <div className={fade} >
        <div className={styles.mainLeft}>
          <div className={styles.title}>{t('Find a Wallet')}</div>
          <div className={styles.desc}>{t('A crypto wallet is your gateway to the decentralized world. Find a wallet that suits your needs and has the features you want.')}</div>
        </div>
        <div className={styles.topImage}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/home-page/get-start-2.png"
            alt="get-start-2" />
        </div>
      </div>
    </>
  )
}

