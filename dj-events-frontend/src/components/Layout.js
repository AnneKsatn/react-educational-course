import Head from 'next/head'
import Header from './Header'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Showcase from './Showcase'
import { useRouter } from 'next/router'

export default function Layout({ title, keywords, desctiption, children }) {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='desctiption' content={desctiption} />
                <meta name='keywords' content={keywords} />
            </Head>

            <Header />

            {router.pathname == "/" && <Showcase />}
  
            <div className={styles.container}>
                {children}
            </div>

            <Footer></Footer>
        </div>
    )
}

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest patries',
    desctiption: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, edm, events'
}