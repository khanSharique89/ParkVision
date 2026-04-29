const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// temporary in-memory storage
let users = [];

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ================= SIGNUP ================= */
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed, id: Date.now() });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "your-secret-key", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// START SERVER (always at bottom)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});