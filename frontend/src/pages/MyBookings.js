import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyBookings = [
  {
    id: 1,
    area: "City Center Parking",
    location: "MG Road, Indore",
    slot: "A1",
    date: "2025-04-25",
    time: "10:00",
    duration: 2,
    amount: 90,
    status: "active",
  },
  {
    id: 2,
    area: "Mall Parking",
    location: "Vijay Nagar, Indore",
    slot: "B2",
    date: "2025-04-20",
    time: "14:00",
    duration: 1,
    amount: 50,
    status: "completed",
  },
  {
    id: 3,
    area: "Railway Station Parking",
    location: "Station Road, Indore",
    slot: "A3",
    date: "2025-04-18",
    time: "09:00",
    duration: 3,
    amount: 130,
    status: "cancelled",
  },
];

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(dummyBookings);

  const handleCancel = (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking? Your payment will be refunded.");
    if (confirmed) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: "cancelled" } : b));
      alert("Booking cancelled! Refund will be processed in 3-5 business days.");
    }
  };

  const statusStyle = (status) => {
    if (status === "active") return "bg-green-100 text-green-700";
    if (status === "completed") return "bg-gray-100 text-gray-600";
    if (status === "cancelled") return "bg-red-100 text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <span className="text-xl font-bold">ParkVision</span>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
      </nav>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-4xl mb-4">&#128203;</p>
            <p>No bookings yet.</p>
            <button
              onClick={() => navigate("/book")}
              className="mt-4 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Book a Slot
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{booking.area}</h4>
                    <p className="text-sm text-gray-500">{booking.location}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusStyle(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm text-gray-600">
                  <div>
                    <p className="text-xs text-gray-400">Slot</p>
                    <p className="font-medium">{booking.slot}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="font-medium">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Duration</p>
                    <p className="font-medium">{booking.duration} hr(s)</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="font-bold text-blue-700">&#8377;{booking.amount}</p>
                  {booking.status === "active" && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel & Refund
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;