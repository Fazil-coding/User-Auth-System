import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;

  return (
    <div className="flex justify-center items-center h-screen text-2xl font-bold text-green-600">
      {decoded ? `Welcome, ${decoded.FirstName} 👋` : "User not logged in"}
    </div>
  );
}

export default Dashboard;
