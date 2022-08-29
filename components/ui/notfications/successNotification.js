export default function SuccessNotification({ children }) {
  return (
    <div className="bg-green-600 text-white p-3 rounded-md mb-4 transition duration-150 ease-out w-4/5 hover:bg-green-500 hover:ease-in">
      {children}
    </div>
  )
}