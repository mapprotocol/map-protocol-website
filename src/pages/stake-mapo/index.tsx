
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import Top from './top'
import Body from './body'
import Faqs from './faqs'
import Footer from '@/components/footer'
type Props = {}

export default function GetMap(
    _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
        <>
            <Header />
            <Top />
            <Body />
            <Faqs />
            <Footer />

        </>
    )
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
    locale,
}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', [
            'stake-mapo',
            'common'
        ])),
    },
})