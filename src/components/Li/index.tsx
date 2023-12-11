
import * as React from 'react';
import styles from './index.module.css'
import Image from 'next/image'

interface TextComponentProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    style?: any;
    className?: string;
}

export const Li: React.FC<TextComponentProps> = ({ className, style, children, title }) => {
    return (
        <>
            <div className={className} style={{
                display:'flex',
                alignItems:'flex-start',
                position: 'relative',
                color: '#000',
                fontSize: '15px',
                fontStyle: 'normal',

                ...style
            }}>
                <Image
                    width={5}
                    height={5}
                    style={{
                        flexShrink:0,
                        transform: 'translateY(9px)',
                        marginRight: "8px",
                        marginLeft: "8px",
                        display:'inline-block',
                    }}
                    src={`/fonts/small-dot.svg`}
                    alt="" 
                    />
             <div>{title}</div> 
            </div>
           {children && <div className={styles.children}>
                {children}
            </div>}
        </ >
    )

}