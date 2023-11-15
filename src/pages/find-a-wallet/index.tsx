
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import Top from './top'
import Body from './body'
import Footer from '@/components/footer'
// import Faqs from './faqs'
type Props = {}

export default function FindaWallet(
    _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
        <>
            <Header />
            <Top />
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
            'find-a-wallet',
            'common'
        ])),
    },
})