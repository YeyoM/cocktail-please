export default function DangerBtn({ children }) {
  return (
      <button className="bg-red-600 text-white p-3 rounded-md m-3 transition duration-150 ease-out hover:bg-red-500 hover:ease-in">
        {children}
      </button>
  )
}