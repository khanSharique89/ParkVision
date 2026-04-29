import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Welcome to Your ParkVision Dashboard</h1>
      <p>Manage your parking reservations and preferences here.</p>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Find Parking</h3>
          <p>Search for available parking spots near you.</p>
          <button onClick={() => navigate("/find-parking")}>Search Now</button>
        </div>
        <div className="card">
          <h3>My Reservations</h3>
          <p>View and manage your current parking reservations.</p>
          <button onClick={() => navigate("/reservations")}>View Reservations</button>
        </div>
        <div className="card">
          <h3>Payment History</h3>
          <p>Check your past payments and receipts.</p>
          <button onClick={() => navigate("/payment-history")}>View History</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;