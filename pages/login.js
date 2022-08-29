import Head from 'next/head'
import { Fragment } from 'react'
import LoginForm from '../components/loginForm/loginForm'

export default function Login() {
  return (
    <Fragment>
        <Head>
          <title>Login</title>
          <meta name="description" content="Cocktail Please! Login Form"/>
        </Head>
      <LoginForm />
    </Fragment>
  )
}
