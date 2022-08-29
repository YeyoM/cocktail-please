import Head from "next/head"
import { Fragment } from 'react'
import CocktailCard from '../components/cocktailCard/cocktailCard'

export default function Random() {
  return (
    <Fragment>
          <Head>
          <title>Random Cocktail</title>
          <meta name="description" content="Cocktail Please! Random Cocktail"/>
        </Head>
      <CocktailCard />
    </Fragment>
  )
}