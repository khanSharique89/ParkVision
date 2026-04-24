import { useState } from "react";
import { useNavigate } from "react-router-dom";

const parkingAreas = [
  {
    id: 1,
    name: "City Center Parking",
    location: "MG Road, Indore",
    slots: [
      { id: "A1", status: "free" },
      { id: "A2", status: "occupied" },
      { id: "A3", status: "free" },
      { id: "A4", status: "occupied" },
      { id: "B1", status: "free" },
      { id: "B2", status: "free" },
      { id: "B3", status: "occupied" },
      { id: "B4", status: "free" },
    ],
  },
  {
    id: 2,
    name: "Mall Parking",
    location: "Vijay Nagar, Indore",
    slots: [
      { id: "A1", status: "occupied" },
      { id: "A2", status: "occupied" },
      { id: "A3", status: "free" },
      { id: "A4", status: "free" },
      { id: "B1", status: "occupied" },
      { id: "B2", status: "free" },
      { id: "B3", status: "occupied" },
      { id: "B4", status: "occupied" },
    ],
  },
  {
    id: 3,
    name: "Railway Station Parking",
    location: "Station Road, Indore",
    slots: [
      { id: "A1", status: "free" },
      { id: "A2", status: "free" },
      { id: "A3", status: "free" },
      { id: "A4", status: "free" },
      { id: "B1", status: "occupied" },
      { id: "B2", status: "free" },
      { id: "B3", status: "free" },
      { id: "B4", status: "occupied" },
    ],
  },
];

function BookSlot() {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("1");
  const [step, setStep] = useState(1);

  const handleSlotClick = (slot) => {
    if (slot.status === "occupied") return;
    setSelectedSlot(slot.id);
  };

  const handleProceed = () => {
    if (!selectedArea || !selectedSlot || !date || !time) {
      alert("Please fill all fields and select a slot");
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = () => {
    alert(`Booking confirmed!\nArea: ${selectedArea.name}\nSlot: ${selectedSlot}\nDate: ${date}\nTime: ${time}\nDuration: ${duration} hour(s)`);
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">ParkVision</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
      </nav>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Parking Slot</h2>

        {step === 1 && (
          <>
            {/* Select Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Parking Area</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {parkingAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => { setSelectedArea(area); setSelectedSlot(null); }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                      selectedArea?.id === area.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <h4 className="font-semibold text-gray-800">{area.name}</h4>
                    <p className="text-sm text-gray-500">{area.location}</p>
                    <p className="text-sm text-green-600 mt-1">
                      {area.slots.filter(s => s.status === "free").length} slots free
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot Map */}
            {selectedArea && (
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Select a Slot — {selectedArea.name}</h3>
                <div className="grid grid-cols-4 gap-3">
                  {selectedArea.slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      className={`py-3 rounded-lg text-sm font-semibold transition ${
                        slot.status === "occupied"
                          ? "bg-red-100 text-red-500 cursor-not-allowed"
                          : selectedSlot === slot.id
                          ? "bg-blue-600 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {slot.id}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Free</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span> Occupied</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Selected</span>
                </div>
              </div>
            )}

            {/* Date, Time, Duration */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Select Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1 hour — ₹50</option>
                    <option value="2">2 hours — ₹90</option>
                    <option value="3">3 hours — ₹130</option>
                    <option value="4">4 hours — ₹160</option>
                    <option value="5">5 hours — ₹200</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition"
            >
              Proceed to Payment
            </button>
          </>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Booking Summary</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Parking Area</span>
                <span>{selectedArea.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Location</span>
                <span>{selectedArea.location}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Slot</span>
                <span>{selectedSlot}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Date</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Time</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Duration</span>
                <span>{duration} hour(s)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-blue-700">
                <span>Total Amount</span>
                <span>₹{duration === "1" ? 50 : duration === "2" ? 90 : duration === "3" ? 130 : duration === "4" ? 160 : 200}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmBooking}
                className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookSlot;