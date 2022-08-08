export default function SuccessNotification({ children }) {
  return (
    <div className="bg-green-600 text-white p-3 rounded-md m-3 transition duration-150 ease-out w-screen hover:bg-green-500 hover:ease-in">
      {children}
    </div>
  )
}