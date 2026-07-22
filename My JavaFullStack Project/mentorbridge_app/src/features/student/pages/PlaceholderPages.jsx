import React from 'react';
import { Card, CardHeader, CardBody, EmptyState, Button } from '../components/UIComponents';
import styles from '../styles/Pages.module.css';

export function MessagesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Messages</h1>
          <p className={styles.pageSubtitle}>Chat with your mentors</p>
        </div>
      </div>

      <Card>
        <CardBody>
          <EmptyState
            icon="💬"
            title="Messages Coming Soon"
            description="Chat functionality will be available soon. For now, use email to communicate with your mentors."
            action={
              <Button variant="primary">📧 Contact Support</Button>
            }
          />
        </CardBody>
      </Card>
    </div>
  );
}

export function NotificationsPage() {
  const notifications = [
    { id: 1, message: 'New mentor request', time: '2 mins ago', icon: '👤' },
    { id: 2, message: 'Your booking was approved', time: '1 hour ago', icon: '✓' },
    { id: 3, message: 'Mock interview scheduled', time: '3 hours ago', icon: '🎤' },
    { id: 4, message: 'Resume feedback received', time: '1 day ago', icon: '📄' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Notifications</h1>
          <p className={styles.pageSubtitle}>Stay updated with your progress</p>
        </div>
      </div>

      <Card>
        <CardHeader title="All Notifications" subtitle={`${notifications.length} notifications`} />
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--background)',
                  borderRadius: 'var(--radius-md)',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{notif.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-dark)' }}>
                    {notif.message}
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    {notif.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Manage your preferences</p>
        </div>
      </div>

      <Card style={{ maxWidth: '600px' }}>
        <CardHeader title="Preferences" />
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div style={{ paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-light)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Email Notifications</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Receive booking confirmations</span>
              </label>
            </div>

            <div style={{ paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-light)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Theme</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', cursor: 'pointer' }}>
                <input type="radio" name="theme" defaultChecked />
                <span>Light Mode</span>
              </label>
            </div>

            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Account</h3>
              <Button variant="danger" size="sm">
                🚪 Logout
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SettingsPage;
