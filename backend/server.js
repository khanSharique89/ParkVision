require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// temporary in-memory storage
let users = [];

/* ================= SIGNUP ================= */
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  users.push({ email, password });
  res.json({ message: "Signup successful" });
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

// START SERVER (always at bottom)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  require("dotenv").config();