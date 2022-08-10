import { Fragment } from 'react'
import RandomCocktailBtn from '../components/ui/buttons/randomCocktailBtn'
import CocktailCard from '../components/cocktailCard/cocktailCard'

export default function Random() {
  return (
    <Fragment>
      <CocktailCard />
      <RandomCocktailBtn>
        Random Cocktail
      </RandomCocktailBtn>
    </Fragment>
  )
}