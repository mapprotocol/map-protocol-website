import Image from 'next/image'
import styles from './index.module.css'
import { Button, Box, Popover, Typography } from '@mui/material';
import Link from "next/link";
import { useTranslation, Trans } from 'next-i18next';
import Router, { useRouter } from 'next/router';

export default function ColorsContent(

) {
    const { t } = useTranslation('home-page');
    const router = useRouter();

    return (
        <>
            <div className={styles.contentItem}>
                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('What is MAP Protocol?')}
                    </div>
                    <div className={styles.desc}>
                        <Trans ns="home-page" i18nKey="MAP Protocol serves as a Bitcoin layer-2 dedicated to Bitcoin ecosystem development. It also provides the essential infrastructure for achieving interoperability among blockchain-based assets, storage, and computing. Built upon the light client and zero-knowledge proof technology, our interoperable cross-chain solution is peer-to-peer, without any trusted third-party entities, thus turning siloed blockchains or blockchains using third-party bridges into an all-in-one Web3 development platform and Web3 user gateway." components={{
                            link1: <Link target="_blank" href={"https://github.com/mapprotocol/map-contracts/tree/main/mapclients/zkLightClient"} ></Link>,
                        }} />
                    </div>
                    <div className={styles.button}>
                        <Button
                            onClick={
                                () => {
                                    Router.push('/what-is-map-protocol')
                                }}
                            variant="contained">{t('More on MAP Protocol')}</Button></div>
                </div>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                        // transform: 'translateY(48px)'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/home-page/home-page-content-1.png"
                        alt="map-coin-colors" />
                </div>


            </div>
            <div className={styles.contentItem} style={{ backgroundColor: '#FFF5F3' }}>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                        // transform: 'translateY(48px)'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/article/bitcoin.png"
                        alt="map-coin-colors" />
                </div>
                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('The case for MAP Protocol as Bitcoin layer-2')}
                    </div>
                    <div className={styles.desc}>
                        {t('Due to the lack of Turing completeness, Bitcoin is limited in its usability compared to Ethereum, and its ecosystem grows slowly. As a Bitcoin layer-2 and an interoperable omnichain infrastructure, MAP Protocol is able to expand the Bitcoin ecosystem’s interoperability and fuel the growth of the Bitcoin community.')}
                    </div>
                    <div className={styles.desc}>
                        {t('With MAP Protocol’s BRC-201, a cross-chain extension protocol to BRC-20 tokens, BRC-20 and ORC-20 assets on the Bitcoin network can interact with other tokens on other public chains. This layer of Bitcoin network cross-chain interoperability will also grow the Bitcoin community as a whole.')}
                    </div>
                    <div className={styles.button}>
                        <Button
                            onClick={
                                () => {
                                    Router.push('/article?id=map-as-bitcoin-layer2')
                                }}
                            variant="contained">{t('More on MAP Protocol')}</Button></div>
                </div>

            </div>
            <div className={styles.contentItem}
                style={{ backgroundColor: '#F0EDFF' }}>

                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t("Don't trust, verify: Refactor light clients verification with ZK-proof")}
                    </div>
                    <div className={styles.desc}>
                        <Trans ns="home-page" i18nKey="First proposed in the form of Simplified Payment Verification (or SPV) in Satoshi Nakamoto's 2008 whitepaper, light client is a way to allow less powerful clients to interact with the network with as many security guarantees as possible. Zero-knowledge proof was first suggested by Manuel Blum, Paul Feldman, and Silvio Micali in 1989 and now has use cases in anonymous payments, authentication, verifiable computation, and on-chain voting." components={{
                            link1: <Link target="_blank" href={"https://bitcoin.org/bitcoin.pdf"} className={styles.linkText}></Link>,
                            link2: <Link target="_blank" href={"http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf"} className={styles.linkText}></Link>,
                        }} />
                    </div>
                    <div className={styles.desc}>
                        <Trans ns="home-page" i18nKey="MAP Protocol has refactored light clients technology with ZK-proof, which further improves light client verification efficiency while keeping the whole verification process peer-to-peer without trusting any third party." components={{
                            link1: <Link href={'/article?id=refactor-light-clients-with-ZK-proof'} ></Link>,
                        }} />
                    </div>
                    <div className={styles.button}>
                        <Button
                            onClick={
                                () => {
                                    Router.push('/article?id=light-clients')
                                }}
                            style={{
                                marginRight: "12px"
                            }} variant="contained">{t('More on light clients')}</Button>

                        <Button
                            onClick={
                                () => {
                                    Router.push('/article?id=zero-knoeledge-proofs')
                                }}
                            variant="outlined">{t('More on zero-knowledge proofs')}</Button>
                    </div>

                </div>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',

                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/home-page/home-page-content-2.png"
                        alt="map-coin-colors" />
                </div>
            </div>
            <div className={styles.contentItem}
                style={{ backgroundColor: '#E9F6F4' }}>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                        // transform: 'translateY(48px)'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/home-page/home-page-content-3.png"
                        alt="map-coin-colors" />
                </div>
                <div className={styles.contentText}
                >
                    <div className={styles.title}>
                        {t('Toward a truly interoperable future: Omnichain and fully on-chain')}
                    </div>
                    <div className={styles.desc}>
                        {t("Today, most interoperability solutions only emphasize asset cross-chain transactions. However, a truly interoperable Web3 future extends beyond that — it's a future where dApp operations including transactions, data storage, and computing are performed on the blockchain and are interoperable across different chains, giving users full control over their data and privacy.")}
                    </div>
                    <div className={styles.desc}>
                        {t('MAP Protocol paves the way for this truly interoperable Web3 future. Through MAP Protocol, developers can connect to a wide range of blockchain ecosystems including the Bitcoin network, and integrate different components, enabling the construction of apps where all operations are on-chain.')}
                    </div>
                    <div className={styles.button}>
                        <Button
                            onClick={
                                () => {
                                    Router.push('/article?id=a-truly-interoperable-future-onwards')
                                }}
                            variant="contained">{t('Explore omnichain and fully on-chain')}</Button>

                    </div>
                </div>

            </div>
            <div className={styles.contentItem}
                style={{ backgroundColor: '#FFF5F3', borderBottom: '#000 1px solid' }}>

                <div className={styles.contentText}>
                    <div className={styles.title}>
                        {t('The all-in-one developer portal')}
                    </div>
                    <div className={styles.desc}>
                        <Trans ns="home-page" i18nKey="MAP Protocol and its apps are transparent and open source, making it the go-to solution for all your blockchain interoperability needs. Whether you wish your chain to connect with another blockchain, build a dApp to operate across multiple blockchains, or even to interact with the Bitcoin ecosystem, we make it easy for you to build anything omnichain and fully on-chain." components={{
                            link1: <Link href={"/article?id=a-truly-interoperable-future-onwards"} ></Link>,
                        }} />
                    </div>
                    <div className={styles.desc}>
                        {t('Dive into our extensive documentation and tutorials to learn how to combine functionalities of different types of blockchains and create an app with groundbreaking features.')}
                    </div>
                    <div className={styles.button}>
                        <Button
                            onClick={
                                () => {
                                    window.open(router.locale == 'zh' ? 'https://mapo.gitbook.io/docs-zh/' : 'https://mapo.gitbook.io/docs-en/')
                                }}

                            variant="contained">{t('View documentation')}</Button>
                    </div>
                </div>
                <div className={styles.contentImage}
                    style={{
                        position: 'relative',
                        width: '480px',
                        height: '509px',
                        // transform: 'translateY(48px)'
                    }}
                >
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src="/images/home-page/home-page-content-4.png"
                        alt="map-coin-colors" />
                </div>
            </div>
        </>
    )
}

