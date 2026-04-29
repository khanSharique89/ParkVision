import { useState } from "react";
import { useNavigate } from "react-router-dom";

const parkingAreas = [
  {
    id: 1,
    name: "City Center Parking",
    location: "MG Road, Indore",
    lat: 22.7196,
    lng: 75.8577,
  },
  {
    id: 2,
    name: "Mall Parking",
    location: "Vijay Nagar, Indore",
    lat: 22.7533,
    lng: 75.8937,
  },
  {
    id: 3,
    name: "Railway Station Parking",
    location: "Station Road, Indore",
    lat: 22.7220,
    lng: 75.8378,
  },
];

function Navigate() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleNavigate = (area) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${area.lat},${area.lng}&travelmode=driving`;
    window.open(url, "_blank");
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">GPS Navigation</h2>
        <p className="text-gray-500 mb-6">Select a parking area to get directions via Google Maps</p>

        <div className="space-y-4">
          {parkingAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => setSelected(area.id)}
              className={`bg-white rounded-xl shadow p-5 cursor-pointer border-2 transition ${
                selected === area.id ? "border-blue-600" : "border-transparent"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">{area.name}</h4>
                  <p className="text-sm text-gray-500">{area.location}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {area.lat}, {area.lng}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(area);
                  }}
                  className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Navigate
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Preview */}
        <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-blue-800 text-white px-5 py-3">
            <p className="font-semibold text-sm">Map Preview — Indore Parking Areas</p>
          </div>
          <iframe
            title="Parking Map"
            width="100%"
            height="350"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58972.54!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Navigate;