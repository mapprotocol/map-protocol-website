import dynamic from 'next/dynamic';
import remarkPrism from 'remark-prism'

import styles from './index.module.css'
import matter from 'gray-matter';
import Image from 'next/image'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import fs from 'fs';
import React from 'react';
import { useRouter } from 'next/router';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Sidebar from '@/components/Sidebar';
import CardList from '@/components/ExploreCard';
import Footer from '@/components/footer';
import { Li } from '@/components/Li';
import CustomHead from '@/components/CustimHead';

type Props = {}

export default function SamplePage(
    _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const [headings, setHeadings] = useState<string[]>([]);
    const array: Array<string> = []
    const [hasHead, setHasHead] = useState()
    const H1: React.FC<React.HTMLProps<HTMLHeadingElement>> = (props) => {

        const extractText = (children: ReactNode): string => {
            return React.Children.toArray(children)
                .map(child => {
                    if (typeof child === 'string') {
                        return child;
                    }
                    if (React.isValidElement(child) && child.props.children) {
                        return extractText(child.props.children);
                    }
                    return '';
                })
                .join('');
        };

        const contentText = extractText(props.children);

        const id = contentText

        console.log(id)

        useEffect(() => {
            if (id && !array.includes(id)) {
                array.push(id);
            }
        }, [])
        return <h1 {...props} id={id}>{props.children}</h1>;
    }

    const router = useRouter();
    // const SampleMDX = dynamic(() => import(`@/article/${router.locale}/${router.query.id}.md`));


    useEffect(() => {
        setHeadings(array)


    }, [_props.metadata.title])


    const components = {
        p: (props: any) => <p className={styles.docsP} {...props} />,
        a: (props: any) => <a style={{ color: '#1976d2' }} {...props} />,
        h1: (props: any) => <H1 className={styles.docsH1} {...props} />,
        h2: (props: any) => <h2 className={styles.docsH2} {...props} />,
        li: (props: any) => <li className={styles.li} {...props} />,
        img: (props: any) => <img className={styles.img}  {...props} />


    };



    return (
        <html  dir="ltr">
            <CustomHead
                title={_props.metadata.title + ' - ' + 'Map Protocol'} 
            />
            <Header />
            {_props.hasHead ? <div className={styles.top}>
                <div className={styles.topLeft}>
                    <div className={styles.topTitle}>{_props.metadata.title}</div>
                    {_props.metadata.description && <div className={styles.topDesc}>{_props.metadata.description}</div>}
                </div>

                <div className={styles.topImage}>
                    <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={_props.hasHead.src}
                        alt="map-coin-colors" />
                </div>
            </div> :
                <div className={styles.docsTitle}>
                    {_props.metadata.title}
                </div>}

            <div className={styles.docs}>

                <div className={styles.docsContent}>
                    {<MDXRemote {..._props.mdxSource} components={components} />}
                    <div className={styles.bottom}> </div>
                </div>

                <div className={styles.sidebar}>
                    {headings.length > 0 && <Sidebar mdLocale={_props.mdLocale} headings={headings} />}
                </div>

            </div>
            <CardList />
            <Footer />
        </html>
    )
}
interface HaedArray {
    [key: string]: any;
}


const hasHaedArray: HaedArray = {
    'gas-fee': {
        src: "/images/home-page/home-page-content-2.png"
    },
    'understand-bitcoin': {
        src: "/images/article/bitcoin.png"
    },
    'understand-brc20': {
        src: "/images/article/bitcoin-1.png"
    },
    'unlocking-bitcoin-ecosystem': {
        src: "/images/article/unlocking.png"
    },
    'map-as-bitcoin-layer2': {
        src: "/images/article/maplayer2.png"
    },
    'understanding-Long-Range-attacks': {
        src: "/images/article/bitcoin-2.png"
    },
    'from-BRC-20-to-EVMs': {
        src: "/images/article/brc20.png"
    },
    'learn-about-MAPDAO': {
        src: "/images/community/community-1.png"
    }

}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale, query } = context;
    const { id } = query; // 确保路由参数包含 id
    let hasHead = false
    let mdLocale = locale
    let filePath = path.join(process.cwd(), `/src/article/${locale}/${id}.md`);
    if (!fs.existsSync(filePath)) {
        filePath = path.join(process.cwd(), `/src/article/en/${id}.md`);
        mdLocale = 'en'
      }

   
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // // 使用 gray-matter 解析 Markdown 文件
    const { content, data: metadata } = matter(fileContent);
    if (hasHaedArray[id as string]) {
        hasHead = hasHaedArray[id as string]
    }
    // // 使用 next-mdx-remote 序列化 MDX 内容
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkPrism],
        },
    });
    return {
        props: {
            mdLocale,
            hasHead,
            metadata,
            mdxSource,
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};