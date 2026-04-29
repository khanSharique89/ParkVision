import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // prevent page reload

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.message === "Signup successful") {
        navigate("/"); // go to login
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Join ParkVision</h2>
        <p>Create your account to get started.</p>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <span
            className="link-text"
            onClick={() => navigate("/")}
          >
            Sign in here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;