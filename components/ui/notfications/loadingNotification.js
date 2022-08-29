import React from "react"

export default function LoadingNotification({ children }) {
  return (
    <div className="bg-cyan-500 text-white p-3 rounded-md mb-4 transition duration-150 ease-out w-4/5 hover:bg-red-500 hover:ease-in">
      {children}
    </div>
  )
}