import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMentorData } from '../../features/mentor/hooks';
import DashboardCard from '../../components/DashboardCard';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

function MentorDashboard() {
  const navigate = useNavigate();
  const { mentor, requests, bookings, interviews, loading, error } = useMentorData();

  if (loading) {
    return <LoadingSpinner />;
  }

  const pendingRequestsCount = requests.length;
  const pendingBookings = bookings.filter(b => b.status === 'PENDING');
  const pendingInterviews = interviews.filter(i => i.status === 'PENDING');
  const activeBookings = bookings.filter(b => b.status === 'APPROVED');
  
  // Extract unique students
  const uniqueStudents = [...new Set(activeBookings.map(b => b.student?.id))];
  const studentsCount = uniqueStudents.length;

  return (
    <div className="animate-fade">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Welcome back, {mentor?.name || 'Mentor'}! 👋</h1>
          <p className="header-subtitle">Here is your mentorship board and student schedules overview.</p>
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
          icon="📬"
          title="Pending Requests"
          value={pendingRequestsCount}
          color="warning"
          onClick={() => navigate('/mentor/mentor-requests')}
        />
        <DashboardCard
          icon="📅"
          title="Pending Bookings"
          value={pendingBookings.length}
          color="primary"
          onClick={() => navigate('/mentor/bookings')}
        />
        <DashboardCard
          icon="🎤"
          title="Mock Interviews"
          value={pendingInterviews.length}
          color="danger"
          onClick={() => navigate('/mentor/mock-interviews')}
        />
        <DashboardCard
          icon="👥"
          title="My Students"
          value={studentsCount}
          color="success"
          onClick={() => navigate('/mentor/bookings')}
        />
      </div>

      {/* Grid of details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--spacing-lg)' }}>
        
        {/* Pending Bookings Panel */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Awaiting Session Confirmations</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/mentor/bookings')}>
              View Bookings
            </button>
          </div>
          <div className="section-body">
            {pendingBookings.length === 0 ? (
              <EmptyState
                icon="📅"
                title="No pending bookings"
                description="Students have scheduled all active sessions."
              />
            ) : (
              <div className="activity-list">
                {pendingBookings.slice(0, 3).map(booking => (
                  <div key={booking.id} className="activity-item">
                    <div className="activity-icon">📅</div>
                    <div className="activity-content">
                      <p className="activity-title">Request from {booking.student?.name}</p>
                      <p className="activity-description">
                        📅 {booking.bookingDate} at {booking.bookingTime} ({booking.duration} mins)
                      </p>
                      <StatusBadge status="PENDING" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending Mock Interviews Panel */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Mock Interview Schedule</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/mentor/mock-interviews')}>
              View Interviews
            </button>
          </div>
          <div className="section-body">
            {pendingInterviews.length === 0 ? (
              <EmptyState
                icon="🎤"
                title="No pending mock calls"
                description="Students have not requested any mock calls."
              />
            ) : (
              <div className="activity-list">
                {pendingInterviews.slice(0, 3).map(interview => (
                  <div key={interview.id} className="activity-item" style={{ borderLeftColor: 'var(--danger)' }}>
                    <div className="activity-icon">🎤</div>
                    <div className="activity-content">
                      <p className="activity-title">{interview.topic}</p>
                      <p className="activity-description">
                        Student: {interview.student?.name} on {interview.preferredDate} at {interview.preferredTime}
                      </p>
                      <StatusBadge status="PENDING" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Chats Panel */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Recent Chats</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/mentor/chat')}>
              Go to Chat
            </button>
          </div>
          <div className="section-body">
            {activeBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', color: 'var(--text-muted)' }}>
                No active conversations. Open chat panel once student sessions are approved.
              </div>
            ) : (
              <div className="activity-list">
                {activeBookings.slice(0, 2).map(booking => (
                  <div 
                    key={booking.id} 
                    className="activity-item" 
                    onClick={() => navigate('/mentor/chat')} 
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="activity-icon">💬</div>
                    <div className="activity-content">
                      <p className="activity-title" style={{ fontWeight: 600 }}>{booking.student?.name}</p>
                      <p className="activity-description">Discussion channel open.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default MentorDashboard;
