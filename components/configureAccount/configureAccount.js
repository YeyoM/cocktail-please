import { Fragment, useState } from "react"
import SuccessBtn from "../ui/buttons/successBtn"
import DangerNotification from '../ui/notfications/dangerNotification'
import SuccessNotification from '../ui/notfications/successNotification'
import LoadingNotification from '../ui/notfications/loadingNotification'

export default function ConfigureAccount() {

  const [day, setDay] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDayChange = (e) => {
    setDay(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!day) {
      setError('Please select a day')
      setInterval(() => {
        setError('')
      }, 5000)
      return
    }

    console.log(day)
  }

  return (
    <Fragment>
      {error && <DangerNotification>{error}</DangerNotification>}
      {success && <SuccessNotification>{success}</SuccessNotification>}
      {loading && <LoadingNotification>Loading...</LoadingNotification>}
      <div className="max-h-full min-h-fit w-5/6 mt-8 bg-orange-300 p-4 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
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
      </div>
    </Fragment>
  )
}