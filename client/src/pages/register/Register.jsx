import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner"
import axios from "axios";
export default function Register() {
   const [formData, setFormData] = useState({
    userName: "",
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${API_URL}/auth/register`, formData, {
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success("Registration successful! Redirecting to login...");

      setFormData({
        userName: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    } else {
      toast.error(res.data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Register error:", error);

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred during registration");
    }
  }
};


 
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">User Name</label>
          <input
            type="text"
            name="userName" 
            placeholder="Enter your user name"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

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
