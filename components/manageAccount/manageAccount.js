import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import DangerBtn from '../ui/buttons/dangerBtn'
import getNextDay from '../../helpers/getNextDay'

export default function ManageAccount() {

  const { user, logout } = useAuth()
  const router = useRouter()

  const [userDoc, setUserDoc] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [day, setDay] = useState('')
  const [nextDay, setNextDay] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      const getUserDoc = async () => {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserDoc(docSnap.data())
        } else {
          console.log('No such document!')
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
        const nextDay = getNextDay(day)
        setNextDay(nextDay)
        await setDoc(doc(db, 'users', user.uid), {
          nextCocktailDate: nextDay
        }, { merge: true })
      }
      updateNextCocktail()
      // const nextDay = day.getDate();
      // const nextMonth = day.getMonth() + 1;
      // const nextYear = day.getFullYear();
      // const nextCocktailDate = `${nextDay}/${nextMonth}/${nextYear}`
      // setNextDay(nextDay.toString())
    }
  }, [day, user, nextDay])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Fragment>
      <div className="flex self-start ml-12 mt-2 text-white text-lg p-2 bg-violet-300 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg duration-150 hover:bg-violet-400">
        <Link href="/random">{`< Return`}</Link>
      </div>
      <div className="max-h-full min-h-fit w-4/5 mt-8 bg-violet-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
        <form onSubmit={handleLogout}>
          <h1 className="text-white text-5xl mb-10 mt-4">Hello {name}!</h1>
          <div className="w-full flex flex-col items-center">
            <div className="text-white text-center text-md mb-2">Your email is <p className="text-violet-900">{email}</p></div>
            <div className="text-white text-center text-md mb-2">The day set to recieve your random cocktail is: <p className="text-violet-900">{day}</p></div>
            <div className="text-white text-center text-md mb-12">Your random cocktail will appear on: <p className="text-violet-900">{nextDay}</p></div>
            <DangerBtn >Logout</DangerBtn>
          </div>
        </form>
      </div>
    </Fragment>
  )
}