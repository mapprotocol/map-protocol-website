import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import styles from './index.module.css'
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { shuffleArray } from '@/utils/number';

interface CardProps {
    title: string;
    content: string;
    index: number,
    link: string,
    src: string
}
const shadowArray = [
    "#C6D4FF",
    "#DAD4FF",
    "#FFEDC8",
    "#D6F5FA",
    "#C6D4FF",
    "#DAD4FF",
    "#FFEDC8",
    "#D6F5FA",
]
const Card: React.FC<CardProps> = ({ title, content, index, src, link }) => {

    const onClickCard = () => {
        Router.push(link)
    }
    return (
        <div
            style={{ boxShadow: `5px 5px 0px ${shadowArray[index]}` }}
            onClick={onClickCard} // 绑定点击事件
            className={styles.card}>
            <div className={styles.imageContent}>
                <div className={styles.topImage}>
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={src}
                        alt="" />
                </div>
            </div>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardContent}>{content}</div>
        </div>
    );
};

interface CardData {
    id: number;
    title: string;
    content: string;
    link: string,
    src: string
}



const CardList: React.FC = () => {
    const { t } = useTranslation('common');
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragged, setDragged] = useState(false); // 添加一个状态来跟踪是否有拖动发生
    const [cardData,setCardData] = useState<any>([])
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft ?? 0));
        setScrollLeft(containerRef.current?.scrollLeft ?? 0);
        setDragged(false); // 在开始拖动时，设置为false
    };
    const router = useRouter()
   
    useEffect(()=>{
        setCardData(shuffleArray([
            {
                id: 1,
                title: t('MAP Protocol resources and intel'),
                content: t('You can learn more about MAP Protocol from the MAP Protocol Whitepaper, which consists of all the basic principles and technical framework of MAP Protocol.'),
                link: '/article?id=whitepaper',
                src: '/images/computer.png',
            },
            {
                id: 2,
                title: t('Unlock Bitcoin Ecosystem with MAP Protocol'),
                content: t('The new narrative of the Bitcoin ecosystem has revoked topics and debates on Bitcoin interoperability. Explore what’s possible with MAP Protocol as a Bitcoin layer-2.'),
                link: '/article?id=map-as-bitcoin-layer2',
                src: '/images/run-a-node/run-a-node.png',
    
            },
            {
                id: 3,
                title: t('Stake MAPO'),
                content: t('Anyone can participate in MAP Protocol’s network by staking and guarantee network security. It is is public good for the whole MAP Protocol ecosystem.'),
                link: '/run-a-node',
                src: '/images/stake-mapo/stake-mapo-top.png',
    
            },
            {
                id: 4,
                title: t('Get MAPO'),
                content: t('MAPO is the native token on the MAP Relay Chain. It is the cryptocurrency you use to pay for the network fees on the MAP Relay Chain. Learn about how to get MAPO.'),
                link: '/get-map',
                src: '/images/map-coin-colors.png',
    
            },
            {
                id: 5,
                title: t('The MAP Protocol community'),
                content: t('MAP Protocol is all about community. Check out MAP Protocol community to meet your cohorts and see how you can contribute to MAP Protocol.'),
                link: '/community',
                src: '/images/community/community.png',
            },
    
            {
                id: 6,
                title: t('Learn about MAPDAO'),
                content: t('MAPDAO is a community-driven and pivotal platform for contributors to engage with the MAP Protocol ecosystem. It welcomes everyone who would like to make a change.'),
                link: '/article?id=learn-about-MAPDAO',
                src: '/images/home-page/get-start-1.png',
    
            },
            {
                id: 7,
                title: t('Understand Bitcoin layer-2'),
                content: t('Bitcoin layer-2 is key to Bitcoin ecosystem growth. As the adoption of Bitcoin continues to grow, the importance of these Layer-2 solutions cannot be overstated.'),
                link: '/article?id=understand-bitcoin',
                src: '/images/article/bitcoin.png',
    
            },
            {
                id: 8,
                title: t('Understand long-range attack'),
                content: t('Similar to the 51% attack, long-range attack is a threat to PoS blockchains. MAP Protocol uses the Bitcoin network’s security mechanism to prevent long-range attack.'),
                link: '/article?id=understanding-Long-Range-attacks',
                src: '/images/article/bitcoin-2.png',
            },
    
        ]));
        console.log(router)

    },[])
    const onMouseUp = () => {
        setIsDragging(false);
        // 如果有拖动发生，则阻止'click'事件
        if (dragged) {
            window.addEventListener(
                'click',
                (e) => {
                    e.stopPropagation();
                },
                { capture: true, once: true }
            );
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current?.offsetLeft ?? 0);
        const walk = (x - startX) * 1; // 滑动速度
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
        if (Math.abs(x - startX) > 10) { // 如果移动超过10像素，则认为是拖动
            setDragged(true);
        }
    };
    const onMouseLeave = () => {
        setIsDragging(false);
    };
    return (
        <>
            <div className={styles.explore}>
                <div className={styles.exploreTitle}>{t('Explore MAP Protocol')}</div>
                <div
                    ref={containerRef}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',

                    }}
                    className={styles.cardList}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                >
                    {cardData.map((card: { id: React.Key | null | undefined; src: string; link: string; title: string; content: string; }, index: number) => (
                        <>{card.link !== router.asPath  &&<Card key={card.id} index={index} src={card.src} link={card.link} title={card.title} content={card.content} />}</>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CardList;



