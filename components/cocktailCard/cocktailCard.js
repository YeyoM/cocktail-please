import Image from "next/image"
import { Fragment, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import fetchRandomCocktail from "../../helpers/fetchRandomCocktail"
import fetchCocktailById from "../../helpers/fetchCocktailById"
import getComparableDate from "../../helpers/getComparableDate"
import getStartNextDay from '../../helpers/getStartNextDay'
import getEndNextDay from '../../helpers/getEndNextDay'
import DangerNotification from '../ui/notfications/dangerNotification'
import RedirectPrimaryBtn from "../ui/buttons/redirectPrimaryBtn"

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
        setError("Error getting user document: ", err)
        console.log(err)
      })
    }
  }, [user, router])

  useEffect(() => {

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
        const lastSeenDb = new Date(userInfo.lastSeen.stringValue)
        const nextEndCocktailDateDb = new Date(userInfo.nextEndCocktailDate.timestampValue.split('T')[0])

        const todayComparable = getComparableDate(today)

        if (lastSeenDb < nextEndCocktailDateDb && nextEndCocktailDateDb < today) {
          fetchRandomCocktail()
            .then(data => {
              setCocktail(data)
              setDoc(doc(db, 'users', user.uid), {
                currentCocktail: data.idDrink,
                lastRandomCocktailDate: todayComparable
              }, { merge: true })
              setLoading(false)
            })
            .catch(err => {
              setError(err)
              setLoading(false)
            })
        }

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
      // register last seen
      let date = new Date()
      let now = getComparableDate(date)
      setDoc(doc(db, 'users', user.uid), {
        lastSeen: now
      }, { merge: true })
      const nextStartDay = getStartNextDay(userInfo.randomCocktailDay.stringValue)
      const nextEndDay = getEndNextDay(nextStartDay)
      setDoc(doc(db, 'users', user.uid), {
        nextStartCocktailDate: nextStartDay,
        nextEndCocktailDate: nextEndDay
      }, { merge: true })

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
        {
          error ? <DangerNotification>{error}</DangerNotification> : null
        }
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
      <RedirectPrimaryBtn href="/account">Manage My Account</RedirectPrimaryBtn>
    </Fragment>
  )
}