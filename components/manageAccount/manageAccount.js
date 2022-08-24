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

export default function ManageAccount() {

  const { user, logout } = useAuth()
  const router = useRouter()

  const [userDoc, setUserDoc] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [day, setDay] = useState('')
  const [startNext, setStartNext] = useState('')
  const [endNext, setEndNext] = useState('')

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
        }, { merge: true })
        setStartNext(dateToHumanReadableDate(nextStartDay))
        const nextEndDay = getEndNextDay(nextStartDay)
        await setDoc(doc(db, 'users', user.uid), {
          nextEndCocktailDate: nextEndDay
        }, { merge: true })
      }
      updateNextCocktail()
    }
  }, [day, user])

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
      <div className="max-h-full min-h-fit w-4/5 mt-8 bg-violet-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden mb-10">
        <form onSubmit={handleLogout}>
          <h1 className="text-white text-center text-5xl mb-6 mt-6">Hello {name}!</h1>
          {userDoc 
            ? <div className="flex flex-col items-center p-2">
                <div className="flex flex-col items-center mb-6">
                  <Avatar
                    size={200}
                    name={name}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                  <div className="text-white text-center text-xl mt-4">Your email: <p className="text-violet-900">{email}</p></div>
                  <div className="text-white text-center text-xl mt-4">Your random cocktail day: <p className="text-violet-900">{day}</p></div>
                  <div className="text-white text-center text-xl mt-4">Your random cocktail will appear on: <p className='text-violet-900'>{startNext}</p></div>
                </div>
                <DangerBtn>Logout</DangerBtn>
              </div>
            : <p className="text-white text-center text-2xl mt-4">Loading...</p>
          } 
        </form>
      </div>
    </Fragment>
  )
}