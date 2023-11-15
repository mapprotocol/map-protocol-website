import * as React from 'react';
import styles from './index.module.css'
import Image from 'next/image'

interface TextComponentProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    style?: any;
    className?: string;
    translateY?:string;
}

export const Ul: React.FC<TextComponentProps> = ({translateY, className, style, children, title }) => {
    return (
        <>
            <div className={className} style={{
                  display:'flex',
                alignItems:'flex-start',
                color: '#000',
                fontSize: '16px',
                fontWeight: '500',
               
                ...style
            }}>
                <Image
                    width={10}
                    height={10}
                    style={{ 
                        flexShrink:0,
                        transform: translateY || 'translateY(6px)',
                        marginRight: "8px",
                        marginLeft: "4px",
                        display:'inline-block'
                     }}
                    className={styles.cardIcon}
                    src={`/fonts/diamond.png`}
                    alt="" />
                  <div>{title}</div>
            </div>
            {children && <div className={styles.children}>
                {children}
            </div>}
        </ >
    )

}