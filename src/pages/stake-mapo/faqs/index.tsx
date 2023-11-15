import * as React from 'react';
import styles from './index.module.css'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation, Trans } from 'next-i18next';
import Image from 'next/image'
import Link from 'next/link';
import { Ul } from '@/components/Ul';
import { Li } from '@/components/Li';
import { AccordionMap } from '@/components/Accordion';


export default function GetMapFaqs() {

    const { t } = useTranslation('stake-mapo');
    const accordionData = [
        {
            title: t('Is there any fee that I should be aware of such as delegation fee?'),
            content: t('When delegating your MAPO to the selected validator(s), you need to pay a small amount of MAPO as gas fees. Also, when you first create your staking account on MAP Relay Chain, a minimum of around 1.5 MAPO will be charged as gas fees.'),

        },
        {
            title: t('What is the minimum amount of MAPO I can start staking?'),
            content: t('You will need 10 MAPO at minimum to start staking.'),
        },
        {
            title: t('How many validators can I choose to vote for?'),
            content: t('There is no limit to the number of validators that you can choose to vote for. However, each time you vote for a new validator, the vote will be counted as a new transaction on the block and you need to pay gas fees for each new transaction.'),
        },
        {
            title: t('How long do I need to wait to receive my staking rewards?'),
            content: t('Rewards are earned once an epoch has been updated. This means you will need to wait around 3 to 5 days after you have voted for your selected validator(s) before receiving your rewards.'),
        },

        {
            title: t('When can I withdraw my staked MAPO?'),
            content: t('You can withdraw your MAPO at any time in an instant once your MAPO has been unlocked. However, there is a 15-day pending period for you to unlock MAPO.'),
        },

        {
            title: t('What is the reward percentage for staking MAPO?'),
            content: <>
                <div>{t('Since you are staking through a validator pool, the performance and reputation of the validator can affect your rewards. Validators that consistently produce blocks and maintain a high level of uptime may offer better rewards to their delegators.')}</div>
                <div >
                    <Trans ns="stake-mapo" i18nKey="You can have multiple accounts for staking, but you cannot use one address for staking and another for receiving rewards. The staking address, once set, is the address of your consensus funds – both initial and subsequent rewards – and cannot be changed. Thus, please keep this address properly backed up and securely stored." components={{
                        link1: <Link target="_blank" href={"https://maposcan.io/validators?page=1&size=10"} className={styles.linkText}></Link>,
                        link2: <Link target="_blank" href={"https://forum.mapprotocol.io/c/validator/9"} className={styles.linkText}></Link>

                    }} /></div>
            </>
        },
        {
            title: t('How to withdraw my staked tokens?'),
            content: <>
                <Li title={<Trans ns="stake-mapo" i18nKey="Go to the Staking Page and connect your wallet" components={{
                    link1: <Link target="_blank" href={"https://staking.mapprotocol.io/"} ></Link>
                }} />}>
                </Li>
                <Li title={t('Unlock the amount you’d like to withdraw')}> </Li>
                <Li title={t('Wait 15 days before you can successfully withdraw the unlocked MAPO')}></Li>
                <Li title={t('Withdraw the unlocked MAPO, and you will get them in an instant')}></Li>
            </>
        },
        {
            title: t('Can the staking address be changed?'),
            content: t('You can have multiple accounts for staking, but you cannot use one address for staking and another for receiving rewards. The staking address, once set, is the address of your consensus funds – both initial and subsequent rewards – and cannot be changed. Thus, please keep this address properly backed up and securely stored.'),
        },
        {
            title: t('How do I know the validator(s) to whom I should delegate my funds?'),
            content: <><div>{t("Since the validator(s) you choose will directly impact your rewards, it’s essential that you do some research before you decide to vote for a certain validator. Some general metrics to look out for when selecting: Current epoch activity rate, social media presence, and commission percentage.")}</div>
                <div >
                    <Trans ns="stake-mapo" i18nKey="You can have multiple accounts for staking, but you cannot use one address for staking and another for receiving rewards. The staking address, once set, is the address of your consensus funds – both initial and subsequent rewards – and cannot be changed. Thus, please keep this address properly backed up and securely stored." components={{
                        link1: <Link target="_blank" href={"https://maposcan.io/validators?page=1&size=10"} className={styles.linkText}></Link>,
                        link2: <Link target="_blank" href={"https://forum.mapprotocol.io/c/validator/9"} className={styles.linkText}></Link>

                    }} /></div>
            </>,
        },
        {
            title: t('What are the factors that may affect the staking rewards?'),
            content: <> <div>{t('Staking rewards are subject to fluctuation depending on the validator(s) you choose, the number of staking participants that are staking, transaction volume and other factors.')}</div>
                <div><Trans ns="stake-mapo" i18nKey="At the time of posting, stakers on MAP Protocol are earning staking rewards of 13.12% APY. For the most up-to-date information, head to MAPO Scan." components={{
                    link1: <Link target="_blank" href={"https://maposcan.io/validators?page=1&size=10"} className={styles.linkText}></Link>,

                }} /></div>
            </>
        },
        {
            title: t('What are the risks involved in staking?'),
            content: t('As always, there is usually some form of risk involved in crypto and it is no different with staking. Volatility may also affect the outcome of staking and there are no guarantees as the staking process is randomized and price fluctuations need to always be taken into account.'),
        },
    ];


    return (<>
        <div className={styles.main}>
            <div className={styles.title}>{t('User Staking FAQs')} </div>

            <AccordionMap data={accordionData} />


        </div>
    </>
    );
}

