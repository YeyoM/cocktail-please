import { Fragment } from "react"
import Link from "next/link"

export default function Landing() {
  return (
    <Fragment>
      <div className="w-full h-full p-4">
        <h1 className='text-6xl text-white '>
          Welcome to Cocktail Please!
        </h1>
        <ul className="pt-8 flex flex-col">
          <li className="pt-1 text-orange-300 text-lg">
            <Link href="/login"><a>Log in my account</a></Link>
          </li>
          <li className="pt-1 text-orange-300 text-lg">
            <Link href="/signup"><a>Sign up for an account</a></Link>
          </li>
          <li className="pt-1 text-orange-300 text-lg">
            <Link href="/about"><a>About</a></Link>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}