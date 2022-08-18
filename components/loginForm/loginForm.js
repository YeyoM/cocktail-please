import SuccessBtn from '../ui/buttons/successBtn'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useAuth } from '../context/authContext'

export default function LoginForm() {

  const { user, login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // checar que el email y el password no estén vacíos

    try {
      setError('')
      setLoading(true)
      await login(email, password)
      // mostrar un mensaje de que se ha iniciado sesion
      // redirigir a la página de inicio
    } catch (err) {
      console.log(err)
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
      <div className="flex self-start ml-12 text-white text-lg">
        <Link href="/">{`< Return`}</Link>
      </div>
      <div className="max-h-full min-h-fit w-5/6 mt-8 bg-orange-300 p-4 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
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
              <a className="text-white text-md">Create a new account here</a>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <SuccessBtn>Login</SuccessBtn>
          </div>
        </form>
      </div>
    </Fragment>
  )
}