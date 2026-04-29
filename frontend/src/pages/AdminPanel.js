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
    <div className="admin-panel-page px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
      <p className="text-gray-600 mb-8">Manage parking lots, users, and system activity.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="stat-card p-5 bg-white rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500">Total Users</h4>
          <p className="text-2xl font-semibold">{stats.totalUsers}</p>
        </div>
        <div className="stat-card p-5 bg-white rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500">Active Reservations</h4>
          <p className="text-2xl font-semibold">{stats.activeReservations}</p>
        </div>
        <div className="stat-card p-5 bg-white rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500">Total Revenue</h4>
          <p className="text-2xl font-semibold">{stats.totalRevenue}</p>
        </div>
        <div className="stat-card p-5 bg-white rounded-xl shadow-sm">
          <h4 className="text-sm text-gray-500">Parking Lots</h4>
          <p className="text-2xl font-semibold">{stats.parkingLots}</p>
        </div>
      </div>

      <div className="admin-section bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Manage Parking Lots</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 px-4">Lot Name</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Available</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lots.map((lot) => (
                <tr key={lot.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-4">{lot.name}</td>
                  <td className="py-4 px-4">{lot.capacity}</td>
                  <td className="py-4 px-4">{lot.available}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${lot.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {lot.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="link-btn text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
