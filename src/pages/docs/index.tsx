import dynamic from 'next/dynamic';

import styles from './index.module.css'
import Scrollspy from 'react-scrollspy';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import React from 'react';
import { handleButtonClick } from '@/utils/dom';
import Sidebar from '../../components/Sidebar';
import LeftSidebar from '../../components/LeftSidebar';

type Props = {}
const array: Array<string> = []
const H2: React.FC<React.HTMLProps<HTMLHeadingElement>> = (props) => {

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
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

    useEffect(() => {
        if (id && !array.includes(id)) {
            array.push(id);
        }
    }, [])
    return <h2 {...props} id={id}>{props.children}</h2>;
}

export default function SamplePage(
    _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    // const h2Refs = useRef([]);
    const [currentArticlePath, setCurrentArticlePath] = useState('develop/chains-connect');
    const [headings, setHeadings] = useState<string[]>([]);

    const SampleMDX = currentArticlePath ? dynamic(() => import(`@/docs/${currentArticlePath}.md`)) : null;


    // const addH2Ref = () => {
    //     const newRef = React.createRef();
    //     h2Refs.current.push(newRef);
    //     return newRef;
    //   };

    const components = {
        a: (props: any) => <a style={{ color: 'red' }} {...props} />,
        h2: (props: any) => <H2 {...props} />

    };
    useEffect(() => {
        setHeadings(array)
        // setHeadings(h2Refs.current.map(ref => ({
        //     id: ref.id,
        //     title: ref.innerText
        // })));
    }, [currentArticlePath])


    return (
        <>
            <Header />
            <div className={styles.docs}>
                {/* <LeftSidebar onArticleSelect={setCurrentArticlePath}/>
                <div>
                     {SampleMDX && <SampleMDX components={components}/>}
                </div>

                <div >
                    <Sidebar headings={headings} />
                </div> */}

            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
    locale,
}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', [
            'common'
        ])),
    },
})