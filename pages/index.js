import { Fragment } from 'react'
import RandomCocktailBtn from '../components/ui/buttons/randomCocktailBtn'
import CocktailCard from '../components/cocktailCard/cocktailCard'

export default function Home() {
  return (
    <Fragment>
      <CocktailCard />
      <RandomCocktailBtn>
        Random Cocktail
      </RandomCocktailBtn>
    </Fragment>
  )
}
