import Layout from './layout'
import { appWithTranslation } from 'next-i18next';
import BackToTopButton from "@/components/BackToTopButton"
import './prism.css';
import './styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>

      <Component {...pageProps} />
      {/* <BackToTopButton /> */}

    </Layout>
  )
}
export default appWithTranslation(MyApp);
