import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class myDocument extends Document {
  render () {
    return <Html lang='en' className='scrollbar-hide'>
      <Head>
        <link rel="icon" href="/cocktail.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#5a1d85" />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  }
}

export default myDocument