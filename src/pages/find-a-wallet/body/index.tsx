import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';
import { Li } from '@/components/Li';
import { HandTip } from '@/components/HandTip';



type Props = {
  // Add custom props here
}
interface CardInfo {
  cardTitle: string,
  src: string,
  webSite: string,
  x: string
}


export default function Body(

) {

  const { t } = useTranslation('find-a-wallet');
  const cardData: Array<CardInfo> = [{
    cardTitle: 'Metamask',
    src: "/images/find-a-wallet/metamask.png",
    webSite: 'https://metamask.io/',
    x: "https://twitter.com/MetaMask"
  },
  {
    cardTitle: 'Token Pocket',
    src: "/images/find-a-wallet/tp.png",
    webSite: 'https://www.tokenpocket.pro/',
    x: "https://twitter.com/TokenPocket_TP"

  }, {
    cardTitle: 'Particle Wallet',
    src: "/images/find-a-wallet/particle.png",
    webSite: 'https://wallet-debug.particle.network/',
    x: "https://twitter.com/ParticleNtwrk",
  },
  {
    cardTitle: 'Bitget Wallet',
    src: "/images/find-a-wallet/Bitget.png",
    webSite: 'https://web3.Bitget.com/',
    x: "https://twitter.com/BitgetWallet",
  }]
  return (
    <>
      <div className={styles.walletForMAPO} >
        <div className={styles.title}>
          {t('Wallet for MAPO')}
        </div>
        <div className={styles.desc}>
          {t('You use the following wallets to directly use and send MAPO and MAP.')}
        </div>


        <div className={styles.desc}>
          <Trans ns="find-a-wallet" i18nKey="More on where to get MAPO and how to add MAP Relay Chain and MAP to your wallet." components={{
            link1: <Link href={"/get-mapo"} className={styles.linkText}></Link>,
            link2: <Link href={"/article?id=add-map-relay-chain"} className={styles.linkText}></Link>
          }} />
        </div>
        <div className={styles.walletCards}>
          {cardData.map(item =>
            <div key={item.cardTitle}
             className={styles.walletCard}>
              <div className={styles.walletImage}>
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={item.src}
                  alt="map-coin-wallet" />
              </div>
              <div className={styles.right}>
                <div className={styles.walletTitle}>
                  {item.cardTitle}
                </div>
                <div className={styles.walletSubTitle}>
                  IOS | Android | Chromium | Firefox
                </div>
                <div className={styles.walletlink}>
                  <div className={styles.linkIcon}
                    onClick={() => {
                      window.open(item.webSite, '_blank');
                    }}

                  >
                    <Image
                      fill
                      style={{ objectFit: "contain" }}
                      src="/images/find-a-wallet/net.png"
                      alt="map-coin-wallet" />
                  </div>
                  <div
                    onClick={() => {
                      window.open(item.x, '_blank');

                    }}
                    className={styles.linkIcon} >
                    <Image
                      fill
                      style={{ objectFit: "contain" }}
                      src="/images/find-a-wallet/x.png"
                      alt="map-coin-wallet" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.buildNode}>
        <div className={styles.title}>{t('Choose wallets that fit your needs')}</div>
        <div className={styles.desc} style={{ maxWidth: '613px' }}>
          {t('Choosing a cryptocurrency wallet depends on various factors such as your investment needs, desired level of security, ease of use, and the types of cryptocurrencies you intend to hold. Below are some considerations that may help you make an informed decision:')}
        </div>
        <div className={styles.buildNodeContent}>
          <div className={styles.contentHalf}>
            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-0.svg"
                  alt="" />
                {t('Security')}
              </div>
              <Li className={styles.li} title={t('Cold Wallets: Generally, hardware wallets or cold storage wallets are the most secure as they are not connected to the internet, reducing the risk of hacking.')}></Li>
              <Li className={styles.li} title={t('Hot Wallets: These are software-based and are connected to the internet. They are easier to use but are generally less secure compared to cold wallets.')}></Li>
              <Li className={styles.li} title={
                <Trans ns="find-a-wallet" i18nKey="More on Cold Wallets and Hot Wallets" components={{
                  link1: <Link href={"/article?id=hot-wallets-vs-cold-wallets"} className={styles.linkText}></Link>,
                }} />
              }></Li>
            </div>
            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-1.svg"
                  alt="" />
                {t('User Experience')}
              </div>
              <Li className={styles.li} title={t('User-Friendly Interface: Some wallets are easier to use than others and come with a more intuitive design.')}></Li>
              <Li className={styles.li} title={t('Technical Features: More experienced users may want advanced features like built-in exchanges, connection to DApps, etc.')}></Li>
            </div>

            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-2.svg"
                  alt="" />
                {t('Backup and Recovery')}
              </div>
              <Li className={styles.li} title={t('Consider wallets that have straightforward yet secure backup and recovery options.')}></Li>
            </div>
            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-4.svg"
                  alt="" />
                {t('Costs')}
              </div>
              <Li className={styles.li} title={t("Some wallets are free, but more secure options like hardware wallets come at a cost. There may also be transaction fees associated with a wallet's service.")}></Li>
            </div>
            <div className={styles.buildImage}
            >
              <Image
                fill
                style={{ objectFit: "contain" }}
                src="/images/find-a-wallet/find-a-wallet-1.png"
                alt="find-a-wallet-1" />
            </div>
            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-10.svg"
                  alt="" />
                {t('Development and Updates')}
              </div>
              <Li className={styles.li} title={t("Check if the wallet is actively being updated and improved to guard against potential future security threats.")}></Li>
            </div>

          </div>
          <div className={styles.contentHalf}>
            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-6.svg"
                  alt="" />
                {t('Type of Cryptocurrency')}
              </div>
              <Li className={styles.li} title={t("Multi-Currency Wallets: If you plan on holding multiple types of cryptocurrencies, you may want a wallet that supports this.")}></Li>
              <Li className={styles.li} title={t("Single-Currency Wallets: These only support one type of cryptocurrency and might be useful if you are only dealing with a single asset.")}></Li>
            </div>
            <div className={styles.buildImage}
            >
              <Image
                fill
                style={{ objectFit: "contain" }}
                src="/images/find-a-wallet/find-a-wallet-2.png"
                alt="find-a-wallet-2" />
            </div>


            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-7.svg"
                  alt="" />
                {t('Community and Reviews')}
              </div>
              <Li className={styles.li} title={t("Checking reviews and asking for recommendations can provide insights into the wallet’s reputation and functionality.")}></Li>
            </div>

            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-8.svg"
                  alt="" />
                {t('Regulatory Compliance')}
              </div>
              <Li className={styles.li} title={t("Some wallets come with additional features such as KYC procedures that are required for regulatory compliance. Make sure the wallet complies with the jurisdiction you are in.")}></Li>
            </div>


            <div className={styles.buildStep}>
              <div className={styles.stepTitle} >
                <Image
                  width={40}
                  height={40}
                  src="/fonts/find-a-wallet/find-a-wallet-9.svg"
                  alt="" />
                {t('Mobile vs. Desktop vs. Web')}
              </div>
              <Li className={styles.li} title={t("Your lifestyle and where you intend to manage your assets can also influence your decision. Mobile wallets are useful for people on the go, whereas desktop wallets may offer more features.")}></Li>
            </div>

            <HandTip style={{
              marginTop: '20px',
              marginBottom: '50px',
              border:"1px solid #eee",
            }}> {<div>{t('By weighing these factors based on your individual needs and conducting thorough research, you can make a more informed choice about which cryptocurrency wallet to use.')}</div>}</HandTip>
          </div>
        </div>
      </div>
    </>
  )
}

