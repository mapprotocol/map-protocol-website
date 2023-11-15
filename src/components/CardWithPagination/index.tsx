import React, { useState, useEffect } from 'react';
import styles from './index.module.css'; // 确保路径正确
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTranslation } from 'next-i18next';

const CardWithPagination: React.FC = () => {
  const { t } = useTranslation(['what-is-map-protocol-2']);

  const [currentPage, setCurrentPage] = useState(0);
    const cardContents = [
        {
            title: t('Unlocking the future of Bitcoin ecosystem'),
            content: <>
                <p>{t('Due to the lack of Turing completeness, Bitcoin is limited in its usability compared to Ethereum, and its ecosystem grows slowly. However, as BCR-20 tokens and Ordinal NFTs took over the Web3 sphere in May 2023, The new narrative of the Bitcoin ecosystem has revoked topics and debates on Bitcoin interoperability.')}</p>
                <p>{t('With MAP Protocol’s BRC-201, a cross-chain extension protocol to BRC-20 tokens, BRC-20 and ORC-20 assets on the Bitcoin network can interact with other tokens on other public chains. This layer of Bitcoin network cross-chain interoperability will also grow the Bitcoin community as a whole.')}</p>
            </>
        },
        {
            title: t('Towards a truly interoperable future'),
            content: <>
                <p>{t("Today, most interoperability solutions only emphasize asset cross-chain transactions. However, a truly interoperable Web3 future extends beyond that — it's a future where dApp operations including transactions, data storage, and computing are performed on the blockchain and are interoperable across different chains, giving users full control over their data and privacy.")}</p>
                <p>{t('MAP Protocol paves the way for this truly interoperable Web3 future. Through MAP Protocol, developers can seamlessly integrate various blockchain components, enabling the construction of apps where all operations are on-chain. This provides users with complete control over their data and assets across multiple chains.')}</p>
            </>
        },
        {
            title: t('Further empowering gamers'),
            content: <>
                <p>{t('Traditionally, gamers are limited by centralized gaming service platforms and do not actually own the in-game items they have purchased or acquired. To trade or transfer in-game assets, gamers are forced to use black market websites which often come with extra security risks.')}</p>
                <p>{t('Blockchain gaming has changed this old gaming modality. Web3 projects such as Crypto Kitties, Axie Infinity, and Dark Forest have created a new gaming paradigm where players are encouraged to trade in-game items and are rewarded for their playtime. As with many first-time innovations, however, those blockchain gaming projects are far from perfect and have turned off true gamers due to scalability issues, transaction fees, and the complexity of managing blockchain-based assets.')}</p>
                <p>{t('This is where omnichain and fully on-chain gaming comes in. Through MAP Protocol, GameFi projects can not only have gaming assets tradable and interoperable on all chains but all aspects of game state, logic, and data on the blockchain, so blockchain gaming becomes an autonomous world where players have their full agency and contribute to the development of the game.')}</p>
            </>
        },
        {
            title: t('Enabling easy cross-chain asset flows'),
            content: <>
                <p>{t('MAP Protocol leverages light clients and Zero-Knowledge (ZK) proofs to offer a trustless environment for seamless asset transfers across multiple blockchains, including both EVM and non-EVM chains. This eliminates the need for centralized authorities or third-party services, reinforcing the principles of decentralization while ensuring secure and efficient transactions.')}</p>
                <p>{t('Beyond simple asset transfers, MAP Protocol also enables cross-chain communication for storage and computing capacities. This offers unprecedented flexibility for decentralized application (dApp) developers to build more robust, scalable, and interoperable applications. The technology stands as a pivotal contribution to the blockchain ecosystem, bringing us closer to a truly interconnected world where assets and resources flow effortlessly between chains.')}</p>
            </>
        },
        {
            title: t('Saving time and money to build awesome apps'),
            content: <>
                <p>{t('Building on a single chain is simple with low maintenance, but at the same time has limited user reach and adaptability, thus adding extra work to deploy on other chains or use a potentially unsafe cross-chain solution. Moreover, building on multiple blockchains means managing multiple ledgers at the same time, and this can be difficult and more costly than operating on a single chain.')}</p>
                <p>{t('Instead of choosing between the lesser of two evils, sacrificing time and resources to become multi-chain or cross-chain, and compromising on feature development, projects and developers can directly deploy on MAP Protocol or use MAP Protocol to become omnichain where they do not have to spend extra time and money on finding a cross-chain solution or using bridges to become multi-chain.')}</p>
                <p>{t('With MAP Protocol, projects only need to focus on all the essentials for app development and find ways to enhance user experiences, so that innovation can come and drive real dApp mass adoption.')}</p>
            </>
        },
    ];
  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % cardContents.length);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + cardContents.length) % cardContents.length);
  };

  useEffect(() => {
    // const intervalId = setInterval(nextPage, 8000); 

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        {cardContents[currentPage].title}
      </div>
      <div className={styles.cardContent}>
        {cardContents[currentPage].content}
      </div>
      <div className={styles.cardFooter}>

        <div className={styles.paginationDots}>
          {cardContents.map((_: any, index: React.Key | null | undefined) => (
            <span key={index} className={`${styles.dot} ${index === currentPage ? styles.active : ''}`}></span>
          ))}
        </div>
        <div className={styles.paginationButton}>
          <div className={styles.pageButton} onClick={prevPage}><KeyboardArrowLeftIcon /></div>
          <div className={styles.pageButton} onClick={nextPage}><KeyboardArrowRightIcon /></div>
        </div>
      </div>
    </div>
  );
};

export default CardWithPagination;
