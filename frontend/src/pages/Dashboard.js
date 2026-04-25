
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">P</span>
          <span className="text-xl font-bold">ParkVision</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </nav>

      {/* Welcome */}
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-gray-500 mt-1">
          Where would you like to park today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="px-6 grid grid-cols-2 gap-4 md:grid-cols-5">

        <div
          onClick={() => navigate("/book")}
          className="bg-blue-700 text-white rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:bg-blue-800 transition shadow"
        >
          <span className="text-3xl">&#128663;</span>
          <span className="font-semibold text-sm">Book a Slot</span>
        </div>

        <div
          onClick={() => navigate("/my-bookings")}
          className="bg-white text-gray-800 rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition shadow"
        >
          <span className="text-3xl">&#128203;</span>
          <span className="font-semibold text-sm">My Bookings</span>
        </div>

        <div
          onClick={() => navigate("/navigate")}
          className="bg-white text-gray-800 rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition shadow"
        >
          <span className="text-3xl">&#128506;</span>
          <span className="font-semibold text-sm">Navigate</span>
        </div>

        <div className="bg-white text-gray-800 rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 transition shadow">
          <span className="text-3xl">&#128100;</span>
          <span className="font-semibold text-sm">Profile</span>
        </div>

        {/* ✅ Admin Panel (Correct Placement) */}
        <div
          onClick={() => navigate("/admin")}
          className="bg-yellow-400 text-yellow-900 rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:bg-yellow-500 transition shadow"
        >
          <span className="text-3xl">&#128247;</span>
          <span className="font-semibold text-sm">Admin Panel</span>
        </div>

      </div>

      {/* Slot Status */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Nearby Parking Areas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold text-gray-800">
              City Center Parking
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              MG Road, Indore
            </p>

            <div className="flex gap-2 mt-3">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                8 Free
              </span>
              <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                4 Occupied
              </span>
            </div>

            <button
              onClick={() => navigate("/book")}
              className="mt-4 w-full bg-blue-700 text-white text-sm py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Book Now
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold text-gray-800">
              Mall Parking
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Vijay Nagar, Indore
            </p>

            <div className="flex gap-2 mt-3">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                3 Free
              </span>
              <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                9 Occupied
              </span>
            </div>

            <button
              onClick={() => navigate("/book")}
              className="mt-4 w-full bg-blue-700 text-white text-sm py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Book Now
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-5">
            <h4 className="font-semibold text-gray-800">
              Railway Station Parking
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Station Road, Indore
            </p>

            <div className="flex gap-2 mt-3">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                12 Free
              </span>
              <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                6 Occupied
              </span>
            </div>

            <button
              onClick={() => navigate("/book")}
              className="mt-4 w-full bg-blue-700 text-white text-sm py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
