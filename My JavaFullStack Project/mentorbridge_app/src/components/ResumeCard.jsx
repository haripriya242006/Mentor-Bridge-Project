import React from 'react';

function ResumeCard({ resume, onDownload, onUploadNew }) {
  if (!resume) return null;

  return (
    <div className="card shadow-sm animate-fade">
      <div className="card-header">
        <h3 className="card-title">Uploaded Resume</h3>
      </div>
      <div className="card-body">
        <div 
          className="activity-item" 
          style={{ 
            backgroundColor: 'var(--success-light)', 
            borderColor: 'rgba(16, 185, 129, 0.2)', 
            marginBottom: 'var(--spacing-lg)' 
          }}
        >
          <div className="activity-icon" style={{ color: 'var(--success)', fontSize: '1.25rem' }}>
            📄
          </div>
          <div className="activity-content">
            <p className="activity-title" style={{ color: 'var(--success-text)' }}>
              {resume.fileName || 'resume.pdf'}
            </p>
            <span className="activity-time">Verified & Uploaded</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          {onDownload && (
            <button className="btn btn-outline flex-1" onClick={onDownload}>
              📥 Download
            </button>
          )}
          {onUploadNew && (
            <button className="btn btn-secondary flex-1" onClick={onUploadNew}>
              🔄 Upload New
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeCard;
