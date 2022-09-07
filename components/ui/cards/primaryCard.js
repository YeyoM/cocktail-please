export default function PrimaryCard({ children }) {
  return (
    <div className="max-h-full min-h-fit w-4/5 mb-4 bg-orange-300 p-4 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
      {children}
    </div>
  )
}