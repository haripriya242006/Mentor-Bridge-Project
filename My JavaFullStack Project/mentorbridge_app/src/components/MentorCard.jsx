import React from 'react';

function MentorCard({ mentor, onSendRequest, onBookSession, onMockInterview, onViewProfile }) {
  if (!mentor) return null;

  return (
    <div className="mentor-card animate-fade">
      <div className="mentor-card-header">
        <div className="mentor-card-avatar">
          <span>{mentor.name ? mentor.name.charAt(0).toUpperCase() : 'M'}</span>
        </div>
        <div className="mentor-card-rating">
          ⭐ {mentor.rating || '4.8'}
        </div>
      </div>

      <div className="mentor-card-body">
        <h4 className="mentor-card-name">{mentor.name}</h4>
        <p className="mentor-card-company">💼 {mentor.company || 'Industry Professional'}</p>

        <div className="mentor-card-meta">
          <div className="mentor-meta-item">
            <span className="mentor-meta-label">Experience</span>
            <span className="mentor-meta-value">{mentor.experience || 'N/A'}</span>
          </div>
          <div className="mentor-meta-item">
            <span className="mentor-meta-label">Availability</span>
            <span className="mentor-meta-value">{mentor.availability || 'Flexible'}</span>
          </div>
        </div>

        <div className="mentor-card-skills">
          <span className="mentor-skills-label">Skills</span>
          <div className="mentor-skills-list">
            {mentor.skills ? (
              mentor.skills.split(',').slice(0, 3).map((skill, idx) => (
                <span key={idx} className="skill-badge">
                  {skill.trim()}
                </span>
              ))
            ) : (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No skills specified</span>
            )}
          </div>
        </div>
      </div>

      <div className="mentor-card-footer">
        {onViewProfile && (
          <button className="btn btn-outline btn-sm" onClick={() => onViewProfile(mentor)}>
            👁️ View Info
          </button>
        )}
        {onSendRequest && (
          <button className="btn btn-primary btn-sm" onClick={() => onSendRequest(mentor.id)}>
            ✉️ Send Request
          </button>
        )}
        {onBookSession && (
          <button className="btn btn-outline-primary btn-sm" onClick={() => onBookSession(mentor.id)}>
            📅 Book Session
          </button>
        )}
        {onMockInterview && (
          <button className="btn btn-ghost btn-sm" onClick={() => onMockInterview(mentor)}>
            🎤 Mock Interview
          </button>
        )}
      </div>
    </div>
  );
}

export default MentorCard;
