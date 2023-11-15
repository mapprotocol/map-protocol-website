import GetMapTop from './top'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import Body from './body'
import Footer from '@/components/footer'

type Props = {}

export default function WhatIsMAPO(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <Header />
      <GetMapTop />
      <Body />
      <Footer />
      
    </>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'what-is-mapo',
      'common'
    ])),
  },
})