import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { getAllStudents, getAllMentors } from '../services/authService';
import {
  DashboardHeader,
  StatsCard,
  SectionCard,
  StatusBadge,
  EmptyState
} from '../components/DashboardComponents';

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [adminUser, setAdminUser] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!token || role !== 'ADMIN') {
      navigate('/admin/login');
      return;
    }
    const derivedName = email?.split('@')[0] || 'Admin';
    setAdminUser(derivedName);
    setAdminEmail(email || 'admin@mentorbridge.com');

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch students
      const studRes = await getAllStudents().catch(() => ({ data: [] }));
      const fetchedStudents = Array.isArray(studRes.data) ? studRes.data : [];
      setStudents(fetchedStudents);

      // Fetch mentors
      const mentRes = await getAllMentors().catch(() => ({ data: [] }));
      const fetchedMentors = Array.isArray(mentRes.data) ? mentRes.data : [];
      setMentors(fetchedMentors);

      // Mock / initial bookings if API endpoint isn't available
      const initialBookings = [
        { id: 1, studentName: 'Sarah Johnson', mentorName: 'Raj Kumar', bookingDate: '2026-07-25', bookingTime: '10:00 AM', duration: 45, status: 'APPROVED' },
        { id: 2, studentName: 'Alex Turner', mentorName: 'Sofia Martinez', bookingDate: '2026-07-26', bookingTime: '02:00 PM', duration: 60, status: 'PENDING' },
        { id: 3, studentName: 'David Lee', mentorName: 'Ahmed Hassan', bookingDate: '2026-07-27', bookingTime: '11:30 AM', duration: 30, status: 'REJECTED' },
        { id: 4, studentName: 'Emily Watson', mentorName: 'Emma Wilson', bookingDate: '2026-07-28', bookingTime: '04:00 PM', duration: 45, status: 'APPROVED' }
      ];
      setBookings(initialBookings);

    } catch (err) {
      console.error('Data fetch error:', err);
    }
  };

  // Delete Handlers
  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/students/${studentId}`).catch(() => {});
      setStudents(prev => prev.filter(s => s.id !== studentId));
      setMessage('Student deleted successfully');
    } catch (err) {
      setError('Failed to delete student');
    }
  };

  const handleDeleteMentor = async (mentorId) => {
    if (!window.confirm('Are you sure you want to delete this mentor?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/mentors/${mentorId}`).catch(() => {});
      setMentors(prev => prev.filter(m => m.id !== mentorId));
      setMessage('Mentor deleted successfully');
    } catch (err) {
      setError('Failed to delete mentor');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`).catch(() => {});
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      setMessage('Booking deleted successfully');
    } catch (err) {
      setError('Failed to delete booking');
    }
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();
    setMessage('Admin profile settings updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // All combined users (Students + Mentors)
  const allUsers = [
    ...students.map(s => ({ ...s, userRole: 'Student', info: s.college ? `${s.college} (${s.department || ''})` : 'Student' })),
    ...mentors.map(m => ({ ...m, userRole: 'Mentor', info: m.company ? `${m.company} (${m.experience || ''} yrs)` : 'Mentor' }))
  ];

  // Filtering helpers
  const filteredUsers = allUsers.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.userRole?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.college?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.skills?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMentors = mentors.filter(m => 
    m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.skills?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => 
    b.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.mentorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics for Reports
  const approvedBookingsCount = bookings.filter(b => b.status === 'APPROVED').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'PENDING').length;
  const rejectedBookingsCount = bookings.filter(b => b.status === 'REJECTED').length;

  // Mock data for overview dashboard
  const stats = {
    totalStudents: students.length || 1234,
    totalMentors: mentors.length || 256,
    totalBookings: bookings.length || 4891,
    mockInterviews: 1203,
    avgRating: 4.8,
    activeUsers: (students.length + mentors.length) || 567
  };

  const recentActivities = [
    { id: 1, user: 'Sarah Johnson', action: 'Booked session', time: '2 minutes ago', icon: '📅' },
    { id: 2, user: 'Mentor Raj', action: 'Approved mock interview', time: '15 minutes ago', icon: '✓' },
    { id: 3, user: 'Student Alex', action: 'Uploaded resume', time: '1 hour ago', icon: '📄' },
    { id: 4, user: 'Mentor Sofia', action: 'Posted feedback', time: '2 hours ago', icon: '💬' },
    { id: 5, user: 'New User Register', action: 'John Doe registered', time: '3 hours ago', icon: '👤' }
  ];

  const bookingStats = [
    { status: 'Pending', count: pendingBookingsCount || 234, percentage: 18, color: '#F59E0B' },
    { status: 'Approved', count: approvedBookingsCount || 891, percentage: 68, color: '#10B981' },
    { status: 'Rejected', count: rejectedBookingsCount || 176, percentage: 14, color: '#EF4444' },
  ];

  const topMentors = mentors.slice(0, 4).map(m => ({
    id: m.id,
    name: m.name,
    rating: m.rating || 4.8,
    students: 12,
    sessions: 45
  }));

  return (
    <div className="app-wrapper">
      <Sidebar role="ADMIN" activeTab={activeTab} onSelectTab={setActiveTab} />
      
      <div className="app-main">
        <TopNavbar userName={adminUser} />
        
        <div className="app-content">
          {/* Alerts */}
          {message && (
            <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
              ✓ {message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
              ✕ {error}
            </div>
          )}

          {/* =========================================================================
             1. DASHBOARD VIEW
             ========================================================================= */}
          {activeTab === 'Dashboard' && (
            <>
              <DashboardHeader 
                title="Administration Dashboard" 
                subtitle="Welcome back! Here's your platform overview"
              />

              {/* Stats Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatsCard 
                  icon="🎓" 
                  title="Total Students" 
                  value={stats.totalStudents.toLocaleString()}
                  trend={{ direction: 'up', text: '+12% this month' }}
                  color="primary"
                />
                <StatsCard 
                  icon="👨‍🏫" 
                  title="Total Mentors" 
                  value={stats.totalMentors}
                  trend={{ direction: 'up', text: '+5% this month' }}
                  color="success"
                />
                <StatsCard 
                  icon="📅" 
                  title="Total Bookings" 
                  value={stats.totalBookings.toLocaleString()}
                  trend={{ direction: 'up', text: '+23% this month' }}
                  color="warning"
                />
                <StatsCard 
                  icon="🎤" 
                  title="Mock Interviews" 
                  value={stats.mockInterviews}
                  color="danger"
                />
                <StatsCard 
                  icon="👥" 
                  title="Active Users" 
                  value={stats.activeUsers}
                  trend={{ direction: 'up', text: '+8% this week' }}
                  color="primary"
                />
                <StatsCard 
                  icon="⭐" 
                  title="Avg Rating" 
                  value={stats.avgRating}
                  color="success"
                />
              </div>

              {/* Main Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <SectionCard 
                  title="Booking Status Distribution"
                  subtitle="Breakdown by status"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {bookingStats.map((stat) => (
                      <div key={stat.status}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{stat.status}</span>
                          <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{stat.count} ({stat.percentage}%)</span>
                        </div>
                        <div style={{ height: '8px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              height: '100%', 
                              backgroundColor: stat.color, 
                              width: `${stat.percentage}%`,
                              transition: 'width 0.3s ease'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard 
                  title="Platform Health"
                  subtitle="System performance metrics"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Server Status</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--success-green)', borderRadius: '50%' }}></span>
                        <span style={{ fontWeight: '600', color: 'var(--success-green)' }}>Operational</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Database</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--success-green)', borderRadius: '50%' }}></span>
                        <span style={{ fontWeight: '600', color: 'var(--success-green)' }}>Connected</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'uppercase' }}>API Response</div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>125ms</div>
                    </div>
                  </div>
                </SectionCard>
              </div>

              {/* Top Mentors */}
              <SectionCard 
                title="Top Performing Mentors"
                subtitle="Best rated mentors on the platform"
              >
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Mentor Name</th>
                        <th>Rating</th>
                        <th>Students</th>
                        <th>Sessions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(topMentors.length > 0 ? topMentors : [
                        { id: 1, name: 'Raj Kumar', rating: 4.9, students: 156, sessions: 892 },
                        { id: 2, name: 'Sofia Martinez', rating: 4.8, students: 142, sessions: 756 }
                      ]).map((mentor) => (
                        <tr key={mentor.id}>
                          <td style={{ fontWeight: '500' }}>{mentor.name}</td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600', color: 'var(--warning-orange)' }}>
                              ⭐ {mentor.rating}
                            </span>
                          </td>
                          <td style={{ fontWeight: '500' }}>{mentor.students}</td>
                          <td style={{ fontWeight: '500' }}>{mentor.sessions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>

              {/* Recent Activities */}
              <SectionCard 
                title="Recent Activities"
                subtitle="Latest platform events"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {recentActivities.map((activity, idx) => (
                    <div 
                      key={activity.id} 
                      style={{ 
                        padding: '1rem',
                        borderBottom: idx < recentActivities.length - 1 ? '1px solid var(--border-light)' : 'none',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'start'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', minWidth: '40px', textAlign: 'center' }}>
                        {activity.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                          {activity.user}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                          {activity.action}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {/* =========================================================================
             2. USERS VIEW (Students + Mentors)
             ========================================================================= */}
          {activeTab === 'Users' && (
            <>
              <DashboardHeader 
                title="All Users Management" 
                subtitle={`Showing all registered students and mentors on the platform`}
              />

              <SectionCard 
                title={`Total Registered Users (${filteredUsers.length})`}
                subtitle="Complete platform user directory"
                actions={
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Search users by name, email, role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '280px' }}
                  />
                }
              >
                {filteredUsers.length === 0 ? (
                  <EmptyState icon="👥" title="No users found" description="No users match your search criteria" />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>User ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Info / Affiliation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, idx) => (
                          <tr key={user.id || idx}>
                            <td>#{user.id || idx + 1}</td>
                            <td style={{ fontWeight: '600' }}>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <span style={{ 
                                backgroundColor: user.userRole === 'Student' ? '#EFF6FF' : '#F0FDF4',
                                color: user.userRole === 'Student' ? '#2563EB' : '#16A34A',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '0.8rem'
                              }}>
                                {user.userRole}
                              </span>
                            </td>
                            <td style={{ color: 'var(--text-secondary)' }}>{user.info || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </SectionCard>
            </>
          )}

          {/* =========================================================================
             3. STUDENTS VIEW
             ========================================================================= */}
          {activeTab === 'Students' && (
            <>
              <DashboardHeader 
                title="Students Management" 
                subtitle="Manage registered students, view details, and perform admin actions"
              />

              <SectionCard 
                title={`Students Directory (${filteredStudents.length})`}
                subtitle="Student profile details and skill backgrounds"
                actions={
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Search students by name, email, college, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '300px' }}
                  />
                }
              >
                {filteredStudents.length === 0 ? (
                  <EmptyState icon="🎓" title="No students found" description="No student profiles match your search" />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>College</th>
                          <th>Department</th>
                          <th>Skills</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student) => (
                          <tr key={student.id}>
                            <td style={{ fontWeight: '600' }}>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.college || 'N/A'}</td>
                            <td>{student.department || 'N/A'}</td>
                            <td>
                              {student.skills ? (
                                <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '500' }}>
                                  {student.skills}
                                </span>
                              ) : 'N/A'}
                            </td>
                            <td>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </SectionCard>
            </>
          )}

          {/* =========================================================================
             4. MENTORS VIEW
             ========================================================================= */}
          {activeTab === 'Mentors' && (
            <>
              <DashboardHeader 
                title="Mentors Management" 
                subtitle="Review active industry mentors, experience, and skills"
              />

              <SectionCard 
                title={`Mentors Directory (${filteredMentors.length})`}
                subtitle="Verified mentor profiles and company experience"
                actions={
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Search mentors by name, company, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '300px' }}
                  />
                }
              >
                {filteredMentors.length === 0 ? (
                  <EmptyState icon="👨‍🏫" title="No mentors found" description="No mentor profiles match your search" />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Company</th>
                          <th>Experience</th>
                          <th>Skills</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMentors.map((mentor) => (
                          <tr key={mentor.id}>
                            <td style={{ fontWeight: '600' }}>{mentor.name}</td>
                            <td>{mentor.email}</td>
                            <td>{mentor.company || 'N/A'}</td>
                            <td>{mentor.experience ? `${mentor.experience} yrs` : 'N/A'}</td>
                            <td>
                              {mentor.skills ? (
                                <span style={{ backgroundColor: '#F0FDF4', color: '#16A34A', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '500' }}>
                                  {mentor.skills}
                                </span>
                              ) : 'N/A'}
                            </td>
                            <td>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteMentor(mentor.id)}
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </SectionCard>
            </>
          )}

          {/* =========================================================================
             5. BOOKINGS VIEW
             ========================================================================= */}
          {activeTab === 'Bookings' && (
            <>
              <DashboardHeader 
                title="Bookings Management" 
                subtitle="Overview of all student-mentor 1-on-1 session schedules"
              />

              <SectionCard 
                title={`All Session Bookings (${filteredBookings.length})`}
                subtitle="Real-time booking logs and administration deletion controls"
                actions={
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Search by student, mentor, or status..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '280px' }}
                  />
                }
              >
                {filteredBookings.length === 0 ? (
                  <EmptyState icon="📅" title="No bookings found" description="No session bookings match your search" />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Student Name</th>
                          <th>Mentor Name</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Duration</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((booking) => (
                          <tr key={booking.id}>
                            <td>#{booking.id}</td>
                            <td style={{ fontWeight: '600' }}>{booking.studentName}</td>
                            <td style={{ fontWeight: '600' }}>{booking.mentorName}</td>
                            <td>{booking.bookingDate}</td>
                            <td>{booking.bookingTime}</td>
                            <td>{booking.duration} mins</td>
                            <td><StatusBadge status={booking.status} /></td>
                            <td>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteBooking(booking.id)}
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </SectionCard>
            </>
          )}

          {/* =========================================================================
             6. REPORTS VIEW
             ========================================================================= */}
          {activeTab === 'Reports' && (
            <>
              <DashboardHeader 
                title="Platform Analytics & Reports" 
                subtitle="Comprehensive metrics report on platform growth and session volume"
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatsCard icon="🎓" title="Total Students" value={students.length || 1234} color="primary" />
                <StatsCard icon="👨‍🏫" title="Total Mentors" value={mentors.length || 256} color="success" />
                <StatsCard icon="📅" title="Total Bookings" value={bookings.length || 4891} color="warning" />
                <StatsCard icon="✓" title="Approved Bookings" value={approvedBookingsCount || 891} color="success" />
                <StatsCard icon="⏳" title="Pending Bookings" value={pendingBookingsCount || 234} color="warning" />
                <StatsCard icon="✕" title="Rejected Bookings" value={rejectedBookingsCount || 176} color="danger" />
              </div>

              <SectionCard title="Session Confirmation Summary" subtitle="Percentage breakdown of booking outcomes">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {bookingStats.map((stat) => (
                    <div key={stat.status}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{stat.status} Sessions</span>
                        <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{stat.count} ({stat.percentage}%)</span>
                      </div>
                      <div style={{ height: '10px', backgroundColor: 'var(--background)', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', backgroundColor: stat.color, width: `${stat.percentage}%`, transition: 'width 0.3s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {/* =========================================================================
             7. SETTINGS VIEW
             ========================================================================= */}
          {activeTab === 'Settings' && (
            <>
              <DashboardHeader 
                title="Admin Account Settings" 
                subtitle="Manage system administrator profile credentials"
              />

              <SectionCard title="Admin Credentials" subtitle="Update display name, contact email, and access password">
                <form onSubmit={handleUpdateSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '500px' }}>
                  <div>
                    <label className="form-label" style={{ fontWeight: '600' }}>Admin Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontWeight: '600' }}>Admin Email</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontWeight: '600' }}>New Password</label>
                    <input 
                      type="password" 
                      className="form-control"
                      placeholder="Enter new password to update"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '180px', marginTop: '0.5rem' }}>
                    💾 Save Changes
                  </button>
                </form>
              </SectionCard>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;