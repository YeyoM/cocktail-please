import React from "react"

export default function LoadingNotification({ children }) {
  return (
    <div className="bg-cyan-500 text-white p-3 rounded-md m-3 mb-[-1rem] transition duration-150 ease-out w-96 hover:bg-red-500 hover:ease-in">
      {children}
    </div>
  )
}