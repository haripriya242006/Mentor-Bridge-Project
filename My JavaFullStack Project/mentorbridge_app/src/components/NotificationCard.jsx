import React from 'react';

function NotificationCard({ notification, onClick }) {
  const { message, time, unread } = notification;

  return (
    <div 
      className={`activity-item ${unread ? 'alert-info' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', width: '100%' }}
    >
      <div className="activity-icon">
        🔔
      </div>
      <div className="activity-content">
        <p className="activity-title" style={{ margin: 0, fontWeight: unread ? '700' : '500' }}>
          {message}
        </p>
        <span className="activity-time">{time}</span>
      </div>
      {unread && (
        <span 
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            alignSelf: 'center'
          }}
        />
      )}
    </div>
  );
}

export default NotificationCard;
