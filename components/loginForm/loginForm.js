import SuccessBtn from '../ui/buttons/successBtn'

export default function LoginForm() {
  return (
    <div className="max-h-full min-h-fit w-4/5 mt-8 bg-orange-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col items-center overflow-hidden">
      <form className="w-2/3" action="">
        <h1 className="text-white text-4xl mt-4 mb-12">Login to your account</h1>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white text-lg">Email</label>
          <input placeholder="email here..." type="email" id="email" className="mb-4 w-full p-1 border border-white rounded-md" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white text-lg">Password</label>
          <input placeholder="password here..." type="password" id="password" className="mb-8 w-full p-1 border border-white rounded-md" />
        </div>
        <div className="flex flex-col items-center">
          <SuccessBtn>Login</SuccessBtn>
        </div>
      </form>
    </div>
  )
}