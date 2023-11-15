// components/CustomHead.tsx
import Head from 'next/head';
import React, { ReactNode } from 'react';

interface CustomHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  children?: ReactNode; // 允许插入更多的自定义 head 内容
}

export default function CustomHead({ title, description, keywords, children }: CustomHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={"MAP Protocol is a Bitcoin layer-2 and peer-to-peer omnichain infrastructure built upon light clients and ZK technology, focusing on cross-chain interoperability."} />
      {keywords && <meta name="keywords" content={keywords} />}
      {children}
      <link rel="icon" href="/images/logo-h5.png" />
      <meta property="og:image" content="/images/image_src.jpg" />
      <link rel="image_src" href="/images/image_src.jpg" />
    </Head>
  );
}
