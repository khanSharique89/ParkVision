import React, { useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState({
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    vehicle: 'Toyota Camry - ABC 1234',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <p>Manage your account details and preferences.</p>
      
      <div className="profile-container">
        <div className="profile-card">
          <h2>Account Information</h2>
          {!isEditing ? (
            <div className="profile-info">
              <div className="info-item">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <p>{profile.phone}</p>
              </div>
              <div className="info-item">
                <label>Vehicle</label>
                <p>{profile.vehicle}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="submit-btn">Edit Profile</button>
            </div>
          ) : (
            <div className="profile-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Vehicle</label>
                <input
                  type="text"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                />
              </div>
              <div className="button-group">
                <button onClick={handleSave} className="submit-btn">Save Changes</button>
                <button onClick={() => setIsEditing(false)} className="secondary-btn">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
