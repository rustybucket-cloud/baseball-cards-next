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

      <Header img={'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg'} team={'MLB Data'} backgroundColor={'#002D72'} textColor={'white'} />
    </div>
  )
}
