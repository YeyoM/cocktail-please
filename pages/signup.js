import Head from 'next/head'
import { Fragment } from 'react'
import SignUpForm from '../components/signupForm/SignupForm'

export default function Signup() {
  return (
    <Fragment>
        <Head>
          <title>Sign Up</title>
          <meta name="description" content="Cocktail Please! Sign Up Form"/>
        </Head>
      <SignUpForm />
    </Fragment>
  )
}
