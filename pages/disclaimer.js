import Head from "next/head"
import { Fragment } from "react"
import Disclaimer from "../components/disclaimer/disclaimer"

export default function DisclaimerPage() {
  return (
    <Fragment>
    <Head>
      <title>Disclaimer</title>
      <meta name="description" content="Cocktail Please! Disclaimer"/>
    </Head>
    <Disclaimer />
  </Fragment>
  )
}