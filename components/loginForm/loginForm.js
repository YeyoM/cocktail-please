import SuccessBtn from '../ui/buttons/successBtn'
import Link from 'next/link'
import { Fragment } from 'react'

export default function LoginForm() {
  return (
    <Fragment>
      <div className="flex self-start ml-12 text-white text-lg">
        <Link href="/">{`< Return`}</Link>
      </div>
      <div className="max-h-full min-h-fit w-5/6 mt-8 bg-orange-300 p-4 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
        <form className="w-3/4" action="">
          <h1 className="text-white text-5xl mt-10 mb-12">Login to your account</h1>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-2xl mb-1">Email</label>
            <input placeholder="Email here..." type="email" id="email" className="mb-4 w-full p-1 border border-white rounded-md" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white text-2xl mb-1">Password</label>
            <input placeholder="Password here..." type="password" id="password" className=" w-full p-1 border border-white rounded-md" />
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