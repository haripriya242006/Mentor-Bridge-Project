import React from 'react';
import StatusBadge from './StatusBadge';

function BookingCard({ booking, role, onApprove, onReject, onChat }) {
  if (!booking) return null;

  const isStudent = role === 'STUDENT';
  const isMentor = role === 'MENTOR';
  const isPending = booking.status === 'PENDING';
  const isApproved = booking.status === 'APPROVED';

  const otherPartyName = isStudent ? booking.mentor?.name : booking.student?.name;

  return (
    <div className="card shadow-sm mb-3 animate-fade" style={{ marginBottom: 'var(--spacing-md)' }}>
      <div className="card-body">
        <div className="d-flex justify-between align-center flex-wrap gap-sm">
          <div>
            <span className="mentor-skills-label">{isStudent ? 'Mentor' : 'Student'}</span>
            <h4 style={{ margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>
              {otherPartyName || 'User'}
            </h4>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="mentor-card-meta" style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
          <div className="mentor-meta-item">
            <span className="mentor-meta-label">Date & Time</span>
            <span className="mentor-meta-value" style={{ fontSize: '0.85rem' }}>
              📅 {booking.bookingDate} at {booking.bookingTime}
            </span>
          </div>
          <div className="mentor-meta-item">
            <span className="mentor-meta-label">Duration</span>
            <span className="mentor-meta-value" style={{ fontSize: '0.85rem' }}>
              ⏱️ {booking.duration} Minutes
            </span>
          </div>
        </div>

        {booking.topic && (
          <div className="mb-3" style={{ marginBottom: 'var(--spacing-sm)' }}>
            <span className="mentor-skills-label">Topic</span>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {booking.topic}
            </p>
          </div>
        )}

        <div className="d-flex gap-sm justify-between" style={{ marginTop: 'var(--spacing-md)' }}>
          <div>
            {isMentor && isPending && (
              <div className="d-flex gap-sm">
                <button className="btn btn-success btn-sm" onClick={() => onApprove(booking.id)}>
                  ✓ Approve
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onReject(booking.id)}>
                  ✕ Reject
                </button>
              </div>
            )}
          </div>
          <div>
            {isApproved && onChat && (
              <button className="btn btn-primary btn-sm" onClick={() => onChat(booking.id)}>
                💬 Open Chat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
