import React from 'react';
import StatusBadge from './StatusBadge';

function InterviewCard({ 
  interview, 
  role, 
  onApprove, 
  onReject, 
  meetingLink, 
  onMeetingLinkChange,
  onAddFeedback,
  feedbackText,
  onFeedbackTextChange
}) {
  if (!interview) return null;

  const isStudent = role === 'STUDENT';
  const isMentor = role === 'MENTOR';
  const isPending = interview.status === 'PENDING';
  const isApproved = interview.status === 'APPROVED';
  const isCompleted = interview.status === 'COMPLETED';

  return (
    <div className="card shadow-sm mb-3 animate-fade" style={{ marginBottom: 'var(--spacing-md)' }}>
      <div className="card-body">
        <div className="d-flex justify-between align-center flex-wrap gap-sm">
          <div>
            <span className="mentor-skills-label">{isStudent ? 'Mentor' : 'Student'}</span>
            <h4 style={{ margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>
              {isStudent ? interview.mentor?.name : interview.student?.name}
            </h4>
          </div>
          <StatusBadge status={interview.status} />
        </div>

        <div className="mentor-card-meta" style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
          <div className="mentor-meta-item">
            <span className="mentor-meta-label">Topic</span>
            <span className="mentor-meta-value">{interview.topic}</span>
          </div>
          <div className="mentor-meta-item">
            <span className="mentor-meta-label">Date & Time</span>
            <span className="mentor-meta-value">
              📅 {interview.preferredDate} at {interview.preferredTime}
            </span>
          </div>
        </div>

        {interview.meetingLink && (isApproved || isCompleted) && (
          <div className="alert alert-info" style={{ padding: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
            🎥 <strong>Meeting Link:</strong>{' '}
            <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
              Join Call
            </a>
          </div>
        )}

        {interview.feedback && (
          <div 
            className="alert alert-success" 
            style={{ 
              display: 'block', 
              padding: 'var(--spacing-md)', 
              marginTop: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-md)' 
            }}
          >
            <strong>💬 Mentor Feedback:</strong>
            <p style={{ margin: 'var(--spacing-xs) 0 0 0', fontSize: '0.85rem' }}>{interview.feedback}</p>
          </div>
        )}

        {/* Mentor Action Form: Link submission and approval */}
        {isMentor && isPending && (
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <div className="form-group" style={{ marginBottom: 'var(--spacing-md)' }}>
              <label className="form-label">Meeting Link (Zoom, Teams, Meet)</label>
              <input
                type="text"
                className="form-control"
                placeholder="https://meet.google.com/..."
                value={meetingLink || ''}
                onChange={(e) => onMeetingLinkChange(interview.id, e.target.value)}
              />
            </div>
            <div className="d-flex gap-sm">
              <button 
                className="btn btn-success btn-sm"
                onClick={() => onApprove(interview.id)}
              >
                ✓ Approve Request
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => onReject(interview.id)}
              >
                ✕ Reject
              </button>
            </div>
          </div>
        )}

        {/* Mentor Action Form: Feedback submission for completed interviews */}
        {isMentor && isApproved && onAddFeedback && (
          <div style={{ marginTop: 'var(--spacing-md)', borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-md)' }}>
            <div className="form-group" style={{ marginBottom: 'var(--spacing-md)' }}>
              <label className="form-label">Add Mock Interview Feedback</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Share your review, feedback, performance suggestions..."
                value={feedbackText || ''}
                onChange={(e) => onFeedbackTextChange(interview.id, e.target.value)}
              />
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onAddFeedback(interview.id)}
            >
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;
