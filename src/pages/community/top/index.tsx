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


const CommunityCard = ({ cardInfo, index }: { cardInfo: CardInfo, index: number }) => {

  return (
    <div className={styles.card}>
      <Image
        width={40}
        height={40}
        className={styles.cardIcon}
        src={`/fonts/community/community-${index}.svg`}
        alt="" />
      <div className={styles.cardTitle}>{cardInfo.cardTitle}</div>
      <div className={styles.cardDesc}>{cardInfo.cardContent}</div>


    </div>)
}

export default function HomePageTop(

) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation('community');
  const [fade, setFade] = useState(styles.main)


  useEffect(() => {
    setFade(`${styles.main} ${styles.fade}`)
  }, [])


  const handleClose = () => {
    setAnchorEl(null);
  };

  const cardData: Array<CardInfo> = [{
    cardTitle: t('Participate freely'),
    cardContent: t("You have the freedom to contribute remotely, thus working from anywhere at any time that suits you."),
  },
  {
    cardTitle: t('Find your cohort'),
    cardContent: t('You have the opportunity to connect with like-minded peers. Through teamwork, participants can enhance their translation skills, exchange valuable insights, and collectively overcome challenges.'),
  }, {
    cardTitle: t('Get recognized and compensated'),
    cardContent: t('Your name will appear next to the work you’ve done. Additionally, compensation will be provided for the brilliant work you do.'),
  }]

  const getStartCardData = [
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(48px)',
      title: t('Join online communities'),
      image: "/images/home-page/get-start-1.png",
      boxShadow: "#C6D4FF",
      desc: t('Find your cohort and participate with many other MAP Protocol enthusiasts.'),
      src: '/article?id=online-communities'
    },
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(0px)',
      image: "/images/community/community-1.png",
      title: t('MAP Protocol events'),
      boxShadow: "#DAD4FF",
      desc: t('Find and participate in MAP Protocol conferences, hackathons, or meetups.'),
      src: ''
    },
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(48px)',
      image: "/images/run-a-node/run-a-node-1.png",
      boxShadow: "#FFEDC8",
      title: t('Run a node'),
      desc: t('Operate your own node is a great way to contribute to the whole network.'),
      src: '/run-a-node'

    },
    {
      width: '306px',
      height: '299px',
      transform: 'translateY(48px)',
      image: "/images/stake-mapo/stake-mapo-top.png",
      boxShadow: "#D6F5FA",
      title: t('Stake MAPO'),
      desc: t('Get your MAPO and stake them to earn more rewards.'),
      src: '/stake-mapo'

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
          <div className={styles.title}>{t('Welcome to MAP Protocol Community')}</div>
          <div className={styles.desc}>{t('MAP Protocol is home to hundreds of thousands of developers, technologists, designers, users, MAPO HODLers, and enthusiasts.')}</div>
        </div>
        <div className={styles.topImage}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/community/community.png"
            alt="community" />
        </div>
      </div>
      <div className={styles.cardListTitle}>{t('Why become part of the MAP Protocol community?')}</div>

      <div className={styles.cardList}>
        {cardData.map((item, index) => <CommunityCard key={index} cardInfo={item} index={index} />)}
      </div>

      <div className={styles.cardListTitle}>
        {t('How to get involved?')}
        <div className={styles.cardListDesc}>
          {t('There are many ways to get involved in the fast-growing Map Protocol community; you can join one of the popular online communities, attend an event, join a meetup group, contribute to a project, or participate in one of the many online forums about Map Protocol.')}
        </div>
      </div>


      <div className={styles.getStartCardList}>
        {getStartCardData.map((item, index) =>
          <div
            key={index}
            className={styles.getStartCard}
            onClick={() => {
              Router.push(item.src)
            }}
            style={{ boxShadow: `5px 5px 0px ${item.boxShadow}` }}>
            {/* <div className={styles.boxShadow} style={{backgroundColor:'#C6D4FF'}}></div> */}
            <div className={styles.getStartCardTop}>
              <div className={styles.getStartCardImage}
                style={{
                  position: 'relative',
                  width: '306px',
                  height: '299px',
                  transform: item.transform
                }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={item.image}
                  alt="map-coin-colors" />
              </div>
            </div>
            <div className={styles.getStartCardTitle}>
              {item.title}
            </div>
            <div className={styles.getStartCardDesc}>
              {item.desc}
            </div>

          </div>)}

      </div>

      <div className={styles.contribute}>
        <div className={styles.contributeLeft}>
          <div className={styles.contributeTitle}>{t('Contribute to MAP Protocol')}</div>
          <div className={styles.contributeDesc}>{t('Just as we root for openness and peer-to-peer decentralization, we aim to make knowledge freely accessible to all. All content on this website is open source. You can propose new edits, suggest sparkling new features, and help us improve.')}</div>
          <div className={styles.button}>
            <Button 
              onClick={() => {
                Router.push('/article?id=learn-about-MAPDAO')
              }}
              variant="contained">{t('Learn about MAPDAO')}</Button>
        
            <Button variant="outlined"
              onClick={() => {
                window.open('https://t.me/MAPprotocol/')
              }}
            >{t('Join Telegram')}</Button>
          </div>
        </div>
        <div className={styles.contributeImage}>
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/run-a-node/run-a-node.png"
            alt="run-a-node" />
        </div>
      </div>

      <CardList />
    </view>
  )
}

