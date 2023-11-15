import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';
import { Ul } from '@/components/Ul';
import { Li } from '@/components/Li';
import Router from 'next/router';
import { HandTip } from '@/components/HandTip';



type Props = {
  // Add custom props here
}
interface CardInfo {
  cardTitle: String,
  cardContent: String,
  cardLink: String,
  cardLinkText: String
}


const GetMapCard = ({ cardInfo, index }: { cardInfo: CardInfo, index: Number }) => {

  return (
    <div className={styles.card}>
      <Image
        width={40}
        height={40}
        className={styles.cardIcon}
        src={`/fonts/stake-mapo/font${index}.svg`}
        alt="" />
      <div className={styles.cardTitle}>{cardInfo.cardTitle}</div>
      <div className={styles.cardDesc}>{cardInfo.cardContent}</div>

    </div>)
}

export default function Body(

) {

  const { t } = useTranslation('stake-mapo');
  const cardData: Array<CardInfo> = [{
    cardTitle: t('Earn rewards'),
    cardContent: t("Rewards are given for actions that help the network reach consensus. You'll get rewards for delegating your asset to the right validator that properly batches transactions into new blocks and checks the work of other validators because that's what keeps the chain running securely."),
    cardLink: 'mapo',
    cardLinkText: t('View more details'),
  },
  {
    cardTitle: t('Better security'),
    cardContent: t("The network gets stronger against attacks as more MAPO is staked, as it then requires more MAPO to control a majority of the network. To become a threat, you would need to hold the majority of validators, which means you'd need to control the majority of MAPO in the system–that's a lot!"),
    cardLink: 'dexs',
    cardLinkText: t('Go to a DEX'),
  }, {
    cardTitle: t('More sustainability'),
    cardContent: t("Stakers don't need to do energy-intensive proof-of-work computations to participate in securing the network meaning staking nodes can run on relatively modest hardware using very little energy."),
    cardLink: 'cexs',
    cardLinkText: t('Find a CEX'),
  }]
  return (
    <>
      
      <div className={styles.whyTitle}>
        {t("Why stake your MAPO")}
      </div>
      <div className={styles.cardList}>
        {cardData.map((item, index) => <GetMapCard key={index} cardInfo={item} index={index} />)}
      </div>

      <div className={styles.whatIsStaking} >
        <div className={styles.stakeImage2}
          style={{
            position: 'relative', width: '470px', height: '458px'
          }}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/stake-mapo/stake-mapo-2.png"

            alt="stake-mapo-2" />
        </div>


        <div className={styles.mainRight}>
          <div className={styles.title}>{t('What is staking')}</div>
          <div className={styles.desc}>{t('Generally, staking is the process of participating in a proof-of-stake (PoS) or a similar consensus mechanism to support the operations of a blockchain network. Participants lock up a certain amount of cryptocurrency in a wallet to help validate transactions, secure the network, and produce new blocks. In return, participants usually receive additional tokens as rewards, potentially leading to a stream of passive income.')}</div>
          <div className={styles.desc}>{
            <Trans ns="stake-mapo" i18nKey="In MAP Protocol, staking is the act of locking certain amounts of MAPO into the MAPO Validator Pool. Both validators and users can participate in staking." components={{
              link1: <Link target="_blank" href={"https://maposcan.io/validators?page=1&size=10"} className={styles.linkText}></Link>
            }} />}</div>
          <div className={styles.desc}>{t('Once validators have configured their Validator node, they need to have 1 Million MAPO in their staking pool. Users can participate in staking by delegating their MAPO to the stake of a particular Validator; in this way, they help that Validator operate and earn a percentage of rewards based on their stake.')}</div>


          <div className={styles.moreButton}>
            <Button onClick={() => {
              Router.push('/get-map')
            }} variant="contained">{t('More on how to get MAPO')}</Button>
          </div>
        </div>

      </div>
      <div className={styles.howStake}>
        <div className={styles.howTitle}>
          {t("How to stake MAPO as a user")}
        </div>
        <div className={styles.howDesc}>
          <Trans ns="stake-mapo" i18nKey="*IMPORTANT: To stake successfully, you need to have MAPO in your wallet first. You can get MAPO via Butter Swap. Once you have MAPO ready in your wallet, you can proceed as below:" components={{
            link1: <Link target="_blank" href={"https://www.butterswap.io/"} className={styles.linkText}></Link>
          }} />
        </div>
        <div className={styles.howFirst}>
          <div className={styles.firstleft}>
            <div className={styles.stepTitle} >
              <Image
                width={40}
                height={40}
                src="/fonts/stake-mapo/stake-0.svg"
                alt="" />
              {<div><Trans ns="stake-mapo" i18nKey="Go to the Staking Page and connect your wallet" components={{
                link1: <Link target="_blank" href={"https://staking.mapprotocol.io/"} ></Link>
              }} /></div>}
            </div>
            <div className={styles.li}> {t('To stake successfully, you need to have MAPO in your wallet first. You can get MAPO via Butter Swap. Once you have MAPO ready in your wallet, you can proceed as below.')}</div>
            <div className={styles.moreButton}>
              <Button onClick={() => {
                window.open('https://maposcan.io/validators?page=1&size=10')
              }} variant="contained">{t('Get MAPO')}</Button>
            </div>
            <div className={styles.stepTitle} style={{
              marginTop: '48px'
            }} >
              <Image
                width={40}
                height={40}
                src="/fonts/stake-mapo/stake-1.svg"
                alt="" />
              {t('Lock your MAPO for staking')}
            </div>
            <div className={styles.li}> {t('If this is your first time participating in staking, you will then be asked to create an account first. Simply enter your account name, click “Submit”, and go to the staking page to lock your MAPO.')}</div>
            <div className={styles.li}> {t('The amount of MAPO locked should be the amount of MAPO you would be able to use for staking. “Unlock” shows the amount of MAPO tokens remaining in your wallet that are not locked.')}</div>
            <div className={styles.li}> {t('Hit the “Lock” button and put in the amount you want to use for staking.')}</div>


          </div>
          <div className={styles.stakeImage2}
            style={{
              position: 'relative', width: '314px', height: '282px'
            }}
          >
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/images/stake-mapo/stake-mapo-3.png"
              alt="stake-mapo-2" />
          </div>
        </div>
        <div className={styles.howSecound}>
          <div className={styles.stakeImage2}
            style={{
              position: 'relative', width: '363px', height: '322px'
            }}
          >
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/images/stake-mapo/stake-mapo-4.png"
              alt="stake-mapo-2" />
          </div>

          <div className={styles.secoundRight}>
            <div className={styles.stepTitle} >
              <Image
                width={40}
                height={40}
                src="/fonts/stake-mapo/stake-2.svg"
                alt="" />{t('Select the validator and delegate your MAPO')}
            </div>
            <div className={styles.li}> {t('Once you have locked certain amounts of MAPO, you can select the validator(s) you would like to delegate your MAPO to. The act of selecting a validator is referred to as “Vote”.')}</div>
            <div className={styles.li}> {<Trans ns="stake-mapo" i18nKey="Visit the validator pool info page and review their performance before you decide on the validator(s) you would like to vote for. You can also read the validators’ intro on the MAP Protocol Validator forum page to see why you should vote for a certain validator." components={{
              link1: <Link target="_blank" href={"https://maposcan.io/validators?page=1&size=10"} className={styles.linkText}></Link>,
              link2: <Link target="_blank" href={"https://forum.mapprotocol.io/c/validator/9"} className={styles.linkText}></Link>

            }} />}</div>
            <div className={styles.moreButton}>
              <Button onClick={() => {
                Router.push('/get-map')
              }} variant="contained">{t('Check validator info')}</Button>
            </div>
            <HandTip style={{
              marginTop: '32px',
              marginBottom: '50px',
              border: "1px solid #eee",

            }}> {t('When choosing validators, you are responsible for doing your own research and voting for the competent ones. Your MAPO will be delegated to the validators of your choice.')}</HandTip>
            <div className={styles.stepTitle} >
              <Image
                width={40}
                height={40}
                src="/fonts/stake-mapo/stake-2.svg"
                alt="" />
              {t('Enter the amount you want to stake')}
            </div>
            <div className={styles.li}> {t('Once you have locked certain amounts of MAPO, you can select the validator(s) you would like to delegate your MAPO to. The act of selecting a validator is referred to as “Vote”.')}</div>
          </div>
        </div>
      </div>
    </>
  )
}

