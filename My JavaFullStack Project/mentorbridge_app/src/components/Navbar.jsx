import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ role, userName = 'User', userEmail = '', onMenuToggle }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    { id: 1, message: 'New message from Sarah', time: '5 min ago', unread: true },
    { id: 2, message: 'Your booking has been approved', time: '1 hour ago', unread: true },
    { id: 3, message: 'Mock interview feedback added', time: '1 day ago', unread: false }
  ];

  // Close dropdowns on outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    const roleLower = role?.toLowerCase() || 'student';
    navigate(`/${roleLower}/login`);
  };

  const navigateToProfile = () => {
    setShowProfileMenu(false);
    navigate(`/${role?.toLowerCase()}/profile`);
  };

  const navigateToSettings = () => {
    setShowProfileMenu(false);
    navigate(`/${role?.toLowerCase()}/settings`);
  };

  const navigateToNotifications = () => {
    setShowNotifications(false);
    navigate(`/${role?.toLowerCase()}/notifications`);
  };

  return (
    <header className="topnav">
      <div className="topnav-left">
        <button className="hamburger-btn" onClick={onMenuToggle} title="Open navigation">
          ☰
        </button>
        <div className="sidebar-logo mobile-logo" style={{ display: 'none' }}>
          <span className="logo-icon">🎓</span>
        </div>
      </div>

      <div className="topnav-right">
        {/* Notifications Dropdown */}
        <div className="topnav-item" ref={notifRef}>
          <button
            className="topnav-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <span className="icon">🔔</span>
            {notifications.filter(n => n.unread).length > 0 && (
              <span className="notification-badge">
                {notifications.filter(n => n.unread).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h6>Notifications</h6>
              </div>
              <div className="notification-list">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${notif.unread ? 'unread' : ''}`}
                    onClick={navigateToNotifications}
                  >
                    <div className="notification-content">
                      <p className="notification-message">{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="btn-see-all" onClick={navigateToNotifications}>
                  See all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="topnav-item" ref={profileRef}>
          <button
            className="topnav-profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="User Profile"
          >
            <div className="profile-avatar">
              <span>{userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <div className="profile-info">
              <span className="profile-greeting">Account</span>
              <span className="profile-name">{userName}</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-avatar-large">
                  <span>{userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
                </div>
                <p className="profile-name-large">{userName}</p>
                {userEmail && <p className="profile-email">{userEmail}</p>}
              </div>

              <div className="profile-dropdown-menu">
                <button className="dropdown-item" onClick={navigateToProfile}>
                  <span>👤</span> My Profile
                </button>
                <button className="dropdown-item" onClick={navigateToSettings}>
                  <span>⚙️</span> Settings
                </button>
              </div>

              <div className="profile-dropdown-footer">
                <button className="btn-logout-small" onClick={handleLogout}>
                  <span>🚪</span> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
