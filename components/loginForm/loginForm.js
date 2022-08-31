import SuccessBtn from '../ui/buttons/successBtn'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authContext'
import DangerNotification from '../ui/notfications/dangerNotification'
import SuccessNotification from '../ui/notfications/successNotification'
import LoadingNotification from '../ui/notfications/loadingNotification'

export default function LoginForm() {

  const { user, login } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user) {
      router.push('/random')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in all fields')
      setInterval(() => {
        setError('')
      }, 5000)
      return
    }

    try {
      setError('')
      setLoading(true)
      await login(email, password)
      setLoading(false)
      setInterval(() => {
        setSuccess('')
      }, 3000)
      router.push('/random')
    } catch (err) {
      console.log(err)
      setInterval(() => {
        setError('')
      }, 5000)
      setError('Failed to log in')
    }
    setLoading(false)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Fragment>
      {error && <DangerNotification>{error}</DangerNotification>}
      {success && <SuccessNotification>{success}</SuccessNotification>}
      {loading && <LoadingNotification>Loading...</LoadingNotification>}
      <div className="max-h-full min-h-fit w-4/5 mb-4 bg-orange-300 p-4 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
        <form className="w-3/4" onSubmit={handleSubmit}>
          <h1 className="text-white text-5xl mt-10 mb-12">Login to your account</h1>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-2xl mb-1">Email</label>
            <input placeholder="Email here..." type="email" id="email" onChange={handleEmailChange} value={email} className="mb-4 w-full p-1 border border-white rounded-md focus:outline-white"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white text-2xl mb-1">Password</label>
            <input placeholder="Password here..." type="password" id="password" onChange={handlePasswordChange} value={password} className=" w-full p-1 border border-white rounded-md focus:outline-white"/>
          </div>
          <div className="flex flex-col mb-4">
            <Link href="/signup">
              <a className="text-white text-md transition duration-120 hover:text-violet-400">Create a new account here</a>
            </Link>
          </div>
          <div className="flex flex-col items-center ">
            <SuccessBtn>Login</SuccessBtn>
          </div>
        </form>
      </div>
      <div className="w-4/5 flex flex-col items-center  text-white text-lg p-2 bg-violet-300 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg duration-150 hover:bg-violet-400 mb-6 relative">
        <Link href="/">
          <a className="inline-block w-full h-full text-center">{`Return to home`}</a>
        </Link>
      </div>
    </Fragment>
  )
}