export default function OkBtn({ children }) {
  return (
      <button className="text-xl bg-blue-600 text-white p-3 rounded-xl m-3 transition duration-150 ease-out hover:bg-blue-500 hover:ease-in">
        {children}
      </button>
  )
}