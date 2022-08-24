import Image from "next/image"
import { Fragment, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import RandomCocktailBtn from '../ui/buttons/randomCocktailBtn'

const exampleResponse = require('../../public/exampleCocktail.json')

export default function CocktailCard() {

  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      let day = ''
      const userDoc = getDoc(doc(db, 'users', user.uid))
      userDoc.then((doc) => {
        day = doc._document.data.value.mapValue.fields.randomCocktailDay.stringValue
        if (!day) {
          router.push('/configure')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }, [user, router])

  useEffect(() => {
    // tomar los datos de la base de datos para saber que dia toca el siguiente cocktail
    // si el dia de hoy es el mismo que el dia que toca el siguiente cocktail, entonces
    // hacer la llamada a la api y mostrar el resultado y guardar el id del cocktail en la base de datos
    // si el dia de hoy no es el mismo que el dia que toca el siguiente cocktail, entonces
    // mostrar el cocktail que esta guardado en la base de datos
    if (true) {
      const getDrink = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        const data = await response.json()
        console.log(data.drinks[0])
      }
      getDrink()
    }
  }, [])

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

  return (
    <Fragment>
      <div className="flex self-end mr-12 mt-8 text-white text-lg p-2 bg-violet-300 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg duration-150 hover:bg-violet-400">
        <Link href="/account">{`Manage my Account`}</Link>
      </div>
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
      <RandomCocktailBtn>
        Random Cocktail
      </RandomCocktailBtn>
    </Fragment>
  )
}