import Head from 'next/head'
import { Fragment } from 'react'
import Landing from '../components/landing/landing'

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Welcome to Cocktail Please!"/>
      </Head>
      <Landing />
    </Fragment>
  )
}
