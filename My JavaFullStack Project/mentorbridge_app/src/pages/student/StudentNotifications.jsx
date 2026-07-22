import React, { useState } from 'react';
import NotificationCard from '../../components/NotificationCard';
import EmptyState from '../../components/EmptyState';

function StudentNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New message from Sarah', time: '5 min ago', unread: true },
    { id: 2, message: 'Your booking has been approved', time: '1 hour ago', unread: true },
    { id: 3, message: 'Mock interview feedback added', time: '1 day ago', unread: false },
    { id: 4, message: 'Welcome to MentorBridge!', time: '2 days ago', unread: false }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleCardClick = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Notifications</h1>
          <p className="header-subtitle">Stay updated with messages, reviews, and bookings activity.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={handleMarkAllRead}>
          Mark All Read
        </button>
      </div>

      <div className="section-card">
        <div className="section-body">
          {notifications.length === 0 ? (
            <EmptyState
              icon="🔔"
              title="No Notifications"
              description="We will notify you here when new actions are taken."
            />
          ) : (
            <div className="activity-list">
              {notifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  notification={notif}
                  onClick={() => handleCardClick(notif.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentNotifications;
