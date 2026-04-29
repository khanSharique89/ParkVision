import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FindParking from "./pages/FindParking";
import Reservations from "./pages/Reservations";
import PaymentHistory from "./pages/PaymentHistory";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  React.useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Dashboard />
            </Layout>
          } />
          <Route path="/find-parking" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <FindParking />
            </Layout>
          } />
          <Route path="/reservations" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Reservations />
            </Layout>
          } />
          <Route path="/payment-history" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <PaymentHistory />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Profile />
            </Layout>
          } />
          <Route path="/admin" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AdminPanel />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <About />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Contact />
            </Layout>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;