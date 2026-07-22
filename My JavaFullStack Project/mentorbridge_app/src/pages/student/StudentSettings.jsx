import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentSettings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/student/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Simulate dark mode theme trigger by toggling a body class
    document.body.classList.toggle('dark-theme');
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Settings</h1>
          <p className="header-subtitle">Customize theme selections and account notifications preferences.</p>
        </div>
      </div>

      <div className="flex-col gap-lg">
        
        {/* Appearance Settings */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Theme Preferences</h3>
          </div>
          <div className="section-body">
            <div className="d-flex justify-between align-center">
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Interface Mode</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Toggle between light and dark themes.</span>
              </div>
              <button className="btn btn-outline btn-sm" onClick={toggleDarkMode}>
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        </div>

        {/* Account Notifications Settings */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Email Notifications</h3>
          </div>
          <div className="section-body">
            <div className="d-flex justify-between align-center" style={{ marginBottom: 'var(--spacing-md)' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Booking Approvals</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Get notified when a mentor accepts a session request.</span>
              </div>
              <input 
                type="checkbox" 
                checked={emailNotifications} 
                onChange={() => setEmailNotifications(!emailNotifications)} 
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Account Security</h3>
          </div>
          <div className="section-body flex-col gap-sm">
            <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/student/profile')} style={{ alignSelf: 'flex-start' }}>
              👤 Update Profile Information
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleLogout} style={{ alignSelf: 'flex-start', marginTop: 'var(--spacing-md)' }}>
              🚪 Log Out Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentSettings;
