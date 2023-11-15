import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';

import { useEffect, useState } from 'react';
import { useMapPrice } from '@/hooks/useMapPrice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { absoluteDecimal, toThousands } from '@/utils/number';
import CustomHead from '@/components/CustimHead';




export default function Top(

) {

  const { t } = useTranslation('run-a-node');
  const [fade, setFade] = useState(styles.main)

  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])

  return (
    <>
      <CustomHead
        title={t('Run your node') + ' - ' + 'Map Protocol'}
      />
      <div className={fade} >
        <div className={styles.mainLeft}>
          <div className={styles.title}>{t('Run a node to secure the network')}</div>
          <div className={styles.desc}>{t('Operating your own node is a great way to stay fully sovereign while helping to secure the whole network and safeguard decentralization.')}</div>
        </div>
        <div className={styles.mapCoinsImage} style={{ position: 'relative', width: '631px', height: '520px' }}>
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/run-a-node/run-a-node-1.png"
            alt="run-a-node-1" />
        </div>
      </div>
    </>
  )
}

