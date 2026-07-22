import React, { useState } from 'react';
import { useStudentData, useMockInterview } from '../../features/student/hooks';
import InterviewCard from '../../components/InterviewCard';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentMockInterviews() {
  const { student, interviews, mentors, loading, fetchInterviews } = useStudentData();
  const { requestInterview } = useMockInterview();

  // Form State
  const [mentorId, setMentorId] = useState('');
  const [topic, setTopic] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const [formMsg, setFormMsg] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    setFormError('');

    if (!mentorId) {
      setFormError('Please select a mentor.');
      return;
    }
    if (!topic.trim()) {
      setFormError('Please specify an interview topic.');
      return;
    }
    if (!preferredDate || !preferredTime) {
      setFormError('Please choose preferred date and time.');
      return;
    }

    setSubmitting(true);
    const res = await requestInterview(
      student.id,
      Number(mentorId),
      topic,
      preferredDate,
      preferredTime
    );
    setSubmitting(false);

    if (res.success) {
      setFormMsg('Mock interview requested successfully!');
      // Reset form
      setTopic('');
      setMentorId('');
      setPreferredDate('');
      setPreferredTime('');
      fetchInterviews(student.id);
    } else {
      setFormError(res.error || 'Failed to submit mock interview request.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-fade">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Mock Interviews</h1>
          <p className="header-subtitle">Schedule practice interviews with industry professionals and receive helpful feedback.</p>
        </div>
      </div>

      <div className="flex-row-layout">
        
        {/* Left Column: Form */}
        <div className="section-card" style={{ width: '40%', minWidth: '320px' }}>
          <div className="section-header">
            <h3 className="section-title">Request Mock Session</h3>
          </div>
          <div className="section-body">
            {formMsg && <div className="alert alert-success">{formMsg}</div>}
            {formError && <div className="alert alert-danger">{formError}</div>}

            <form onSubmit={handleSubmit} className="flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Select Mentor</label>
                <select
                  className="form-select"
                  value={mentorId}
                  onChange={(e) => setMentorId(e.target.value)}
                  required
                >
                  <option value="">Choose a mentor...</option>
                  {mentors.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.company || 'Professional'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Interview Topic</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. System Design, Spring Boot"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
                {submitting ? 'Submitting...' : '🎤 Request Mock Interview'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="section-card flex-1">
          <div className="section-header">
            <h3 className="section-title">Requested Interviews</h3>
          </div>
          <div className="section-body">
            {interviews.length === 0 ? (
              <EmptyState
                icon="🎤"
                title="No interview requests"
                description="Your mock interviews, meeting credentials, and feedback logs will be displayed here."
              />
            ) : (
              <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '4px' }}>
                {interviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    role="STUDENT"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentMockInterviews;
