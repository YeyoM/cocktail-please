import Image from "next/image"
import { Fragment, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import RandomCocktailBtn from '../ui/buttons/randomCocktailBtn'
import fetchRandomCocktail from "../../helpers/fetchRandomCocktail"
import fetchCocktailById from "../../helpers/fetchCocktailById"
import getComparableDate from "../../helpers/getComparableDate"

export default function CocktailCard() {

  const [userInfo, setUserInfo] = useState(null)
  const [cocktail, setCocktail] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [measures, setMeasures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      let day = ''
      const userDoc = getDoc(doc(db, 'users', user.uid))
      userDoc.then((doc) => {
        setUserInfo(doc._document.data.value.mapValue.fields)
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

    if (userInfo) {
      // en caso de que sea la primera vez que entra
      if (!userInfo.currentCocktail.stringValue) {
        fetchRandomCocktail()
          .then(data => {
            setCocktail(data)
	          let date = new Date()
            let now = getComparableDate(date)
            setDoc(doc(db, 'users', user.uid), {
              currentCocktail: data.idDrink,
              lastRandomCocktailDate: now
            }, { merge: true })
            setLoading(false)
          })
          .catch(err => {
            setError(err)
            setLoading(false)
          })
      } else if (userInfo.currentCocktail.stringValue) {
        const today = new Date()
        const todayComparable = getComparableDate(today)
        const dbDate = userInfo.nextStartCocktailDate.timestampValue.split('T')[0]
        
        if (todayComparable === dbDate) {
          // check if the last time the user got a random cocktail was today
          // if it was, then fetch the cocktail by id
          // if it wasn't, then fetch a random cocktail
          const lastRandomCocktailDate = userInfo.lastRandomCocktailDate.stringValue
          if (lastRandomCocktailDate === todayComparable) {
            fetchCocktailById(userInfo.currentCocktail.stringValue)
              .then(data => {
                setCocktail(data)
                setLoading(false)
              })
              .catch(err => {
                setError(err)
                setLoading(false)
              })
          } else {
          fetchRandomCocktail()
            .then(data => {
              setCocktail(data)
              let date = new Date()
              let now = getComparableDate(date)
              setDoc(doc(db, 'users', user.uid), {
                currentCocktail: data.idDrink,
                lastRandomCocktailDate: now
              }, { merge: true })
              setLoading(false)
            })
            .catch(err => {
              setError(err)
              setLoading(false)
            })
          }
        } else {
          fetchCocktailById(userInfo.currentCocktail.stringValue)
            .then(data => {
              setCocktail(data)
              setLoading(false)
            })
            .catch(err => {
              setError(err)
              setLoading(false)
            })
        }
      }
    }
  }, [userInfo, user])

  useEffect(() => {
    if (cocktail) {
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
    }
  }, [cocktail])

  return (
    <Fragment>
      <Fragment>
        <div className="max-h-full min-h-fit w-4/5 mb-6 bg-violet-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
          {
            cocktail ?
            <div className="flex flex-col items-center">
                <div className="w-2/3 rounded-full overflow-hidden border-4 border-white mt-4">
                  <Image src={cocktail.strDrinkThumb} alt="cocktail" width={100} height={100} layout="responsive" />
                </div>
                <h1 className="text-5xl mt-3 text-violet-900">{cocktail.strDrink}</h1>
                <h2 className="text-3xl mt-5 text-white">Ingredients</h2>
                <ul className="mt-2 flex flex-col items-center">
                  {
                    ingredients.map((ingredient, index) => {
                      return (
                        <li key={index} className="text-white">
                          <p className="text-md">{ingredient} - {measures[index]}</p> 
                        </li>
                      )
                    })
                  }
                </ul>
                <h2 className="text-3xl mt-5 text-white">Instructions</h2>
                <div className="mt-2 w-[220px]">
                  <p className="text-white text-center text-md">For {cocktail.strGlass}. {cocktail.strInstructions}</p>
                </div>
                <h3 className="text-2xl mt-5 text-white">Additional Information</h3>
                <div className="mt-2 w-[220px]">
                  <p className="text-white text-center text-md">{cocktail.strAlcoholic}</p>
                  <p className="text-white text-center text-md">{cocktail.strTags}</p>
                </div>
              </div>
            : <div className="flex flex-col items-center min-h-[30rem] justify-center">
                <div className="loader">Loading...</div>
              </div>
          }
        </div>
      </Fragment>
      <div className="w-4/5 flex flex-col items-center  text-white text-lg p-2 bg-orange-300 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg duration-150 hover:bg-orange-400 mb-6 relative">
        <Link href="/account">
          <a className="inline-block w-full h-full text-center">{`Manage my Account`}</a>
        </Link>
      </div>
    </Fragment>
  )
}