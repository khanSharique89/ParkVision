import React, { useState } from 'react';

function PaymentHistory() {
  const [payments] = useState([
    { id: 1, location: 'Downtown Parking Lot', date: '2026-04-25', amount: '$25', status: 'Completed', receipt: 'Download' },
    { id: 2, location: 'Plaza Garage', date: '2026-04-20', amount: '$30', status: 'Completed', receipt: 'Download' },
    { id: 3, location: 'Street Parking - Main', date: '2026-04-15', amount: '$12', status: 'Completed', receipt: 'Download' },
  ]);

  const handleDownload = (id) => {
    alert('Receipt downloaded successfully!');
  };

  return (
    <div className="payment-history-page">
      <h1>Payment History</h1>
      <p>Review your parking payments and download receipts anytime.</p>
      
      <div className="payment-summary">
        <div className="summary-card">
          <h4>Total Spent</h4>
          <p className="amount">$67.00</p>
        </div>
        <div className="summary-card">
          <h4>Transactions</h4>
          <p className="amount">{payments.length}</p>
        </div>
      </div>

      <div className="payment-table">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.location}</td>
                <td>{payment.date}</td>
                <td>{payment.amount}</td>
                <td><span className="status-badge completed">{payment.status}</span></td>
                <td><button onClick={() => handleDownload(payment.id)} className="link-btn">Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory;
