import Head from "next/head"
import { Fragment } from "react"
import ConfigureAccount from "../components/configureAccount/configureAccount"

export default function ConfigureAccountPage() {
  return (
    <Fragment>
      <Head>
        <title>Configure Account</title>
        <meta name="description" content="Cocktail Please! Configure Account"/>
      </Head>
      <ConfigureAccount />
    </Fragment>
  )
}