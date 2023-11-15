import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';
import { Ul } from '@/components/Ul';
import { Li } from '@/components/Li';
import { HandTip } from '@/components/HandTip';
import CardList from '@/components/ExploreCard';
import Router, { useRouter } from 'next/router';



type Props = {
  // Add custom props here
}



export default function Body(

) {

  const { t } = useTranslation('run-a-node');
  const router = useRouter();

  return (
    <>
      <div className={styles.whatIsNode} >
        <div className={styles.nodeImage2}
          style={{
            position: 'relative', width: '397px', height: '482px'
          }}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/images/run-a-node/run-a-node-2.png"
            alt="run-a-node-2" />
        </div>


        <div className={styles.mainRight}>
          <div className={styles.title}>{t('What is a node?')}</div>
          <div className={styles.desc}>{t('In a blockchain network, a node is a computer that participates in the network and maintains a copy of the distributed ledger, i.e., the blockchain. Nodes in blockchain networks can have different roles and responsibilities, depending on the architecture and consensus algorithm of the specific blockchain.')}</div>
          <div className={styles.desc}>{t('As a POS chain, MAP Protocol needs validator nodes responsible for validating transactions and maintaining the MAP Relay Chain network in its safest state possible.')}</div>
          <div className={styles.title}
            style={{ marginTop: "40px" }}>{t('Who can run a node?')}</div>
          <div className={styles.desc}>{t('Anyone with the appropriate setup and sufficient stake can become a validator.')}</div>
          <HandTip style={{
            marginTop: '32px',
            marginBottom: '50px'
          }}> {<div>
            <Trans ns="run-a-node" i18nKey="You can find an overview of all current validators and their votes on MAPO Scan and the complete guides on how to become a new validator here." components={{
              link1: <Link target="_blank" href={"https://mapscan.io/validators"} ></Link>,
              link2: <Link target="_blank" href={router.locale == 'zh' ? 'https://mapo.gitbook.io/docs-zh/ji-chu-zhu-ti/architecture/shi-li/how-to-become-a-new-validator' : 'https://mapo.gitbook.io/docs-en/base/architecture_en/example/how-to-become-a-new-validator_en'}></Link>
            }} /></div>}</HandTip>
        </div>

      </div>



      <div className={styles.buildNode}>
        <div className={styles.buildTitle}>
          {t("Build your node")}
        </div>

        <div className={styles.buildStep}>
          <div className={styles.stepTitle} >
            <Image
              width={40}
              height={40}
              src="/fonts/run-a-node/hardware.svg"
              alt="" />
            {t('Hardware')}
          </div>
          <Li className={styles.li} title={t('MAP Protocol is a Proof Of Stake network with different hardware requirements than a Proof of Work network. Proof Of Stake consensus is less CPU intensive but is more sensitive to network connectivity and latency.')}></Li>
          <Li className={styles.li} title={
            <Link target="_blank" href={"https://releases.ubuntu.com/20.04/"} className={styles.linkText}>Ubuntu 20.04 LTS</Link>
          }></Li>
          <Li className={styles.li} title={t('Below is a list of standard requirements for running Validator on the MAPO Network.')}></Li>
          <div className={styles.form}>
            <div className={styles.formItem}>
              <div className={styles.formTitle}>{t('Memory')}</div>
              {t('16 GB')}
            </div>
            <div className={styles.formItem}>
              <div className={styles.formTitle}>{t('CPU')}</div>
              {t('Quad-core 2.5 GHz (64-bit)')}
            </div>
            <div className={styles.formItem}>
              <div className={styles.formTitle}>{t('Disk')}</div>
              {t('256 GB of SSD storage, plus a secondary HDD')}
            </div>
            <div className={styles.formItem} style={{
              borderWidth: '0px'
            }}>
              <div className={styles.formTitle}>{t('Network')}</div>
              {t('At least 100 Mb input/output Ethernet with a fiber Internet connection (ideally redundant connections and HA switches)')}
            </div>
          </div>
        </div>

        <div className={styles.buildStep}>
          <div className={styles.stepTitle} >
            <Image
              width={40}
              height={40}
              src="/fonts/run-a-node/software.svg"
              alt="" />
            {t('Software')}
          </div>
          <Li className={styles.li} title={t('Building atlas requires git, Go (version 1.14 or later), and a C compiler.')}></Li>
          <Li className={styles.li} title={t('You can install them using your favorite package manager.')}></Li>
        </div>

        <div className={styles.buildStep}>
          <div className={styles.stepTitle} >
            <Image
              width={40}
              height={40}
              src="/fonts/run-a-node/others.svg"
              alt="" />
            {t('Others')}
          </div>
          <Li className={styles.li} title={t('Your account needs to have at least 1,000,000 MAPO.')}></Li>
        </div>

      </div>

      <div className={styles.runNode}>
        <div className={styles.runTitle}>
          {t('Run your node')}
        </div>
        <div className={styles.runDesc}>
          {t('Make sure you’ve met our prerequisite before running your validator note on MAP Protocol. Follow the five steps or the advanced guides to get your validator note on MAP Protocol running.')}
        </div>
        <HandTip style={{
          marginTop: '48px',
          marginBottom: '36px',
          background: '#F7F7F7',
          width: 'max-content',
          maxWidth: '100%',
          alignSelf: 'center'
        }}> {<div><Trans ns="run-a-node" i18nKey="You can also browse our guides on How To Become A New Validator to get started." components={{
          link1: <Link target="_blank" href={router.locale == 'zh' ? 'https://mapo.gitbook.io/docs-zh/ji-chu-zhu-ti/architecture/shi-li/how-to-become-a-new-validator' : "https://mapo.gitbook.io/docs-en/base/architecture_en/example/how-to-become-a-new-validator_en"} className={styles.linkText}></Link>,

        }} /></div>}</HandTip>
        <div className={styles.stepTop}>
          <div className={styles.stepLeft}>
            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/run-a-node/run-a-node-0.svg"
                  alt="" />
                {t('Step 1: Create an account')}
              </div>
              <div className={styles.stepDesc}>
                {t('In this step, you need to transfer your identification information to the corresponding management contract, which will manage your account, keys, and metadata.')}
              </div>
              <div className={styles.stepDesc}>
                <Trans ns="run-a-node" i18nKey="The purpose of this step is to keep your locked MAPO more secure by authorizing alternative keys to be used for signing attestations, voting, and validating. By doing so, you can continue to participate in the protocol while keeping the key with access to your locked MAPO in storage." components={{
                  text: <text className={styles.inlineText}></text>,
                }} />
              </div>
              <div className={styles.stepDesc}>
                <Trans ns="run-a-node" i18nKey="You need createAccount command to perform the above operations. For more details about createAccount command, please see this." components={{
                  text: <text className={styles.inlineText}></text>,
                  link1: <Link target="_blank" href={"https://docs.mapprotocol.io/develop/map-relay-chain/marker/aboutcommon#createaccount"} ></Link>,

                }} />
              </div>
            </div>
            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/run-a-node/run-a-node-1.svg"
                  alt="" />
                {t('Step 2: Authorize')}
              </div>
              <div className={styles.stepDesc}>
                {t('Authorizes an address to sign consensus messages on behalf of the account. This authorized address is called the signer. As its name suggests, the signer is only responsible for signing. Your reward will not be issued to the signer but to the account created in the previous step.')}
              </div>
            </div>
          </div>
          <div className={styles.runNodeImage} >
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/images/run-a-node/run-a-node.png"
              alt="run-a-node-1" />
          </div>
        </div >

        <div className={styles.buildStep}>
          <div className={styles.stepTitle} >
            <Image
              width={40}
              height={40}
              src="/fonts/run-a-node/run-a-node-2.svg"
              alt="" />
            {t('Step 3: Locked MAPO')}
          </div>
          <div className={styles.stepDesc}>
            <Trans ns="run-a-node" i18nKey="The threshold we set to be the validator is to lock 1,000,000 MAPO into the corresponding management smart contract. This locked MAPO will be used for future punishment, which is also one of the conditions for being elected." components={{
              text: <text className={styles.inlineText}></text>,
            }} />
          </div>
          <div className={styles.stepDesc}>
            <Trans ns="run-a-node" i18nKey="You need lockedMAPO command to perform the above operations, more detail about lockedMAPO command please see this." components={{
              text: <text className={styles.inlineText}></text>,
              link1: <Link target="_blank" href={"https://docs.mapprotocol.io/develop/map-relay-chain/marker/aboutcommon#lockedmap"} ></Link>,
            }} />
          </div>
        </div>

        <div className={styles.buildStep}>
          <div className={styles.stepTitle} >
            <Image
              width={40}
              height={40}
              src="/fonts/run-a-node/run-a-node-3.svg"
              alt="" />
            {t('Step 4: Validator register')}
          </div>
          <div className={styles.stepDesc}>
            <Trans ns="run-a-node" i18nKey="This step is a key step for registering as a new validator. You need register command to perform the above operations. For more details about register command please see this." components={{
              text: <text className={styles.inlineText}></text>,
              link1: <Link target="_blank" href={"https://docs.mapprotocol.io/develop/map-relay-chain/marker/aboutvalidator#register"} ></Link>,
            }} />
          </div>
          <div className={styles.stepDesc}>
            <Trans ns="run-a-node" i18nKey="At this step, you will successfully register as a validator. Next, you can try to vote for yourself. For details on how to vote please see this." components={{
              link1: <Link target="_blank" href={"https://docs.mapprotocol.io/develop/map-relay-chain/marker/aboutvote#vote"} ></Link>,
            }} />
          </div>
        </div>

        <div className={styles.buildStep}>
          <div className={styles.stepTitle} >
            <Image
              width={40}
              height={40}
              src="/fonts/run-a-node/run-a-node-4.svg"
              alt="" />
            {t('Step 5: Vote')}
          </div>
          <div className={styles.stepDesc}>
            {t('Validators must have at least 0.001 proportion of the votes to be considered for the election, so the validator needs to have votes. You can use your validator account to vote for yourself, or you can let other validators or users delegate votes for you.')}
          </div>
          <div className={styles.stepDesc}>
            <Trans ns="run-a-node" i18nKey="Since you’ve locked in 1,000,000 MAPO in Step 3, it's a great decision to vote for yourself now." components={{
              text: <text className={styles.inlineText}></text>,
              link1: <Link target="_blank" href={"https://docs.mapprotocol.io/develop/map-relay-chain/getting-started/how-to-vote"} ></Link>,
            }} />
          </div>
        </div>
      </div >
      <div className={styles.stake}>

        <div className={styles.stakeImage}>
          <Image
            fill
            objectFit="contain"
            src="/images/find-a-wallet/find-a-wallet-2.png"
            alt="find-a-wallet-2" />
        </div>
        <div className={styles.stakeLeft}>
          <div className={styles.stakeTitle}>{t('Stake your MAPO')}</div>
          <div className={styles.stakeDesc}>{t("If building your own node feels daunting or falls outside your technical expertise, you don't have to be sidelined. Just stake MAPO! You can still play a pivotal role in fortifying and sustaining our network.")}</div>
          <div className={styles.stakeButton}>
            <Button onClick={() => {
              Router.push(`/stake-mapo`)
            }} variant="contained">{t('Stake your MAPO')}</Button>
          </div>
        </div>
      </div>
      <CardList />
    </>
  )
}

