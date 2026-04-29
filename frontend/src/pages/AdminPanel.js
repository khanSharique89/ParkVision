import React, { useState } from 'react';

function AdminPanel() {
  const [stats] = useState({
    totalUsers: 1240,
    activeReservations: 89,
    totalRevenue: '$15,430',
    parkingLots: 24,
  });
  const [lots] = useState([
    { id: 1, name: 'Downtown Parking Lot', capacity: 200, available: 45, status: 'Active' },
    { id: 2, name: 'Plaza Garage', capacity: 150, available: 12, status: 'Active' },
    { id: 3, name: 'Street Parking - Main', capacity: 80, available: 8, status: 'Maintenance' },
  ]);

  return (
    <div className="admin-panel-page">
      <h1>Admin Panel</h1>
      <p>Manage parking lots, users, and system activity.</p>
      
      <div className="admin-stats">
        <div className="stat-card">
          <h4>Total Users</h4>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h4>Active Reservations</h4>
          <p className="stat-value">{stats.activeReservations}</p>
        </div>
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <p className="stat-value">{stats.totalRevenue}</p>
        </div>
        <div className="stat-card">
          <h4>Parking Lots</h4>
          <p className="stat-value">{stats.parkingLots}</p>
        </div>
      </div>

      <div className="admin-section">
        <h3>Manage Parking Lots</h3>
        <table>
          <thead>
            <tr>
              <th>Lot Name</th>
              <th>Capacity</th>
              <th>Available</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lots.map((lot) => (
              <tr key={lot.id}>
                <td>{lot.name}</td>
                <td>{lot.capacity}</td>
                <td>{lot.available}</td>
                <td><span className={`status-badge ${lot.status.toLowerCase()}`}>{lot.status}</span></td>
                <td><button className="link-btn">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
