import SuccessBtn from '../ui/buttons/successBtn'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'

export default function SignUpForm() {

  const { user, signUp } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isOver18, setIsOver18] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await signUp(email, password)
    } catch (err) {
      console.log(err)
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
      <div className="flex self-start ml-12 mt-8 text-white text-lg">
        <Link href="/">{`< Return`}</Link>
      </div>
      <div className="max-h-full min-h-fit w-5/6 mt-8 mb-8 bg-orange-300 p-4 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
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
              <a className="text-white text-md">Already have one? Login</a>
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
          <div className="flex flex-col items-center">
            <SuccessBtn>Login</SuccessBtn>
          </div>
        </form>
      </div>
    </Fragment>
  )
}