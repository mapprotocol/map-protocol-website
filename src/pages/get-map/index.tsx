import GetMapTop from './top'
import GetMapFaqs from './faqs'
import GetMapDEXs from './DEXs'
import GetMapCEXs from './CEXs'
import UseMapCoin from './use'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import Footer from '@/components/footer'
type Props = {}

export default function GetMap(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <Header />
      <GetMapTop />
      <GetMapDEXs />
      <GetMapCEXs />
      <UseMapCoin />
      <GetMapFaqs />
      <Footer />

    </>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'get-map-1',
      'get-map-2',

      'common'
    ])),
  },
})