import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/StudentSidebar.module.css';

function StudentSidebar({ isOpen, isCollapsed, onNavClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/student/dashboard' },
    { label: 'Profile', icon: '👤', path: '/student/dashboard/profile' },
    { label: 'Find Mentors', icon: '🔍', path: '/student/dashboard/mentors' },
    { label: 'Bookings', icon: '📅', path: '/student/dashboard/bookings' },
    { label: 'Resume', icon: '📄', path: '/student/dashboard/resume' },
    { label: 'Interviews', icon: '🎤', path: '/student/dashboard/interviews' },
    { label: 'Messages', icon: '💬', path: '/student/dashboard/messages' },
    { label: 'Notifications', icon: '🔔', path: '/student/dashboard/notifications' },
    { label: 'Settings', icon: '⚙️', path: '/student/dashboard/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/student/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={styles.sidebar}>
      <div className={`${styles.logoSection} ${isCollapsed ? styles.collapsed : ''}`}>
        <span>🎓</span>
        <div className={`${styles.logoText} ${isCollapsed ? styles.hidden : ''}`}>
          MentorBridge
        </div>
      </div>

      <nav>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <Link
                to={item.path}
                className={`${styles.menuLink} ${isActive(item.path) ? styles.active : ''} ${isCollapsed ? styles.collapsed : ''}`}
                onClick={onNavClick}
                title={isCollapsed ? item.label : ''}
              >
                <span>{item.icon}</span>
                <span className={styles.menuLinkText}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <button
          className={`${styles.logoutBtn} ${isCollapsed ? styles.collapsed : ''}`}
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
        >
          <span>🚪</span>
          <span className={isCollapsed ? 'hidden' : ''}>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default StudentSidebar;
