export default function RandomCocktailBtn({ children }) {
  return (
      <button className="text-xl h-14 bg-orange-600 text-white p-3 rounded-xl m-3 w-4/5 transition duration-150 ease-out hover:bg-orange-500 hover:ease-in">
        {children}
      </button>
  )
}