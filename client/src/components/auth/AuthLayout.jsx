import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
     <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500  w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center  text-gray-300 ">
          <h1 className="text-4xl font-bold ">
            Welcome to SkripePad
          </h1>
    <div>
  <img src="/skripePad.png" alt="SkripePad Logo" className="mx-auto w-36 h-36" />
</div>
           <p className="mb-6">Turn scattered thoughts into organized notes.</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet/>
      </div>
    </div>
  )
}
