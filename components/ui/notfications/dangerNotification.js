export default function DangerNotification({ children }) {
  return (
    <div className="bg-red-600 text-white p-3 rounded-md m-3 transition duration-150 ease-out w-screen hover:bg-red-500 hover:ease-in">
      {children}
    </div>
  )
}