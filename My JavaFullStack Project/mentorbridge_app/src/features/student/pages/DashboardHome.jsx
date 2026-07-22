import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Grid,
  StatsCard,
  EmptyState,
  Flex,
  Badge,
} from '../components/UIComponents';
import { useStudentData } from '../hooks';
import styles from '../styles/Pages.module.css';

function DashboardHome() {
  const navigate = useNavigate();
  const { student, bookings, interviews, mentors, loading, error } = useStudentData();
  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  useEffect(() => {
    if (bookings.length > 0) {
      setRecentBookings(bookings.slice(0, 3));
    }
    if (interviews.length > 0) {
      setUpcomingInterviews(interviews.filter(i => i.status === 'APPROVED').slice(0, 3));
    }
  }, [bookings, interviews]);

  const stats = [
    {
      icon: '👨‍🏫',
      title: 'Available Mentors',
      value: mentors.length,
      color: 'primary',
    },
    {
      icon: '📅',
      title: 'Upcoming Sessions',
      value: bookings.filter(b => b.status === 'APPROVED').length,
      color: 'success',
    },
    {
      icon: '🎤',
      title: 'Mock Interviews',
      value: interviews.length,
      color: 'warning',
    },
    {
      icon: '📊',
      title: 'Progress',
      value: '75%',
      color: 'danger',
    },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>
            Welcome back, {student?.name || 'Student'}! 👋
          </h1>
          <p className={styles.pageSubtitle}>
            Keep progressing with your learning journey
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className={styles.alert} style={{ backgroundColor: '#fef2f2', borderColor: 'var(--danger-red)' }}>
          <span>✕</span>
          <div>{error}</div>
        </div>
      )}

      {/* Stats Grid */}
      <Grid columns="auto-fit" minWidth="250px">
        {stats.map((stat, idx) => (
          <StatsCard
            key={idx}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </Grid>

      {/* Recent Bookings */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Bookings</h2>
        <Card>
          <CardHeader
            title="Upcoming Sessions"
            subtitle={`${bookings.filter(b => b.status === 'APPROVED').length} approved`}
            actions={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/student/dashboard/bookings')}
              >
                View All →
              </Button>
            }
          />
          <CardBody>
            {recentBookings.length === 0 ? (
              <EmptyState
                icon="📅"
                title="No bookings yet"
                description="Start by finding a mentor and booking a session"
                action={
                  <Button
                    variant="primary"
                    onClick={() => navigate('/student/dashboard/mentors')}
                  >
                    Find Mentors
                  </Button>
                }
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {recentBookings.map((booking) => (
                  <div key={booking.id} className={styles.activityItem}>
                    <span className={styles.activityIcon}>📅</span>
                    <div className={styles.activityContent}>
                      <h4 className={styles.activityTitle}>
                        Session with {booking.mentor?.name}
                      </h4>
                      <p className={styles.activityDescription}>
                        {booking.bookingDate} at {booking.bookingTime} • {booking.duration} min
                      </p>
                      <Badge status={booking.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Mock Interviews</h2>
        <Card>
          <CardHeader
            title="Mock Interview Schedule"
            subtitle={`${upcomingInterviews.length} scheduled`}
            actions={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/student/dashboard/interviews')}
              >
                View All →
              </Button>
            }
          />
          <CardBody>
            {upcomingInterviews.length === 0 ? (
              <EmptyState
                icon="🎤"
                title="No interviews scheduled"
                description="Request a mock interview to practice your interview skills"
                action={
                  <Button
                    variant="primary"
                    onClick={() => navigate('/student/dashboard/interviews')}
                  >
                    Request Interview
                  </Button>
                }
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className={styles.activityItem}>
                    <span className={styles.activityIcon}>🎤</span>
                    <div className={styles.activityContent}>
                      <h4 className={styles.activityTitle}>{interview.topic}</h4>
                      <p className={styles.activityDescription}>
                        {interview.preferredDate} at {interview.preferredTime}
                      </p>
                      {interview.meetingLink && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => window.open(interview.meetingLink, '_blank')}
                        >
                          🎥 Join Interview
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <Grid columns="auto-fit" minWidth="280px">
          <Card>
            <CardBody>
              <Flex direction="column" gap="var(--spacing-md)" align="flex-start">
                <span style={{ fontSize: '2rem' }}>🔍</span>
                <h3 style={{ margin: 0, fontWeight: 600 }}>Find Mentors</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Browse and connect with experienced mentors
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/student/dashboard/mentors')}
                >
                  Explore Mentors
                </Button>
              </Flex>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Flex direction="column" gap="var(--spacing-md)" align="flex-start">
                <span style={{ fontSize: '2rem' }}>📄</span>
                <h3 style={{ margin: 0, fontWeight: 600 }}>Upload Resume</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Get feedback from mentors on your resume
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/student/dashboard/resume')}
                >
                  Upload Resume
                </Button>
              </Flex>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Flex direction="column" gap="var(--spacing-md)" align="flex-start">
                <span style={{ fontSize: '2rem' }}>👤</span>
                <h3 style={{ margin: 0, fontWeight: 600 }}>Edit Profile</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Update your profile and showcase your skills
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/student/dashboard/profile')}
                >
                  Edit Profile
                </Button>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      </div>
    </div>
  );
}

export default DashboardHome;
