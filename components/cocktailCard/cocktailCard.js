import Image from "next/image"
import { useState, useEffect } from "react"

const exampleResponse = require('../../public/exampleCocktail.json')

export default function CocktailCard() {

  const [cocktail, setCocktail] = useState(exampleResponse.drinks[0])
  const [ingredients, setIngredients] = useState([])
  const [measures, setMeasures] = useState([])

  useEffect(() => {
    const {
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strIngredient15,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strMeasure11,
      strMeasure12,
      strMeasure13,
      strMeasure14,
      strMeasure15
    } = cocktail
    const ingredientsResponse = [
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strIngredient15,
    ]
    const measuresResponse = [
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strMeasure11,
      strMeasure12,
      strMeasure13,
      strMeasure14,
      strMeasure15
    ]
    let newIngredients = []
    let newMeasurements = []
    newIngredients = ingredientsResponse.filter(ingredient => ingredient !== null)
    newMeasurements = measuresResponse.filter(measure => measure !== null)
    setIngredients(newIngredients)
    setMeasures(newMeasurements)
  }, [cocktail])

  console.log(measures)

  return (
    <div className="max-h-full min-h-fit w-4/5 mt-8 bg-violet-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
      <div className="w-2/3 rounded-full overflow-hidden border-4 border-white mt-4">
        <Image src={cocktail.strDrinkThumb} alt="cocktail" width={100} height={100} layout="responsive" />
      </div>
      <h1 className="text-5xl mt-3 text-white">{cocktail.strDrink}</h1>
      <h2 className="text-2xl mt-5 text-white">Ingredients</h2>
      <ul className="mt-2 flex flex-col items-center">
        {
          ingredients.map((ingredient, index) => {
            return (
              <li key={index} className="text-white">
                <p className="text-sm">{ingredient} - {measures[index]}</p> 
              </li>
            )
          })
        }
      </ul>
      <h2 className="text-2xl mt-5 text-white">Instructions</h2>
      <div className="mt-2 w-[220px]">
        <p className="text-white text-center text-sm">For {cocktail.strGlass}. {cocktail.strInstructions}</p>
      </div>
      <h3 className="text-xl mt-5 text-white">Additional Information</h3>
      <div className="mt-2 w-[220px]">
        <p className="text-white text-center text-sm">{cocktail.strAlcoholic}</p>
        <p className="text-white text-center text-sm">{cocktail.strTags}</p>
      </div>
    </div>
  )
}