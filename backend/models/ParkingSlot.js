const mongoose = require("mongoose");

const parkingSlotSchema = new mongoose.Schema({
  areaId: { type: Number, required: true },
  areaName: { type: String, required: true },
  location: { type: String, required: true },
  slots: [
    {
      id: String,
      status: { type: String, default: "free" },
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ParkingSlot", parkingSlotSchema);