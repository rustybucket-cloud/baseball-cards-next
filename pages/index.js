import Header from '../components/Header'

import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

import teamData from "../teamData.json"

export default function Home() {
  // routes to a random team
  useEffect( () => {
    const teamNumber = Math.floor(Math.random() * 30)
    const teamId = teamData[teamNumber].id
    Router.push(`./teams/${teamId}`)
  })
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
