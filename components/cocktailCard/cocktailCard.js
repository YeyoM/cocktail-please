import Image from "next/image"

export default function cocktailCard() {
  return (
    <div className="h-full w-4/5 mt-8 bg-violet-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center">
      <div className="w-2/3 ">
        <Image src="/cocktail.jpg" alt="cocktail" width={100} height={100} layout="responsive" />
      </div>
    </div>
  )
}