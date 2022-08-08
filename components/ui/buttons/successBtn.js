export default function SuccessBtn({ children }) {
  return (
      <button className="bg-green-600 text-white p-3 rounded-md m-3 transition duration-150 ease-out hover:bg-green-500 hover:ease-in">
        {children}
      </button>
  )
}