import React from 'react';

function ProfileCard({ profile, onEditClick, isStudent = true }) {
  if (!profile) return null;

  return (
    <div className="card shadow-sm animate-fade">
      <div className="card-body text-center" style={{ padding: 'var(--spacing-xl)' }}>
        <div 
          className="profile-avatar-large" 
          style={{ 
            width: '100px', 
            height: '100px', 
            fontSize: '3rem', 
            backgroundColor: isStudent ? 'var(--primary-light)' : 'var(--success-light)',
            color: isStudent ? 'var(--primary)' : 'var(--success-text)',
            marginBottom: 'var(--spacing-md)'
          }}
        >
          <span>{profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}</span>
        </div>

        <h3 className="header-title" style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>
          {profile.name}
        </h3>
        
        {!isStudent && profile.company && (
          <p className="mentor-card-company" style={{ justifyContent: 'center', marginBottom: 'var(--spacing-md)', fontSize: '0.95rem' }}>
            💼 {profile.company} {profile.experience ? `(${profile.experience} Exp)` : ''}
          </p>
        )}

        <p className="profile-email" style={{ marginBottom: 'var(--spacing-lg)', fontSize: '0.85rem' }}>
          📧 {profile.email}
        </p>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-lg)', textAlign: 'left' }}>
          {isStudent ? (
            <>
              <div className="mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="mentor-skills-label">College</span>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>{profile.college || 'Not Specified'}</p>
              </div>
              <div className="mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="mentor-skills-label">Department</span>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>{profile.department || 'Not Specified'}</p>
              </div>
              {profile.yearOfStudy && (
                <div className="mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <span className="mentor-skills-label">Year of Study</span>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>Year {profile.yearOfStudy}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="mentor-skills-label">Expertise Area</span>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>{profile.expertise || 'Not Specified'}</p>
              </div>
              <div className="mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="mentor-skills-label">Availability</span>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>{profile.availability || 'Not Specified'}</p>
              </div>
            </>
          )}

          <div className="mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
            <span className="mentor-skills-label">Skills</span>
            <div className="mentor-skills-list" style={{ marginTop: 'var(--spacing-xs)' }}>
              {profile.skills ? (
                profile.skills.split(',').map((skill, idx) => (
                  <span key={idx} className="skill-badge">
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No skills added yet</span>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
            {profile.githubUrl && (
              <a 
                href={profile.githubUrl.startsWith('http') ? profile.githubUrl : `https://${profile.githubUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-sm flex-1"
              >
                🐱 GitHub
              </a>
            )}
            {profile.linkedinUrl && (
              <a 
                href={profile.linkedinUrl.startsWith('http') ? profile.linkedinUrl : `https://${profile.linkedinUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-primary btn-sm flex-1"
              >
                🔗 LinkedIn
              </a>
            )}
          </div>
        </div>

        {onEditClick && (
          <button 
            className={`btn btn-${isStudent ? 'primary' : 'success'} btn-sm w-full`} 
            style={{ marginTop: 'var(--spacing-lg)' }}
            onClick={onEditClick}
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
