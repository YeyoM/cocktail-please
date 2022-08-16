import SuccessBtn from '../ui/buttons/successBtn'
import Link from 'next/link'
import { Fragment } from 'react'

export default function SignupForm() {
  return (
    <Fragment>
      <div className="flex self-start pl-12">
        <button>
          return
        </button>
      </div>
      <div className="max-h-full min-h-fit w-4/5 mt-8 bg-orange-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
        <form className="w-2/3" action="">
          <h1 className="text-white text-4xl mt-4 mb-12">Create a new account</h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-white text-lg">Name</label>
            <input placeholder="name here..." type="text" id="username" className="mb-4 w-full p-1 border border-white rounded-md" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-lg">Email</label>
            <input placeholder="email here..." type="email" id="email" className="mb-4 w-full p-1 border border-white rounded-md" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white text-lg">Password</label>
            <input placeholder="password here..." type="password" id="password" className="mb-1 w-full p-1 border border-white rounded-md" />
          </div>
          <div className="flex flex-col mb-4">
            <Link href="/login">
              <a className="text-white text-md">Already have an account. Login here</a>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <SuccessBtn>Sign Up</SuccessBtn>
          </div>
        </form>
      </div>
    </Fragment>
  )
}