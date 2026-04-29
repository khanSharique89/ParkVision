import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to ParkVision</h1>
        <p>Your smart parking solution</p>
        <button onClick={() => navigate('/')} className="cta-btn">Get Started</button>
      </header>
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Easy Parking</h3>
            <p>Find and reserve parking spots effortlessly.</p>
          </div>
          <div className="feature">
            <h3>Real-time Updates</h3>
            <p>Get live updates on parking availability.</p>
          </div>
          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Pay securely with multiple payment options.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;