import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BookSlot from "./pages/BookSlot";
import MyBookings from "./pages/MyBookings";
import Navigate from "./pages/Navigate";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookSlot />} />
        <Route path="/my-bookings" element={<MyBookings />} />
         <Route path="/navigate" element={<Navigate />} />
      </Routes>
    </Router>
  );
}

export default App;