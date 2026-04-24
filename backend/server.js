require("dotenv").config(); // must be first
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Routes
app.get("/", (req, res) => res.send("ParkVision backend is running"));
app.use("/api/auth", authRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));