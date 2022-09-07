import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import DangerBtn from '../ui/buttons/dangerBtn'
import getStartNextDay from '../../helpers/getStartNextDay'
import getEndNextDay from '../../helpers/getEndNextDay'
import dateToHumanReadableDate from '../../helpers/dateToHumanReadableDate'
import Avatar from "boring-avatars"
import RedirectPrimaryBtn from '../ui/buttons/redirectPrimaryBtn'
import RedirectSecondaryBtn from '../ui/buttons/redirectSecondaryBtn'
import DangerNotification from '../ui/notfications/dangerNotification'
import SecondaryCard from '../ui/cards/secondaryCard'

export default function ManageAccount() {

  const { user, logout } = useAuth()
  const router = useRouter()

  const [userDoc, setUserDoc] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [day, setDay] = useState('')
  const [startNext, setStartNext] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      const getUserDoc = async () => {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
          .catch(err => {
            setError("Error getting user document: ", err)
            console.log(err)
          })
        if (docSnap.exists()) {
          setUserDoc(docSnap.data())
        } else {
          console.log('No such document!')
          router.push('/login')
        }
      }
      getUserDoc()
    }
  }, [user, router])

  useEffect(() => {
    if(userDoc) {
      setName(userDoc.name)
      setEmail(userDoc.email)
      setDay(userDoc.randomCocktailDay)
    }
  }, [userDoc])

  useEffect(() => {
    if (day) {
      const updateNextCocktail = async () => {
        const nextStartDay = getStartNextDay(day)
        await setDoc(doc(db, 'users', user.uid), {
          nextStartCocktailDate: nextStartDay
        }, { merge: true }).catch(err => {
          setError("Error updating user document: ", err)
          console.log(err)
        })
        setStartNext(dateToHumanReadableDate(nextStartDay))
        const nextEndDay = getEndNextDay(nextStartDay)
        await setDoc(doc(db, 'users', user.uid), {
          nextEndCocktailDate: nextEndDay
        }, { merge: true }).catch(err => {
          setError("Error updating user document: ", err)
          console.log(err)
        })
      }
      updateNextCocktail()
    }
  }, [day, user])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      setError("Error logging out: ", err)
      console.log(err)
    }
  }

  return (
    <Fragment>
      {error && <DangerNotification>{error}</DangerNotification>}
      <SecondaryCard>
        <form onSubmit={handleLogout}>
          {userDoc 
            ? <div className="flex flex-col items-center p-2">
                <h1 className="text-white text-center text-5xl mb-4 mt-4">Hello {name}!</h1>
                <div className="flex flex-col items-center mb-2">
                  <Avatar
                    size={200}
                    name={name}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                  <div className="text-white text-center text-xl mt-5">Your email: <p className="text-violet-900 break-all">{email}</p></div>
                  <div className="text-white text-center text-xl mt-1">Your random cocktail day: <p className="text-violet-900">{day}</p></div>
                  <div className="text-white text-center text-xl mt-1">Your random cocktail will appear on: <p className='text-violet-900'>{startNext}</p></div>
                </div>
                <DangerBtn>Logout</DangerBtn>
              </div>
            : <div className="flex flex-col items-center min-h-[30rem] justify-center">
                <div className="loader">Loading...</div>
              </div>
          } 
        </form>
      </SecondaryCard>
      <RedirectPrimaryBtn href="/random">Return to cocktail</RedirectPrimaryBtn>
      <RedirectSecondaryBtn href="/disclaimer">Disclaimer</RedirectSecondaryBtn>
    </Fragment>
  )
}