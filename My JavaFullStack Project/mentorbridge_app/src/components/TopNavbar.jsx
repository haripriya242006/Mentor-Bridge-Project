import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/topnav.css';

const TopNavbar = ({ userName = 'User' }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, message: 'New booking request from Sarah', time: '5 min ago', unread: true },
    { id: 2, message: 'Your resume review is ready', time: '1 hour ago', unread: true },
    { id: 3, message: 'Mentor response received', time: '3 hours ago', unread: false }
  ];

  return (
    <div className="topnav">
      {/* Left Section */}
      <div className="topnav-left">
      </div>

      {/* Right Section - Icons and Profile */}
      <div className="topnav-right">
        {/* Notifications */}
        <div className="topnav-item notifications-container">
          <button
            className="topnav-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <span className="icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h6>Notifications</h6>
                <button className="btn-mark-all" style={{fontSize: '0.75rem', background: 'none', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer'}}>Mark all as read</button>
              </div>
              <div className="notification-list">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                    <div className="notification-content">
                      <p className="notification-message">{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="btn-see-all">See all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="topnav-item profile-container">
          <button
            className="topnav-profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Profile"
          >
            <div className="profile-avatar">
              <span>👤</span>
            </div>
            <div className="profile-info">
              <span className="profile-greeting">Welcome back,</span>
              <span className="profile-name">{userName}</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-avatar-large">
                  <span>👤</span>
                </div>
                <div>
                  <p className="profile-name-large">{userName}</p>
                  <p className="profile-email">{localStorage.getItem('email')}</p>
                </div>
              </div>

              <div className="profile-dropdown-menu">
                <button className="dropdown-item" onClick={() => navigate('#')}>
                  <span>👤</span> My Profile
                </button>
                <button className="dropdown-item" onClick={() => navigate('#')}>
                  <span>⚙️</span> Settings
                </button>
                <button className="dropdown-item" onClick={() => navigate('#')}>
                  <span>❓</span> Help & Support
                </button>
              </div>

              <div className="profile-dropdown-footer">
                <button
                  className="btn-logout-small"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('email');
                    const role = localStorage.getItem('role');
                    navigate(`/${role?.toLowerCase()}/login`);
                  }}
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
