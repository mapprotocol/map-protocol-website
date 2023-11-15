
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import Header from '../components/header'
import HomePage from './home-page'
import { Footer } from '@/components/footer'
import { randomRotateArray } from '@/utils/number'
type Props = {
  imageArray: number[]
}

export default function GetMap(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <Header />
      <HomePage imageArray={_props.imageArray}></HomePage>
      <Footer />
    </>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => 
  {
    const imageArray = randomRotateArray([1, 2, 3, 4, 5, 6, 7, 8])
    return{
      props: {
        imageArray,
        ...(await serverSideTranslations(locale ?? 'en', [
          'home-page',
          'common'
        ])),
      },
    }
  }