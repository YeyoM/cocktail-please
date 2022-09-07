export default function SecondaryCard({ children }) {
  return (
    <div className="max-h-full min-h-fit w-4/5 mb-6 bg-violet-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
      {children}
    </div>
  )
}