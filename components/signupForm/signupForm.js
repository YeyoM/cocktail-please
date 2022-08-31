import SuccessBtn from '../ui/buttons/successBtn'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../config/firebase'
import DangerNotification from '../ui/notfications/dangerNotification'
import SuccessNotification from '../ui/notfications/successNotification'
import LoadingNotification from '../ui/notfications/loadingNotification'

export default function SignupForm() {

  const { user, signUp } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isOver18, setIsOver18] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      router.push('/random')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setInterval(() => {
        setError('')
      }, 5000)
      return setError('Please fill in all fields')
    }

    if (password.length < 6) {
      setInterval(() => {
        setError('')
      }, 5000)
      return setError('Password must be at least 6 characters')
    }
    
    if (!agreeTerms) {
      setInterval(() => {
        setError('')
      }, 5000)
      return setError('You must agree to the terms and conditions')
    }

    if (!isOver18) {
      setInterval(() => {
        setError('')
      }, 5000)
      return setError('You must be over 18 to sign up')
    }

    try {
      setError('')
      setLoading(true)
      const user = await signUp(email, password)
      await setDoc(doc(db, "users", user.user.uid), {
        name: name,
        email: email,
        password: password,
        randomCocktailDay: '',
        currentCocktail: '',
        isAdmin: false,
        isBanned: false,
      })
      setLoading(false)
      setSuccess('Account created successfully')
      setInterval(() => {
        setSuccess('')
      }, 3000)
      // Redirigir a la pagina donde se muestra el perfil del usuario
      // y ademas va a configurar su cuenta
      router.push('/configure')
    } catch (err) {
      console.log(err)
      setInterval(() => {
        setError('')
      }, 5000)
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleAgreeTermsChange = (e) => {
    setAgreeTerms(e.target.checked)
  }

  const handleIsOver18Change = (e) => {
    setIsOver18(e.target.checked)
  }

  return (
    <Fragment>
      {error && <DangerNotification>{error}</DangerNotification>}
      {success && <SuccessNotification>{success}</SuccessNotification>}
      {loading && <LoadingNotification>Loading...</LoadingNotification>}
      <div className="max-h-full min-h-fit w-4/5 mt-8 mb-2 bg-orange-300 p-4 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
        <form className="w-3/4" onSubmit={handleSubmit}>
          <h1 className="text-white text-5xl mt-10 mb-12">Create a new Account</h1>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white text-2xl mb-1">Name</label>
            <input placeholder="Name here..." type="text" id="name" onChange={handleNameChange} value={name} className="mb-4 w-full p-1 border border-white rounded-md focus:outline-white"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-2xl mb-1">Email</label>
            <input placeholder="Email here..." type="email" id="email" onChange={handleEmailChange} value={email} className="mb-4 w-full p-1 border border-white rounded-md focus:outline-white"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white text-2xl mb-1">Password</label>
            <input placeholder="Password here..." type="password" id="password" onChange={handlePasswordChange} value={password} className=" w-full p-1 border border-white rounded-md focus:outline-white"/>
          </div>
          <div className="flex flex-col mb-4">
            <Link href="/login">
              <a className="text-white text-md transition duration-120 hover:text-violet-500">Already have one? Login</a>
            </Link>
          </div>
          <div className="flex flex-row">
            <label htmlFor="checkbox" className="text-white text-md mb-1">
              <input type="checkbox" id="checkboxAgree" onChange={handleAgreeTermsChange} value={agreeTerms} className="p-2 border border-white mr-2 focus:outline-white"/>
              By checking this, you agree to our <p className="text-purple-600"><Link href="/disclaimer">Terms and Conditions</Link></p>
            </label>
          </div>
          <div className="flex flex-row">
            <label htmlFor="checkbox" className="text-white text-md mb-1">
              <input type="checkbox" id="checkboxOverAge" onChange={handleIsOver18Change} value={isOver18} className="p-2 border border-white mr-2 focus:outline-white"/>
              By checking this, you confirm that you are over 18 years old
            </label>
          </div>
          <div className="flex flex-col items-center mb-4">
            <SuccessBtn>Sign Up</SuccessBtn>
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