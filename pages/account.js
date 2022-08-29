import Head from "next/head"
import { Fragment } from "react"
import ManageAccount from "../components/manageAccount/manageAccount"

export default function AccountPage() {
  return (
    <Fragment>
      <Head>
        <title>Account</title>
        <meta name="description" content="Cocktail Please! Account"/>
      </Head>
      <ManageAccount />
    </Fragment>
  )
}