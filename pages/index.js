import Header from '../components/Header'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Baseball Cards App</title>
        <meta name="description" content="Baseball cards app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header img={'https://images.ctfassets.net/iiozhi00a8lc/t144_header_primaryATL_LOGO_092019_svg/0a0c5d63140ac6861ed8ccf9d47aa4ee/t144_header_primary.svg'} team={'Atlanta Braves'} backgroundColor={'rgb(186, 12, 47)'} letter={'#13274F'} />
    </div>
  )
}
