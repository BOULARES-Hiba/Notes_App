import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner"
export default function Login() {
   const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const API_URL = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
     e.preventDefault();
    
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
     <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account ?
          <Link
            className="font-medium ml-2 text-primary hover:underline "
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"   
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"   
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            
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
