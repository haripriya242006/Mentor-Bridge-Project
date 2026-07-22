import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import LoadingSpinner from './LoadingSpinner';
import { getStudentProfile, getMentorProfile } from '../services/authService';

function DashboardLayout({ children, role }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    // Authentication and authorization check
    if (!token || userRole !== role) {
      localStorage.clear();
      const loginRole = role?.toLowerCase() || 'student';
      navigate(`/${loginRole}/login`);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        if (role === 'STUDENT') {
          const res = await getStudentProfile(email);
          setProfile(res.data);
          localStorage.setItem('userId', res.data.id);
        } else if (role === 'MENTOR') {
          const res = await getMentorProfile(email);
          setProfile(res.data);
          localStorage.setItem('mentorId', res.data.id);
          localStorage.setItem('userId', res.data.id);
        } else if (role === 'ADMIN') {
          setProfile({ name: email?.split('@')[0] || 'Admin', email });
        }
      } catch (err) {
        console.error('Failed to load user profile in layout:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, userRole, role, email, navigate]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  const name = profile?.name || 'User';
  const mail = profile?.email || email || '';

  // Width padding transition logic
  const paddingLeftStyle = sidebarCollapsed 
    ? 'var(--sidebar-collapsed-width)' 
    : 'var(--sidebar-width)';

  return (
    <div className="app-wrapper">
      <Sidebar 
        role={role}
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        toggleOpen={() => setSidebarCollapsed(!sidebarCollapsed)}
        onClose={() => setSidebarOpen(false)}
      />
      <div 
        className="app-main" 
        style={{ 
          paddingLeft: window.innerWidth > 768 ? paddingLeftStyle : '0', 
          transition: 'padding var(--transition)' 
        }}
      >
        <Navbar 
          role={role}
          userName={name}
          userEmail={mail}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
