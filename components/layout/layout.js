export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center p-1 max-w-xl m-auto bg-purple-900 min-h-full justify-center">
      {children}
    </div>
  )
}