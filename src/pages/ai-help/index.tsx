import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import Header from '../../components/header'
import Footer from '@/components/footer'
import { useEffect } from 'react'

type Props = {}

export default function aiHelp(
    _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
 
    return (
        <>
            <Header />
            <div>
                <iframe
                    src="https://bnb-reiki.web3go.xyz/aiweb/chatbot/4vdiUIU1cOZFXQwQ"
                    style={{ width: "100%", height: "100%", minHeight: "700px" }}
                    frameBorder="0"
                    allow="microphone">
                </iframe>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['community', 'common'])),
    },
})