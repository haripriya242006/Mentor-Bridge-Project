import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/StudentNavbar.module.css';

function StudentNavbar({ onMenuToggle, sidebarOpen }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New mentor request', icon: '👤', time: '2 mins ago', read: false },
    { id: 2, message: 'Your booking was approved', icon: '✓', time: '1 hour ago', read: false },
    { id: 3, message: 'Mock interview scheduled', icon: '🎤', time: '3 hours ago', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const email = localStorage.getItem('email');
  const userName = email ? email.split('@')[0] : 'Student';
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      // Navigate to mentors page with search parameter
      navigate(`/student/dashboard/mentors?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/student/login');
  };

  const handleNotificationClick = (notificationId) => {
    // Mark as read
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button
          className={styles.hamburgerBtn}
          onClick={onMenuToggle}
          title="Toggle sidebar"
        >
          ☰
        </button>

        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search mentors, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
      </div>

      <div className={styles.right}>
        {/* Notifications */}
        <div ref={notificationsRef} className={styles.dropdownContainer}>
          <button
            className={styles.iconBtn}
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            🔔
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Notifications</h3>
              </div>
              <ul className={styles.dropdownMenu}>
                {notifications.length === 0 ? (
                  <li className={styles.dropdownItem} style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
                    No notifications
                  </li>
                ) : (
                  notifications.map(notif => (
                    <li key={notif.id}>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => handleNotificationClick(notif.id)}
                        style={{
                          opacity: notif.read ? 0.6 : 1,
                          fontWeight: notif.read ? 400 : 600,
                        }}
                      >
                        <span>{notif.icon}</span>
                        <div style={{ textAlign: 'left' }}>
                          <div>{notif.message}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{notif.time}</div>
                        </div>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className={styles.dropdownContainer}>
          <button
            className={styles.iconBtn}
            onClick={() => setShowProfile(!showProfile)}
            title="Profile"
          >
            👤
          </button>

          {showProfile && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <div className={styles.avatar}>{userInitial}</div>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{userName}</div>
                  <div className={styles.userEmail}>{email}</div>
                </div>
              </div>
              <ul className={styles.dropdownMenu}>
                <li>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      navigate('/student/dashboard/profile');
                      setShowProfile(false);
                    }}
                  >
                    👤 Profile
                  </button>
                </li>
                <li>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      navigate('/student/dashboard/settings');
                      setShowProfile(false);
                    }}
                  >
                    ⚙️ Settings
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.dropdownItem} ${styles.danger}`}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default StudentNavbar;
