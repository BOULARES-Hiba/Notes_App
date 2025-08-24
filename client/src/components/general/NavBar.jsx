import { useAuth } from "@/context/AuthContext";
import { Search } from "lucide-react";
import { useState } from "react";

export default function NavBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md py-2 px-2 top-0 right-0 left-0 fixed flex items-center justify-between">
      <div className="flex items-center justify-center w-16">
        <img src="/skripePad.png" className="object-fill" />
      </div>

      <form onSubmit={handleSearch}>
        <div className="flex justify-center items-center relative w-full px-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none
            focus:border-gray-500 focus:ring-1 "
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
          {user?.userName?.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{user?.userName}</span>
          <button
            onClick={handleLogout}
            className="underline text-gray-400 hover:text-gray-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
