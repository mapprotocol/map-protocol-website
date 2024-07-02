import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';

import { useEffect, useState } from 'react';
import { useMapPrice } from '@/hooks/useMapPrice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { absoluteDecimal, convertToBillion1, convertToMillion, convertToMillion1, toThousands } from '@/utils/number';
import queryMaprelayeChainData from '@/api/queryMaprelayeChainData';
import CustomHead from '@/components/CustimHead';
import Router, { useRouter } from 'next/router';




export default function Top(

) {
  const [data, setData] = useState({
    stake: 0,
    node: 0,
    apy: 0,
    supply: 0
  })
  const { t } = useTranslation('stake-mapo');
  const [fade, setFade] = useState(styles.main)



  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
    const numberEls = [document.getElementById('SUPPLY'), document.getElementById('STAKED'), document.getElementById('VALIDATORS'), document.getElementById('APR')]
    const duration = 600; // 
    queryMaprelayeChainData().then((res) => {

      let array = [convertToBillion1(res.data.supply), convertToMillion1(res.data.staking), res.data.validators, Number(res.data.stakingApy)]
      //@ts-ignore
      numberEls.forEach((numberEl: HTMLSpanElement, index: number) => {
        let start: number | null = null;
        const target: number = Number(array[index]);

        function animate(time: number) {
          if (!start) start = time;
          const progress = time - start;
          const current = Math.min(progress / duration * target, target);
          if (index == 0)
            numberEl.textContent = absoluteDecimal(current, 3).toString() + "B";
          if (index == 1)
            numberEl.textContent = absoluteDecimal(current, 2).toString() + "M";
          else if (index == 2)
            numberEl.textContent = Math.floor(current).toString();
          else if (index == 3)
            numberEl.textContent = absoluteDecimal(current, 1).toString() + '%'

          if (current < target) {
            requestAnimationFrame(animate);
          }
        }
        requestAnimationFrame(animate);
      });
    })

  }, [])

  return (
    <>
      <CustomHead
        title={t('Stake MAPO') + ' - ' + 'Map Protocol'}
      />
      <div className={fade} >
        <div className={styles.mainLeft}>
          <div className={styles.title}>{t('Get rewarded while securing MAP Protocol omnichain network')}</div>
          <div className={styles.desc}>{t('Staking MAPO is public good for the whole MAP Protocol omnichain ecosystem. Validators need to have sufficient stake once they have their nodes appropriately set up.')}</div>
          <div className={styles.desc}>{t('As a permissionless Delegated Proof-of-Stake (DPoS) blockchain, MAP Protocol allows users to stake by delegating their MAPO to validators who process transactions and run the network.')}</div>

          <div className={styles.button}>
            <Button
              onClick={
                () => {
                  Router.push('/get-mapo')
                }}
              style={{
                marginRight: "12px"
              }} variant="contained">{t('Get MAPO')}</Button>

            <Button
              onClick={
                () => {
                  window.open('https://staking.mapprotocol.io/')
                }}
              variant="outlined">{t('Stake MAPO')}</Button>
          </div>
          <div>

          </div>

        </div>
        <div className={styles.mapCoinsImage}
          style={{
            position: 'relative', width: '460px', height: '447px'
          }}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/stake-mapo/stake-mapo-top.png"
            alt="stake-mapo-top" />
        </div>
      </div>
      <div className={styles.stakeData}>
        <div className={styles.stakeItem}>
          <div id={'SUPPLY'} data-target={data.supply} className={styles.stakeNumber}>{0}</div>
          <div className={styles.stakeTitle}>{t('CIRCULATING SUPPLY')}</div>
        </div>
        <div className={styles.stakeItem}>
          <div id={'STAKED'} data-target={data.stake} className={styles.stakeNumber}>{0}</div>
          <div className={styles.stakeTitle}>{t('TOTAL MAPO STAKED')}</div>
        </div>
        <div className={styles.stakeItem}>
          <div id={'VALIDATORS'} data-target={data.node} className={styles.stakeNumber}>{toThousands(43)}</div>
          <div className={styles.stakeTitle}>{t('TOTAL VALIDATORS')}</div>
        </div>
        <div className={styles.stakeItem}>
          <div id={'APR'} data-target={data.apy} className={styles.stakeNumber}>{0}</div>
          <div className={styles.stakeTitle}>{t('CURRENT APR')}</div>
        </div>
      </div>
    </>
  )
}

