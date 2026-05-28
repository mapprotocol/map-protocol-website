import 'core-js/modules/es.array.map'
import Layout from './layout'
import { appWithTranslation } from 'next-i18next';
import BackToTopButton from "@/components/BackToTopButton"
import '@rainbow-me/rainbowkit/styles.css';
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
