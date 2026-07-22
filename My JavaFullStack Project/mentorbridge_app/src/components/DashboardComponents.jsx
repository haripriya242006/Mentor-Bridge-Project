import React from 'react';
import '../styles/layout.css';

export const DashboardLayout = ({ children, role }) => {
  return (
    <div className="app-wrapper">
      <div className="app-main">
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export const DashboardHeader = ({ title, subtitle, rightContent }) => {
  return (
    <div className="dashboard-header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
      {rightContent && <div className="header-right">{rightContent}</div>}
    </div>
  );
};

export const StatsCard = ({ icon, title, value, trend, color = 'primary' }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <p className="stats-label">{title}</p>
        <div className="stats-value-wrapper">
          <h3 className="stats-value">{value}</h3>
          {trend && <span className={`stats-trend ${trend.direction}`}>{trend.text}</span>}
        </div>
      </div>
    </div>
  );
};

export const SectionCard = ({ title, subtitle, children, actions, noPadding = false }) => {
  return (
    <div className="section-card">
      {(title || actions) && (
        <div className="section-header">
          <div>
            <h3 className="section-title">{title}</h3>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="section-actions">{actions}</div>}
        </div>
      )}
      <div className={`section-body ${noPadding ? 'no-padding' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export const MentorCard = ({ mentor, onSendRequest, onBook, onRequestInterview }) => {
  return (
    <div className="mentor-card">
      <div className="mentor-header">
        <div className="mentor-avatar">
          <span>👤</span>
        </div>
        <div className="mentor-rating">
          <span className="stars">⭐</span>
          <span className="rating-value">{mentor.rating || 'N/A'}</span>
        </div>
      </div>

      <div className="mentor-info">
        <h4 className="mentor-name">{mentor.name}</h4>
        <p className="mentor-company">{mentor.company}</p>

        <div className="mentor-meta">
          <div className="meta-item">
            <span className="meta-label">Experience</span>
            <span className="meta-value">{mentor.experience}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Availability</span>
            <span className="meta-value">{mentor.availability}</span>
          </div>
        </div>

        <div className="mentor-skills">
          <span className="skills-label">Skills</span>
          <div className="skills-list">
            {mentor.skills?.split(',')?.slice(0, 3)?.map((skill, idx) => (
              <span key={idx} className="skill-badge">{skill.trim()}</span>
            ))}
          </div>
        </div>

        <div className="mentor-expertise">
          <span className="expertise-label">Expertise</span>
          <p className="expertise-value">{mentor.expertise}</p>
        </div>
      </div>

      <div className="mentor-actions">
        <button className="btn btn-primary btn-sm" onClick={() => onSendRequest(mentor.id)}>
          <span>✉️</span> Send Request
        </button>
        <button className="btn btn-outline-primary btn-sm" onClick={() => onBook(mentor.id)}>
          <span>📅</span> Book Session
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => onRequestInterview(mentor.id)}>
          <span>🎤</span> Interview
        </button>
      </div>
    </div>
  );
};

export const StatusBadge = ({ status, size = 'md' }) => {
  const getStatusClass = () => {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return 'status-approved';
      case 'PENDING':
        return 'status-pending';
      case 'REJECTED':
        return 'status-rejected';
      case 'COMPLETED':
        return 'status-completed';
      default:
        return 'status-default';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()} ${size}`}>
      {status}
    </span>
  );
};

export const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon">{icon}</div>
      <h4 className="empty-state-title">{title}</h4>
      <p className="empty-state-description">{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export const DataTable = ({ headers, rows, onRowClick }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center text-muted py-4">
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={idx} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{cell}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
