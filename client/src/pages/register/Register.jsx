import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account ?
          <Link
            className="font-medium ml-2 text-primary hover:underline "
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="rounded-md bg-purple-700 px-4 py-2 text-white font-medium hover:bg-purple-800"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
