import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function Sidebar({ role, isOpen, isCollapsed, toggleOpen, onClose, activeTab, onSelectTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    const roleLower = role?.toLowerCase() || 'student';
    navigate(`/${roleLower}/login`);
  };

  const getMenuItems = () => {
    switch (role) {
      case 'STUDENT':
        return [
          { label: 'Dashboard', path: '/student/dashboard', icon: '📊' },
          { label: 'My Profile', path: '/student/profile', icon: '👤' },
          { label: 'Find Mentors', path: '/student/mentors', icon: '🔍' },
          { label: 'Mentor Requests', path: '/student/mentor-requests', icon: '📬' },
          { label: 'Bookings', path: '/student/bookings', icon: '📅' },
          { label: 'Resume Review', path: '/student/resume', icon: '📄' },
          { label: 'Mock Interviews', path: '/student/mock-interviews', icon: '🎤' },
          { label: 'Messages', path: '/student/chat', icon: '💬' },
          { label: 'Notifications', path: '/student/notifications', icon: '🔔' },
          { label: 'Settings', path: '/student/settings', icon: '⚙️' }
        ];
      case 'MENTOR':
        return [
          { label: 'Dashboard', path: '/mentor/dashboard', icon: '📊' },
          { label: 'My Profile', path: '/mentor/profile', icon: '👤' },
          { label: 'Mentor Requests', path: '/mentor/mentor-requests', icon: '📬' },
          { label: 'Bookings', path: '/mentor/bookings', icon: '📅' },
          { label: 'Resume Review', path: '/mentor/resume', icon: '📄' },
          { label: 'Mock Interviews', path: '/mentor/mock-interviews', icon: '🎤' },
          { label: 'Messages', path: '/mentor/chat', icon: '💬' },
          { label: 'Notifications', path: '/mentor/notifications', icon: '🔔' },
          { label: 'Settings', path: '/mentor/settings', icon: '⚙️' }
        ];
      case 'ADMIN':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
          { label: 'Users', path: '/admin/users', icon: '👥' },
          { label: 'Students', path: '/admin/students', icon: '🎓' },
          { label: 'Mentors', path: '/admin/mentors', icon: '👨‍🏫' },
          { label: 'Bookings', path: '/admin/bookings', icon: '📅' },
          { label: 'Reports', path: '/admin/reports', icon: '📈' },
          { label: 'Settings', path: '/admin/settings', icon: '⚙️' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleItemClick = (e, item) => {
    if (onSelectTab) {
      e.preventDefault();
      onSelectTab(item.label);
    }
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">MentorBridge</span>
          </div>
          <button className="sidebar-toggle" onClick={toggleOpen} title="Toggle Sidebar">
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const isTabActive = activeTab 
              ? activeTab.toLowerCase() === item.label.toLowerCase() 
              : location.pathname === item.path;

            return (
              <NavLink
                key={index}
                to={item.path}
                className={`nav-item ${isTabActive ? 'active' : ''}`}
                onClick={(e) => handleItemClick(e, item)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout} title="Logout">
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
