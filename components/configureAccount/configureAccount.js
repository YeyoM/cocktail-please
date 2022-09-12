import { Fragment, useState, useEffect } from "react"
import SuccessBtn from "../ui/buttons/successBtn"
import DangerNotification from '../ui/notfications/dangerNotification'
import SuccessNotification from '../ui/notfications/successNotification'
import LoadingNotification from '../ui/notfications/loadingNotification'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authContext'
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import getStartNextDay from '../../helpers/getStartNextDay'
import getEndNextDay from '../../helpers/getEndNextDay'
import PrimaryCard from "../ui/cards/primaryCard"

export default function ConfigureAccount() {

  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const [day, setDay] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)   

  const handleDayChange = (e) => {
    setDay(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!day) {
      setError('Please select a day')
      setInterval(() => {
        setError('')
      }, 5000)
      return
    }

    try {
      setError('')
      setLoading(true)
      const nextStartDay = getStartNextDay(day)
      const nextEndDay = getEndNextDay(nextStartDay)
      await setDoc(doc(db, 'users', user.uid), {
        randomCocktailDay: day,
        nextStartCocktailDate: nextStartDay,
        nextEndCocktailDate: nextEndDay
      }, { merge: true })
      setLoading(false)
      setSuccess('Day saved')
      setInterval(() => {
        setSuccess('')
      }, 5000)
      router.push('/random')
    } catch (error) {
      setError(error.message)
      setInterval(() => {
        setError('')
      }, 5000)
    }
    
  }

  return (
    <Fragment>
      {error && <DangerNotification>{error}</DangerNotification>}
      {success && <SuccessNotification>{success}</SuccessNotification>}
      {loading && <LoadingNotification>Loading...</LoadingNotification>}
      <PrimaryCard>
        <form className="w-3/4" onSubmit={handleSubmit}>
          <h1 className="text-white text-3xl mt-10 mb-12">Select a day to recieve your weekly random cocktail!</h1>
          <div onChange={handleDayChange}>
            <ul className="mb-4">
              <li className="flex flex-row justify-between items-center">
                <label htmlFor="monday" className="text-white text-2xl mb-1">Monday</label>
                <input type="radio" id="monday" name="day" value="monday" className="w-6 h-6"/>
              </li>
              <li className="flex flex-row justify-between items-center">
                <label htmlFor="tuesday" className="text-white text-2xl mb-1">Tuesday</label>
                <input type="radio" id="tuesday" name="day" value="tuesday" className="w-6 h-6"/>
              </li>
              <li className="flex flex-row justify-between items-center">
                <label htmlFor="wednesday" className="text-white text-2xl mb-1">Wednesday</label>
                <input type="radio" id="wednesday" name="day" value="wednesday" className="w-6 h-6"/>
              </li>
              <li className="flex flex-row justify-between items-center">
                <label htmlFor="thursday" className="text-white text-2xl mb-1">Thursday</label>
                <input type="radio" id="thursday" name="day" value="thursday" className="w-6 h-6"/>
              </li>
              <li className="flex flex-row justify-between items-center">
                <label htmlFor="friday" className="text-white text-2xl mb-1">Friday</label>
                <input type="radio" id="friday" name="day" value="friday" className="w-6 h-6"/>
              </li>
              <li className="flex flex-row justify-between items-center">
                <label htmlFor="saturday" className="text-white text-2xl mb-1">Saturday</label>
                <input type="radio" id="saturday" name="day" value="saturday" className="w-6 h-6"/>
              </li>
              <li className="flex flex-row justify-between items-center">
                <label htmlFor="sunday" className="text-white text-2xl mb-1">Sunday</label>
                <input type="radio" id="sunday" name="day" value="sunday" className="w-6 h-6"/>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <SuccessBtn>Continue</SuccessBtn>
          </div>
          <p className="text-white mb-4 text-sm text-center">We suggest you to select a weekend day, choose wisely :)</p>
        </form>
      </PrimaryCard>
    </Fragment>
  )
}