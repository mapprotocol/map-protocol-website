
import * as React from 'react';
import styles from './index.module.css'
import Image from 'next/image'

interface TextComponentProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    style?: any;
    className?: string;
}

export const HandTip: React.FC<TextComponentProps> = ({ className, style, children, title }) => {
    return (
        <>
            <div className={className} style={{

                color: '#000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',

                fontWeight: '500',
                borderRadius: '12px',
                background: '#F7F7F7',
                minHeight: '80px',
                boxSizing:'border-box',
                paddingTop:'16px',
                paddingBottom:'16px',
                paddingLeft:'24px',
                paddingRight:'24px',
                gap:'12px',
                ...style
            }}>
                <Image
                    width={40}
                    height={40}
                  
                    src="/images/map-coin-hand.png"
                    alt="map-coin-hand" />
                {children}

            </div>
        </ >
    )

}