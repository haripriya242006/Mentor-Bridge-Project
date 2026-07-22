import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Grid,
  Flex,
  EmptyState,
  Modal,
  Badge,
  Alert,
} from '../components/UIComponents';
import { useStudentData } from '../hooks';
import { useMockInterview } from '../hooks';
import styles from '../styles/Pages.module.css';

function MockInterviewPage() {
  const { student, interviews, mentors, fetchMentors, fetchInterviews } = useStudentData();
  const { requestInterview } = useMockInterview();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mentorId: '',
    topic: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestInterview = async () => {
    if (!formData.mentorId || !formData.topic || !formData.preferredDate || !formData.preferredTime) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await requestInterview(
      student.id,
      formData.mentorId,
      formData.topic,
      formData.preferredDate,
      formData.preferredTime
    );

    if (result.success) {
      setMessage('Mock interview requested successfully!');
      setShowRequestModal(false);
      setFormData({
        mentorId: '',
        topic: '',
        preferredDate: '',
        preferredTime: '',
      });
      fetchInterviews(student.id);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const pendingInterviews = interviews.filter(i => i.status === 'PENDING');
  const approvedInterviews = interviews.filter(i => i.status === 'APPROVED');
  const completedInterviews = interviews.filter(i => i.status === 'COMPLETED');

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Mock Interviews</h1>
          <p className={styles.pageSubtitle}>Practice interview skills with mentors</p>
        </div>
        <Button variant="primary" onClick={() => {
          fetchMentors();
          setShowRequestModal(true);
        }}>
          🎤 Request Interview
        </Button>
      </div>

      {message && (
        <Alert type="success" icon="✓" title="Success" message={message} onClose={() => setMessage('')} />
      )}

      {error && (
        <Alert type="error" icon="✕" title="Error" message={error} onClose={() => setError('')} />
      )}

      {/* Stats */}
      <Grid columns="auto-fit" minWidth="200px" gap="var(--spacing-lg)" style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <Card>
          <CardBody>
            <Flex direction="column" gap="var(--spacing-sm)" align="flex-start">
              <span style={{ fontSize: '1.5rem' }}>⏳</span>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Pending
              </p>
              <p style={{ margin: 0, fontSize: '1.875rem', fontWeight: 700 }}>{pendingInterviews.length}</p>
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex direction="column" gap="var(--spacing-sm)" align="flex-start">
              <span style={{ fontSize: '1.5rem' }}>✓</span>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Approved
              </p>
              <p style={{ margin: 0, fontSize: '1.875rem', fontWeight: 700 }}>{approvedInterviews.length}</p>
            </Flex>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Flex direction="column" gap="var(--spacing-sm)" align="flex-start">
              <span style={{ fontSize: '1.5rem' }}>✓✓</span>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Completed
              </p>
              <p style={{ margin: 0, fontSize: '1.875rem', fontWeight: 700 }}>{completedInterviews.length}</p>
            </Flex>
          </CardBody>
        </Card>
      </Grid>

      {/* Approved Interviews */}
      {approvedInterviews.length > 0 && (
        <Card style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <CardHeader title="Upcoming Interviews" subtitle={`${approvedInterviews.length} scheduled`} />
          <CardBody>
            <Flex direction="column" gap="var(--spacing-lg)">
              {approvedInterviews.map((interview) => (
                <div key={interview.id} className={styles.activityItem}>
                  <span className={styles.activityIcon}>🎤</span>
                  <div className={styles.activityContent} style={{ flex: 1 }}>
                    <h4 className={styles.activityTitle}>{interview.topic}</h4>
                    <p className={styles.activityDescription}>
                      {interview.preferredDate} at {interview.preferredTime}
                    </p>
                    <Flex gap="var(--spacing-md)">
                      {interview.meetingLink && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => window.open(interview.meetingLink, '_blank')}
                        >
                          🎥 Join Interview
                        </Button>
                      )}
                      <Badge status={interview.status} />
                    </Flex>
                  </div>
                </div>
              ))}
            </Flex>
          </CardBody>
        </Card>
      )}

      {/* Pending Interviews */}
      {pendingInterviews.length > 0 && (
        <Card style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <CardHeader title="Pending Interviews" subtitle={`${pendingInterviews.length} awaiting confirmation`} />
          <CardBody>
            <Flex direction="column" gap="var(--spacing-lg)">
              {pendingInterviews.map((interview) => (
                <div key={interview.id} className={styles.activityItem} style={{ borderLeftColor: 'var(--warning-orange)' }}>
                  <span className={styles.activityIcon}>⏳</span>
                  <div className={styles.activityContent} style={{ flex: 1 }}>
                    <h4 className={styles.activityTitle}>{interview.topic}</h4>
                    <p className={styles.activityDescription}>
                      Requested for {interview.preferredDate} at {interview.preferredTime}
                    </p>
                    <Badge status={interview.status} />
                  </div>
                </div>
              ))}
            </Flex>
          </CardBody>
        </Card>
      )}

      {/* Empty State */}
      {interviews.length === 0 && (
        <Card>
          <CardBody>
            <EmptyState
              icon="🎤"
              title="No mock interviews yet"
              description="Request a mock interview to practice and get feedback from experienced mentors"
              action={
                <Button
                  variant="primary"
                  onClick={() => {
                    fetchMentors();
                    setShowRequestModal(true);
                  }}
                >
                  🎤 Request Your First Interview
                </Button>
              }
            />
          </CardBody>
        </Card>
      )}

      {/* Request Modal */}
      <Modal
        isOpen={showRequestModal}
        title="Request Mock Interview"
        onClose={() => setShowRequestModal(false)}
        footer={
          <Flex gap="var(--spacing-md)">
            <Button variant="secondary" onClick={() => setShowRequestModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleRequestInterview}
              disabled={loading}
            >
              {loading ? '⏳ Requesting...' : '🎤 Request Interview'}
            </Button>
          </Flex>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Select Mentor
            </label>
            <select
              name="mentorId"
              value={formData.mentorId}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-family)',
              }}
            >
              <option value="">Choose a mentor...</option>
              {mentors.map(mentor => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name} ⭐ {mentor.rating || 4.8}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Interview Topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g., Java Full Stack Development"
          />

          <Input
            label="Preferred Date"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
          />

          <Input
            label="Preferred Time"
            name="preferredTime"
            type="time"
            value={formData.preferredTime}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </div>
  );
}

export default MockInterviewPage;
