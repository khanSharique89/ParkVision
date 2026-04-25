import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BookSlot from "./pages/BookSlot";
import MyBookings from "./pages/MyBookings";
import Navigate from "./pages/Navigate";
import AdminPanel from "./pages/AdminPanel";
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
          <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;