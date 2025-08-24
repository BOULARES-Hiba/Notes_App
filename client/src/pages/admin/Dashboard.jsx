import { useState, useEffect } from "react";
import { Users, FileText, Activity, TrendingUp, LogOut } from "lucide-react";
import axios from "axios";
import MetricCard from "@/components/general/MetricCard";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const { logout } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/stats`
        );
        setData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    fetchData();
  }, []);
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Administrator Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Monitor user analytics</p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Registered Users"
            value={data.totalUsers.toLocaleString()}
            icon={Users}
          />

          <MetricCard
            title="Total Notes Created"
            value={data.totalNotes.toLocaleString()}
            icon={FileText}
          />
          <MetricCard
            title="Average Notes per User"
            value={data.avgNotesPerUser}
            icon={TrendingUp}
          />
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Users Activity
            </h3>

            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                      User ID
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                      Note Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-2 text-sm font-mono text-gray-700">
                        {user._id}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-900">
                        {user.noteCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
