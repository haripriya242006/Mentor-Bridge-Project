import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentNavbar from './StudentNavbar';
import styles from '../styles/StudentLayout.module.css';

function StudentLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'STUDENT') {
      navigate('/student/login');
    }
  }, [navigate]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={`${styles.sidebarWrapper} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarCollapsed}`}>
        <StudentSidebar 
          isOpen={sidebarOpen}
          isCollapsed={!sidebarOpen}
          onNavClick={closeSidebar}
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.navbar}>
          <StudentNavbar 
            onMenuToggle={toggleSidebar}
            sidebarOpen={sidebarOpen}
          />
        </div>

        <div className={styles.contentArea}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;
