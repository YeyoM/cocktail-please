import '../styles/globals.css'
import Layout from '../components/layout/layout'
import { AuthContextProvider } from '../components/context/authContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}

export default MyApp
