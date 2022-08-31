import { Fragment } from "react"
import Link from "next/link"
import { useAuth } from '../context/authContext'

export default function Landing() {

  const { user } = useAuth()

  return (
    <Fragment>
      <div className="w-full h-full p-4">
        <h1 className='text-6xl text-white '>
          Welcome to Cocktail Please!
        </h1>
        <ul className="pt-8 flex flex-col">
          {
            user ? (
              <li className="pt-1 text-orange-300 text-lg w-fit hover:text-white ease-in duration-200">
                  <Link href="/random">Go to my random cocktail</Link>
              </li>
            ) : (
              <div>
                <li className="pt-1 text-orange-300 text-lg w-fit hover:text-white ease-in duration-200">
                  <Link href="/login">Log in my account</Link>
                </li>
                <li className="pt-1 text-orange-300 text-lg w-fit hover:text-white ease-in duration-200">
                  <Link href="/signup">Sign up for an account</Link>
                </li>
              </div>
            )
          }
          <li className="pt-1 text-orange-300 text-lg w-fit hover:text-white ease-in duration-200">
            <Link href="/disclaimer">Disclaimer</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}