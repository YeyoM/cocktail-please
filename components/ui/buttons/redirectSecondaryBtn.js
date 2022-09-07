import Link from "next/link"

export default function RedirectSecondaryBtn({ children, href }) {
  return (
    <div className="w-4/5 flex flex-col items-center  text-white text-lg p-2 bg-violet-300 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg duration-150 hover:bg-violet-400 mb-6 relative">
      <Link href={href}>
        <a className="inline-block w-full h-full text-center">{children}</a>
      </Link>
    </div>
  )
}