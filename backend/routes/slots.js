const express = require("express");
const router = express.Router();
const ParkingSlot = require("../models/ParkingSlot");
const axios = require("axios");

// Get all parking areas with slot status
router.get("/", async (req, res) => {
  try {
    const areas = await ParkingSlot.find();
    res.json(areas);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: upload image and detect slots
router.post("/detect/:areaId", async (req, res) => {
  try {
    const { image, rows, cols } = req.body;
    const { areaId } = req.params;

    // Call Python YOLO API
    const response = await axios.post("http://localhost:5001/detect", {
      image,
      rows: rows || 2,
      cols: cols || 4,
    });

    const detectedSlots = response.data.slots;
    const carsDetected = response.data.cars_detected || 0;

    // Update slot status in MongoDB
    const area = await ParkingSlot.findOneAndUpdate(
      { areaId: parseInt(areaId) },
      { $set: { slots: detectedSlots, lastUpdated: Date.now() } },
      { new: true, upsert: true, runValidators: false }
    );

    res.json({ message: "Slots updated", area, carsDetected });
  } catch (err) {
    console.log("Detect error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Seed initial parking data
router.post("/seed", async (req, res) => {
  try {
    const areas = [
      {
        areaId: 1,
        areaName: "City Center Parking",
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
        areaId: 2,
        areaName: "Mall Parking",
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
        areaId: 3,
        areaName: "Railway Station Parking",
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

    await ParkingSlot.deleteMany();
    await ParkingSlot.insertMany(areas);
    res.json({ message: "Seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new parking area
router.post("/add", async (req, res) => {
  try {
    const { areaId, areaName, location, slots } = req.body;
    const existing = await ParkingSlot.findOne({ areaId });
    if (existing) return res.json({ message: "Area already exists" });

    const area = new ParkingSlot({ areaId, areaName, location, slots });
    await area.save();
    res.json({ message: "Area added", area });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete parking area
router.delete("/:areaId", async (req, res) => {
  try {
    await ParkingSlot.findOneAndDelete({ areaId: parseInt(req.params.areaId) });
    res.json({ message: "Area deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;