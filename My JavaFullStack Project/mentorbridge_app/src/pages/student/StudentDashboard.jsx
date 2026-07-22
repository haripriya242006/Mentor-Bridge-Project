import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentData } from '../../features/student/hooks';
import DashboardCard from '../../components/DashboardCard';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentDashboard() {
  const navigate = useNavigate();
  const { student, bookings, resume, interviews, mentors, loading, error } = useStudentData();

  if (loading) {
    return <LoadingSpinner />;
  }

  const upcomingBookings = bookings.filter(b => b.status === 'APPROVED');
  const pendingRequests = bookings.filter(b => b.status === 'PENDING');
  const recentFeedback = resume?.feedback || interviews.find(i => i.feedback)?.feedback || 'No feedback received yet.';

  return (
    <div className="animate-fade">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Welcome back, {student?.name || 'Student'}! 👋</h1>
          <p className="header-subtitle">Here is your learning overview and upcoming activities.</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {error}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <DashboardCard
          icon="🎓"
          title="Total Mentors"
          value={mentors?.length || 0}
          color="primary"
          onClick={() => navigate('/student/mentors')}
        />
        <DashboardCard
          icon="📅"
          title="Upcoming Sessions"
          value={upcomingBookings.length}
          color="success"
          onClick={() => navigate('/student/bookings')}
        />
        <DashboardCard
          icon="📄"
          title="Resume Review"
          value={resume ? (resume.feedback ? 'Reviewed' : 'Submitted') : 'Not Uploaded'}
          color="warning"
          onClick={() => navigate('/student/resume')}
        />
        <DashboardCard
          icon="🎤"
          title="Mock Interviews"
          value={interviews.length}
          color="danger"
          onClick={() => navigate('/student/mock-interviews')}
        />
      </div>

      {/* Widgets Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-lg)' }}>
        
        {/* Upcoming Bookings Widget */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Upcoming Bookings</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/student/bookings')}>
              View All
            </button>
          </div>
          <div className="section-body">
            {upcomingBookings.length === 0 ? (
              <EmptyState
                icon="📅"
                title="No upcoming sessions"
                description="Book a session with a mentor to get started."
                action={
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/student/mentors')}>
                    Find Mentors
                  </button>
                }
              />
            ) : (
              <div className="activity-list">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="activity-item">
                    <div className="activity-icon">📅</div>
                    <div className="activity-content">
                      <p className="activity-title">Session with {booking.mentor?.name}</p>
                      <p className="activity-description">
                        {booking.bookingDate} at {booking.bookingTime} ({booking.duration} mins)
                      </p>
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Latest Messages Widget */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Latest Messages</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/student/chat')}>
              Go to Chat
            </button>
          </div>
          <div className="section-body">
            {upcomingBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', color: 'var(--text-muted)' }}>
                No active chat sessions. Approve a booking first to message.
              </div>
            ) : (
              <div className="activity-list">
                {upcomingBookings.slice(0, 2).map((booking) => (
                  <div 
                    key={booking.id} 
                    className="activity-item" 
                    onClick={() => navigate(`/student/chat`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="activity-icon">💬</div>
                    <div className="activity-content">
                      <p className="activity-title" style={{ fontWeight: 600 }}>{booking.mentor?.name}</p>
                      <p className="activity-description">Click to open chat session.</p>
                      <span className="activity-time">Active Conversation</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Feedback Widget */}
        <div className="section-card" style={{ gridColumn: 'span 1' }}>
          <div className="section-header">
            <h3 className="section-title">Recent Feedback</h3>
          </div>
          <div className="section-body">
            <div className="alert alert-success" style={{ display: 'block', margin: 0 }}>
              <strong>Feedback Summary:</strong>
              <p style={{ marginTop: 'var(--spacing-xs)', fontSize: '0.875rem' }}>{recentFeedback}</p>
            </div>
          </div>
        </div>

        {/* System Notifications Widget */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Latest Notifications</h3>
          </div>
          <div className="section-body">
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🔔</div>
                <div className="activity-content">
                  <p className="activity-title">Welcome to MentorBridge!</p>
                  <p className="activity-description">Explore the new redesigned dashboards.</p>
                  <span className="activity-time">Just now</span>
                </div>
              </div>
              {pendingRequests.length > 0 && (
                <div className="activity-item alert-warning">
                  <div className="activity-icon">⏳</div>
                  <div className="activity-content">
                    <p className="activity-title">Pending Bookings</p>
                    <p className="activity-description">You have {pendingRequests.length} bookings pending approval.</p>
                    <span className="activity-time">Awaiting mentor reply</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default StudentDashboard;
