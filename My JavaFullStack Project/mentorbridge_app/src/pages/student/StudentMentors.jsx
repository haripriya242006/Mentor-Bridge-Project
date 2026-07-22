import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStudentData, useMentorRequests, useMockInterview } from '../../features/student/hooks';
import MentorCard from '../../components/MentorCard';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import ProfileCard from '../../components/ProfileCard';

function StudentMentors() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { student, mentors, loading, error, fetchMentors } = useStudentData();
  const { sendRequest } = useMentorRequests();
  const { requestInterview } = useMockInterview();

  // Search & Filter State
  const [keyword, setKeyword] = useState(initialSearch);
  const [filterSkills, setFilterSkills] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterExp, setFilterExp] = useState('');
  const [filterRating, setFilterRating] = useState('');

  // Modals state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMentorId, setRequestMentorId] = useState(null);
  const [requestMsg, setRequestMsg] = useState('Hello! I would love to connect with you on MentorBridge.');

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewMentor, setInterviewMentor] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    topic: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [showViewProfileModal, setShowViewProfileModal] = useState(false);
  const [viewedMentor, setViewedMentor] = useState(null);

  const [statusMsg, setStatusMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMentors(initialSearch);
  }, [initialSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMentors(keyword);
  };

  // Client-side filtration
  const filteredMentors = mentors.filter(mentor => {
    if (filterSkills && !mentor.skills?.toLowerCase().includes(filterSkills.toLowerCase())) return false;
    if (filterCompany && !mentor.company?.toLowerCase().includes(filterCompany.toLowerCase())) return false;
    if (filterExp && parseFloat(mentor.experience) < parseFloat(filterExp)) return false;
    if (filterRating && parseFloat(mentor.rating || 0) < parseFloat(filterRating)) return false;
    return true;
  });

  const handleSendRequestSubmit = async () => {
    setSubmitting(true);
    const res = await sendRequest(student.id, requestMentorId, requestMsg);
    setSubmitting(false);
    setShowRequestModal(false);
    if (res.success) {
      setStatusMsg('Connection request sent successfully!');
      setTimeout(() => setStatusMsg(''), 3000);
    } else {
      alert(res.error || 'Failed to send request');
    }
  };

  const handleSendInterviewSubmit = async () => {
    if (!interviewForm.topic || !interviewForm.preferredDate || !interviewForm.preferredTime) {
      alert('Please fill in all interview fields');
      return;
    }
    setSubmitting(true);
    const res = await requestInterview(
      student.id,
      interviewMentor.id,
      interviewForm.topic,
      interviewForm.preferredDate,
      interviewForm.preferredTime
    );
    setSubmitting(false);
    setShowInterviewModal(false);
    if (res.success) {
      setStatusMsg('Mock Interview requested successfully!');
      setInterviewForm({ topic: '', preferredDate: '', preferredTime: '' });
      setTimeout(() => setStatusMsg(''), 3000);
    } else {
      alert(res.error || 'Failed to send interview request');
    }
  };

  return (
    <div className="animate-fade">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Find Mentors</h1>
          <p className="header-subtitle">Search, filter, and connect with top industry specialists.</p>
        </div>
      </div>

      {statusMsg && (
        <div className="alert alert-success" style={{ marginBottom: 'var(--spacing-lg)' }}>
          {statusMsg}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 'var(--spacing-lg)' }}>
          {error}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="card shadow-sm" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="card-body">
          <form onSubmit={handleSearchSubmit} className="flex-col gap-md">
            {/* Search Input */}
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <div className="search-container" style={{ margin: 0, flex: 1 }}>
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by mentor name, skill, company..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>

            {/* Advanced Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Skills</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Java, Python"
                  value={filterSkills}
                  onChange={(e) => setFilterSkills(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Company</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Google, Amazon"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Min Experience (Years)</label>
                <select
                  className="form-select"
                  value={filterExp}
                  onChange={(e) => setFilterExp(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="2">2+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Min Rating</label>
                <select
                  className="form-select"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="4.0">⭐ 4.0+</option>
                  <option value="4.5">⭐ 4.5+</option>
                  <option value="4.8">⭐ 4.8+</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Mentors Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredMentors.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No Mentors Found"
          description="Try broadening your search keywords or resetting your filter criteria."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onSendRequest={(id) => {
                setRequestMentorId(id);
                setShowRequestModal(true);
              }}
              onBookSession={(id) => navigate(`/student/bookings?mentorId=${id}`)}
              onMockInterview={(mentorObj) => {
                setInterviewMentor(mentorObj);
                setShowInterviewModal(true);
              }}
              onViewProfile={(mentorObj) => {
                setViewedMentor(mentorObj);
                setShowViewProfileModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Request Modal */}
      <Modal
        isOpen={showRequestModal}
        title="Send Mentor Invitation"
        onClose={() => setShowRequestModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowRequestModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSendRequestSubmit} disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Request'}
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Invitation Message</label>
          <textarea
            className="form-control"
            rows="4"
            value={requestMsg}
            onChange={(e) => setRequestMsg(e.target.value)}
          />
        </div>
      </Modal>

      {/* Mock Interview Request Modal */}
      <Modal
        isOpen={showInterviewModal}
        title={`Request Mock Interview with ${interviewMentor?.name}`}
        onClose={() => setShowInterviewModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowInterviewModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSendInterviewSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </>
        }
      >
        <div className="flex-col gap-md">
          <div className="form-group">
            <label className="form-label">Interview Topic / Domain</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Front End Developer (React.js)"
              value={interviewForm.topic}
              onChange={(e) => setInterviewForm({ ...interviewForm, topic: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Date</label>
            <input
              type="date"
              className="form-control"
              value={interviewForm.preferredDate}
              onChange={(e) => setInterviewForm({ ...interviewForm, preferredDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Time</label>
            <input
              type="time"
              className="form-control"
              value={interviewForm.preferredTime}
              onChange={(e) => setInterviewForm({ ...interviewForm, preferredTime: e.target.value })}
              required
            />
          </div>
        </div>
      </Modal>

      {/* View Profile Info Modal */}
      <Modal
        isOpen={showViewProfileModal}
        title="Mentor Profile Information"
        onClose={() => setShowViewProfileModal(false)}
        footer={
          <button className="btn btn-secondary" onClick={() => setShowViewProfileModal(false)}>
            Close
          </button>
        }
      >
        {viewedMentor && (
          <ProfileCard profile={viewedMentor} isStudent={false} />
        )}
      </Modal>
    </div>
  );
}

export default StudentMentors;
