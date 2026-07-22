import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Textarea,
  Alert,
} from '../components/UIComponents';
import { useStudentData } from '../hooks';
import { useMentorRequests } from '../hooks';
import styles from '../styles/Pages.module.css';

function MentorSearch() {
  const [searchParams] = useSearchParams();
  const { student, mentors, fetchMentors } = useStudentData();
  const { sendRequest } = useMentorRequests();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      fetchMentors(searchTerm);
    } else {
      fetchMentors();
    }
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchMentors(searchTerm);
    }
  };

  const openRequestModal = (mentor) => {
    setSelectedMentor(mentor);
    setShowRequestModal(true);
  };

  const handleSendRequest = async () => {
    if (!requestMessage.trim()) {
      setError('Please enter a message');
      return;
    }

    setLoading(true);
    const result = await sendRequest(student.id, selectedMentor.id, requestMessage);

    if (result.success) {
      setMessage(`Request sent to ${selectedMentor.name}!`);
      setShowRequestModal(false);
      setRequestMessage('');
      setSelectedMentor(null);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Find Mentors</h1>
          <p className={styles.pageSubtitle}>Connect with experienced professionals</p>
        </div>
      </div>

      {message && (
        <Alert type="success" icon="✓" title="Success" message={message} onClose={() => setMessage('')} />
      )}

      {error && (
        <Alert type="error" icon="✕" title="Error" message={error} onClose={() => setError('')} />
      )}

      {/* Search Bar */}
      <Card style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <CardBody>
          <Flex gap="var(--spacing-md)">
            <Input
              placeholder="Search by name, skills, expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
              label=""
            />
            <Button
              variant="primary"
              onClick={() => fetchMentors(searchTerm)}
              style={{ alignSelf: 'flex-end' }}
            >
              🔍 Search
            </Button>
          </Flex>
        </CardBody>
      </Card>

      {/* Mentors Grid */}
      {mentors.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No mentors found"
          description="Try searching with different keywords or browse all available mentors"
          action={
            <Button
              variant="primary"
              onClick={() => {
                setSearchTerm('');
                fetchMentors();
              }}
            >
              View All Mentors
            </Button>
          }
        />
      ) : (
        <Grid columns="auto-fill" minWidth="280px">
          {mentors.map((mentor) => (
            <Card key={mentor.id}>
              <CardBody>
                <Flex direction="column" gap="var(--spacing-md)">
                  {/* Header */}
                  <Flex justify="space-between" align="start">
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>
                        {mentor.name}
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                        {mentor.expertise || 'Full Stack Developer'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--warning-orange)' }}>
                        ⭐ {mentor.rating || 4.8}
                      </div>
                    </div>
                  </Flex>

                  {/* Meta Info */}
                  <div>
                    {mentor.company && (
                      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        🏢 {mentor.company}
                      </p>
                    )}
                    {mentor.experience && (
                      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        👨‍💼 {mentor.experience}
                      </p>
                    )}
                    {mentor.availability && (
                      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        📅 {mentor.availability}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  {mentor.skills && (
                    <div>
                      <p style={{ margin: '0.5rem 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                        Skills
                      </p>
                      <Flex gap="var(--spacing-xs)" style={{ flexWrap: 'wrap' }}>
                        {mentor.skills.split(',').slice(0, 3).map((skill, idx) => (
                          <span key={idx} className={styles.skillBadge}>
                            {skill.trim()}
                          </span>
                        ))}
                        {mentor.skills.split(',').length > 3 && (
                          <span className={styles.skillBadge}>
                            +{mentor.skills.split(',').length - 3}
                          </span>
                        )}
                      </Flex>
                    </div>
                  )}

                  {/* Actions */}
                  <Flex direction="column" gap="var(--spacing-sm)" style={{ marginTop: 'auto' }}>
                    <Button
                      variant="primary"
                      block
                      onClick={() => openRequestModal(mentor)}
                    >
                      👤 Send Request
                    </Button>
                    <Button
                      variant="outline"
                      block
                      onClick={() => window.open(`#/mentor/${mentor.id}`, '_blank')}
                    >
                      📋 View Profile
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}

      {/* Request Modal */}
      <Modal
        isOpen={showRequestModal}
        title={`Connect with ${selectedMentor?.name}`}
        onClose={() => {
          setShowRequestModal(false);
          setRequestMessage('');
        }}
        footer={
          <Flex gap="var(--spacing-md)">
            <Button
              variant="secondary"
              onClick={() => {
                setShowRequestModal(false);
                setRequestMessage('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSendRequest}
              disabled={loading || !requestMessage.trim()}
            >
              {loading ? '⏳ Sending...' : '📤 Send Request'}
            </Button>
          </Flex>
        }
      >
        <Textarea
          label="Message"
          placeholder="Tell the mentor why you'd like to connect..."
          value={requestMessage}
          onChange={(e) => setRequestMessage(e.target.value)}
          rows={4}
        />
      </Modal>
    </div>
  );
}

export default MentorSearch;
