export default function WarningNotification({ children }) {
  return (
    <div className="bg-yellow-500 text-white p-3 rounded-md m-3 transition duration-150 ease-out w-screen hover:bg-yellow-400 hover:ease-in">
      {children}
    </div>
  )
}