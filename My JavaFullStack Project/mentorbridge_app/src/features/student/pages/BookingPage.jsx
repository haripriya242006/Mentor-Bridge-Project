import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  Grid,
  Flex,
  EmptyState,
  Badge,
  Alert,
} from '../components/UIComponents';
import { useStudentData } from '../hooks';
import styles from '../styles/Pages.module.css';

function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { student, bookings } = useStudentData();
  const [filter, setFilter] = useState('all');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    let filtered = bookings;
    if (filter !== 'all') {
      filtered = bookings.filter(b => b.status === filter);
    }
    setFilteredBookings(filtered);
  }, [bookings, filter]);

  const bookingStats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📊' },
    { label: 'Approved', value: bookings.filter(b => b.status === 'APPROVED').length, icon: '✓' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'PENDING').length, icon: '⏳' },
    { label: 'Cancelled', value: bookings.filter(b => b.status === 'CANCELLED').length, icon: '✕' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Your Bookings</h1>
          <p className={styles.pageSubtitle}>Manage your mentor sessions</p>
        </div>
        <button
          className={`btn btn-primary ${styles.bookingButton}`}
          onClick={() => navigate('/student/dashboard/bookings/new')}
        >
          <i className="bi bi-calendar-plus"></i> + New Booking
        </button>
      </div>

      {message && (
        <Alert type="success" icon="✓" title="Success" message={message} onClose={() => setMessage('')} />
      )}

      {/* Stats */}
      <Grid columns="auto-fit" minWidth="200px" gap="var(--spacing-lg)">
        {bookingStats.map((stat, idx) => (
          <Card key={idx}>
            <CardBody>
              <Flex direction="column" gap="var(--spacing-sm)" align="flex-start">
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  {stat.label}
                </p>
                <p style={{ margin: 0, fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  {stat.value}
                </p>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Filters */}
      <Card style={{ marginTop: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-2xl)' }}>
        <CardBody>
          <Flex gap="var(--spacing-md)" style={{ flexWrap: 'wrap' }}>
            {['all', 'PENDING', 'APPROVED', 'CANCELLED'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status === 'all' ? 'All Bookings' : status}
              </Button>
            ))}
          </Flex>
        </CardBody>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader
          title="Booking History"
          subtitle={`${filteredBookings.length} booking${filteredBookings.length !== 1 ? 's' : ''}`}
        />
        <CardBody>
          {filteredBookings.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No bookings"
              description={filter === 'all' ? 'Book a session with a mentor to get started' : `No ${filter.toLowerCase()} bookings`}
            />
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Mentor</th>
                    <th className={styles.tableHeaderCell}>Date</th>
                    <th className={styles.tableHeaderCell}>Time</th>
                    <th className={styles.tableHeaderCell}>Duration</th>
                    <th className={styles.tableHeaderCell}>Status</th>
                    <th className={styles.tableHeaderCell}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <strong>{booking.mentor?.name}</strong>
                      </td>
                      <td className={styles.tableCell}>{booking.bookingDate}</td>
                      <td className={styles.tableCell}>{booking.bookingTime}</td>
                      <td className={styles.tableCell}>{booking.duration} min</td>
                      <td className={styles.tableCell}>
                        <Badge status={booking.status} />
                      </td>
                      <td className={styles.tableCell}>
                        {booking.status === 'APPROVED' ? (
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => navigate('/student/dashboard/messages', { state: { bookingId: booking.id } })}
                          >
                            💬 Chat
                          </Button>
                        ) : (
                          <span style={{ color: 'var(--text-tertiary)' }}>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default BookingPage;
