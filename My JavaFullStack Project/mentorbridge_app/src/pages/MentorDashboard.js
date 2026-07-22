import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getMentorProfile,
  updateMentorProfile,
  getMentorPendingRequests,
  acceptMentorRequest,
  rejectMentorRequest,
  getMentorBookings,
  approveBooking,
  rejectBooking
} from '../services/authService';
import {
  downloadResume,
  addResumeFeedback
} from "../services/resumeService";
import {
    getMentorInterviews,
    acceptInterview,
    rejectInterview
} from "../services/mockInterviewService";
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import {
  DashboardHeader,
  StatsCard,
  SectionCard,
  StatusBadge,
  EmptyState
} from '../components/DashboardComponents';

function MentorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [mentor, setMentor] = useState(null);
  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [mockInterviews, setMockInterviews] = useState([]);
  const [meetingLinks, setMeetingLinks] = useState({});
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [editForm, setEditForm] = useState({
    name: '',
    company: '',
    experience: '',
    skills: '',
    expertise: '',
    availability: ''
  });

  useEffect(() => {
    if (!token || role !== 'MENTOR') {
      navigate('/mentor/login');
      return;
    }

    fetchMentorProfile();
  }, []);

  const fetchMentorProfile = async () => {
    try {
      const response = await getMentorProfile(email);
      setMentor(response.data);
      fetchPendingRequests(response.data.id);
      fetchBookings(response.data.id);
      fetchMockInterviews(response.data.id);

      setEditForm({
        name: response.data.name || '',
        company: response.data.company || '',
        experience: response.data.experience || '',
        skills: response.data.skills || '',
        expertise: response.data.expertise || '',
        availability: response.data.availability || ''
      });
    } catch (err) {
      setError('Failed to load mentor profile');
    }
  };

  const fetchPendingRequests = async (mentorId) => {
    try {
      const response = await getMentorPendingRequests(mentorId);
      setRequests(response.data);
    } catch (err) {
      setError("Failed to load requests");
    }
  };

  const fetchBookings = async (mentorId) => {
    try {
      const response = await getMentorBookings(mentorId);
      setBookings(response.data);
    } catch (err) {
      setError("Failed to load bookings");
    }
  };

  const fetchMockInterviews = async (mentorId) => {
    try {
      const response = await getMentorInterviews(mentorId);
      setMockInterviews(response.data);
    } catch (err) {
      console.log("No Mock Interview Requests");
    }
  };

  const handleMeetingLinkChange = (id, value) => {
    setMeetingLinks(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAcceptInterview = async (id) => {
    try {
      await acceptInterview(id, meetingLinks[id] || "");
      alert("Interview Approved");
      fetchMockInterviews(mentor.id);
    } catch (err) {
      alert("Approval Failed");
    }
  };

  const handleRejectInterview = async (id) => {
    try {
      await rejectInterview(id);
      alert("Interview Rejected");
      fetchMockInterviews(mentor.id);
    } catch (err) {
      alert("Reject Failed");
    }
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await updateMentorProfile(mentor.id, editForm);
      setMentor(response.data);
      fetchPendingRequests(response.data.id);
      setMessage('Profile updated successfully');
      setShowProfileEdit(false);
    } catch (err) {
      setError('Profile update failed');
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptMentorRequest(requestId);
      setMessage("Request Accepted");
      fetchPendingRequests(mentor.id);
    } catch (err) {
      setError("Accept Failed");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectMentorRequest(requestId);
      setMessage("Request Rejected");
      fetchPendingRequests(mentor.id);
    } catch (err) {
      setError("Reject Failed");
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      await approveBooking(bookingId);
      setMessage("Booking Approved Successfully");
      fetchBookings(mentor.id);
    } catch (err) {
      setError("Failed to Approve Booking");
    }
  };

  const handleRejectBooking = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      setMessage("Booking Rejected Successfully");
      fetchBookings(mentor.id);
    } catch (err) {
      setError("Failed to Reject Booking");
    }
  };

  const handleFeedbackChange = (studentId, value) => {
    setFeedbacks(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const handleSubmitFeedback = async (studentId) => {
    try {
      await addResumeFeedback({
        studentId: studentId,
        feedback: feedbacks[studentId]
      });
      setMessage("Feedback Submitted Successfully");
    } catch (err) {
      setError("Failed to Submit Feedback");
    }
  };

  const handleDownloadResume = async (studentId) => {
    try {
      const response = await downloadResume(studentId);
      const file = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "student_resume.pdf";
      link.click();
    } catch (err) {
      setError("Resume Download Failed");
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'PENDING').length;
  const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
  const approvedBookings = bookings.filter(b => b.status === 'APPROVED').length;
  const pendingInterviews = mockInterviews.filter(i => i.status === 'PENDING').length;

  // Active view determination
  const isProfilePage = currentPath === '/mentor/profile';
  const isRequestsPage = currentPath === '/mentor/mentor-requests' || currentPath === '/mentor/requests';
  const isBookingsPage = currentPath === '/mentor/bookings';
  const isResumePage = currentPath === '/mentor/resume';
  const isInterviewsPage = currentPath === '/mentor/mock-interviews';
  const isChatPage = currentPath === '/mentor/chat';
  const isNotificationsPage = currentPath === '/mentor/notifications';
  const isSettingsPage = currentPath === '/mentor/settings';

  const renderProfileCard = () => (
    <SectionCard 
      title="Your Profile" 
      subtitle="Professional information"
      actions={
        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => setShowProfileEdit(!showProfileEdit)}
        >
          {showProfileEdit ? '✕ Cancel' : '✎ Edit'}
        </button>
      }
    >
      {mentor ? (
        <>
          {!showProfileEdit ? (
            <div className="profile-view">
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Name</div>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{mentor.name}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Email</div>
                <div style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{mentor.email}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Company</div>
                <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{mentor.company || 'Not set'}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Experience</div>
                <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{mentor.experience || 'Not set'}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Rating</div>
                <div style={{ fontWeight: '600', fontSize: '1.125rem', color: 'var(--warning-orange)' }}>⭐ {mentor.rating ?? 'N/A'}</div>
              </div>
              {mentor.skills && (
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Skills</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {mentor.skills.split(',').map((skill, idx) => (
                      <span key={idx} style={{ backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: '500' }}>
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Company</label>
                <input
                  className="form-control"
                  type="text"
                  name="company"
                  value={editForm.company}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Experience</label>
                <input
                  className="form-control"
                  type="text"
                  name="experience"
                  value={editForm.experience}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Skills (comma-separated)</label>
                <input
                  className="form-control"
                  type="text"
                  name="skills"
                  value={editForm.skills}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Expertise</label>
                <input
                  className="form-control"
                  type="text"
                  name="expertise"
                  value={editForm.expertise}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Availability</label>
                <input
                  className="form-control"
                  type="text"
                  name="availability"
                  value={editForm.availability}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                💾 Save Changes
              </button>
            </form>
          )}
        </>
      ) : (
        <EmptyState icon="⏳" title="Loading..." description="Please wait..." />
      )}
    </SectionCard>
  );

  const renderRequestsCard = () => (
    <SectionCard 
      title="Student Connection Requests" 
      subtitle={`${pendingRequests} pending request${pendingRequests !== 1 ? 's' : ''}`}
    >
      {requests.length === 0 ? (
        <EmptyState 
          icon="📬" 
          title="No requests" 
          description="New student requests will appear here"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {requests.map((request) => (
            <div key={request.requestId} style={{ padding: '1.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary-blue)', display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                  {request.studentName}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', padding: '0.75rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)' }}>
                  "{request.message}"
                </div>
                <StatusBadge status={request.status} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAccept(request.requestId)}
                >
                  ✓ Accept
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleReject(request.requestId)}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );

  const renderBookingsCard = () => (
    <SectionCard 
      title="Booking Requests" 
      subtitle={`${pendingBookings} pending, ${approvedBookings} approved`}
    >
      {bookings.length === 0 ? (
        <EmptyState 
          icon="📅" 
          title="No bookings" 
          description="Student bookings will appear here"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{ padding: '1.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary-blue)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{booking.student.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>📅 {booking.bookingDate} at {booking.bookingTime}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>⏱️ {booking.duration} minutes</div>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              {booking.status === 'PENDING' && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-success"
                    onClick={() => handleApproveBooking(booking.id)}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRejectBooking(booking.id)}
                  >
                    ✕ Reject
                  </button>
                </div>
              )}

              {booking.status === 'APPROVED' && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/chat/${booking.id}`)}
                  >
                    💬 Open Chat
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );

  const renderInterviewsCard = () => (
    <SectionCard 
      title="Mock Interview Requests" 
      subtitle={`${pendingInterviews} pending request${pendingInterviews !== 1 ? 's' : ''}`}
    >
      {mockInterviews.length === 0 ? (
        <EmptyState 
          icon="🎤" 
          title="No interview requests" 
          description="Mock interview requests will appear here"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockInterviews.map((interview) => (
            <div key={interview.id} style={{ padding: '1.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--warning-orange)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                    {interview.student?.name || 'Student'}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Topic: {interview.topic}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    📅 {interview.preferredDate} at {interview.preferredTime}
                  </div>
                </div>
                <StatusBadge status={interview.status} />
              </div>

              {interview.status === 'PENDING' && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexDirection: 'column', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                  <div>
                    <label className="form-label">Meeting Link</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Google Meet or Zoom link"
                      value={meetingLinks[interview.id] || ''}
                      onChange={(e) => handleMeetingLinkChange(interview.id, e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-success"
                      onClick={() => handleAcceptInterview(interview.id)}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRejectInterview(interview.id)}
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );

  const renderResumeCard = () => (
    <SectionCard 
      title="Resume Reviews" 
      subtitle="Review student resumes and provide constructive feedback"
    >
      {bookings.length === 0 ? (
        <EmptyState 
          icon="📄" 
          title="No student resumes to review" 
          description="Resumes submitted by your booked students will appear here"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{ padding: '1.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary-blue)' }}>
              <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                Student: {booking.student.name}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownloadResume(booking.student.id)}
                >
                  📥 Download Student Resume
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="form-label">Feedback for Student</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter resume feedback..."
                  value={feedbacks[booking.student.id] || ''}
                  onChange={(e) => handleFeedbackChange(booking.student.id, e.target.value)}
                />
                <button 
                  className="btn btn-success btn-sm"
                  style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                  onClick={() => handleSubmitFeedback(booking.student.id)}
                >
                  ✉️ Submit Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );

  const renderChatCard = () => (
    <SectionCard 
      title="Messages & Chat" 
      subtitle="Communicate directly with your approved students"
    >
      {bookings.filter(b => b.status === 'APPROVED').length === 0 ? (
        <EmptyState 
          icon="💬" 
          title="No active chats" 
          description="Approve student bookings to start chatting"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.filter(b => b.status === 'APPROVED').map((booking) => (
            <div key={booking.id} style={{ padding: '1.25rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{booking.student.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Session: {booking.bookingDate} at {booking.bookingTime}</div>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => navigate(`/chat/${booking.id}`)}
              >
                💬 Open Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );

  const renderNotificationsCard = () => (
    <SectionCard 
      title="Notifications & Updates" 
      subtitle="Recent notifications regarding your account"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary-blue)' }}>
          <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>📬 {pendingRequests} New Student Requests</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You have pending mentorship requests requiring your review.</div>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--warning-orange)' }}>
          <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>📅 {pendingBookings} Booking Requests</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pending session bookings awaiting confirmation.</div>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--danger)' }}>
          <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>🎤 {pendingInterviews} Mock Interview Requests</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Mock interview requests scheduled by students.</div>
        </div>
      </div>
    </SectionCard>
  );

  const renderSettingsCard = () => (
    <SectionCard 
      title="Mentor Settings" 
      subtitle="Preferences and availability configuration"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="form-label" style={{ fontWeight: '600' }}>Availability Status</label>
          <input 
            type="text" 
            className="form-control" 
            value={editForm.availability || 'Available for 1-on-1 sessions'} 
            onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })} 
            placeholder="e.g. Mon-Fri 5 PM - 8 PM"
          />
        </div>
        <button 
          className="btn btn-primary"
          style={{ width: '200px' }}
          onClick={handleUpdate}
        >
          💾 Save Settings
        </button>
      </div>
    </SectionCard>
  );

  const getHeaderTitle = () => {
    if (isProfilePage) return "My Profile";
    if (isRequestsPage) return "Student Connection Requests";
    if (isBookingsPage) return "Bookings";
    if (isResumePage) return "Resume Review";
    if (isInterviewsPage) return "Mock Interviews";
    if (isChatPage) return "Messages & Chat";
    if (isNotificationsPage) return "Notifications";
    if (isSettingsPage) return "Settings";
    return "Mentor Dashboard";
  };

  const getHeaderSubtitle = () => {
    if (isProfilePage) return "View and edit your mentor profile details";
    if (isRequestsPage) return "Manage pending student connection requests";
    if (isBookingsPage) return "Approve or decline student booking sessions";
    if (isResumePage) return "Download student resumes and provide feedback";
    if (isInterviewsPage) return "Schedule and manage mock interview calls";
    if (isChatPage) return "Communicate with approved students";
    if (isNotificationsPage) return "Recent updates and notifications";
    if (isSettingsPage) return "Account preferences and settings";
    return "Manage your students and sessions";
  };

  return (
    <div className="app-wrapper">
      <Sidebar role="MENTOR" />
      
      <div className="app-main">
        <TopNavbar userName={mentor?.name || 'Mentor'} />
        
        <div className="app-content">
          {/* Alerts */}
          {message && (
            <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
              ✓ {message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
              ✕ {error}
            </div>
          )}

          {/* Page Header */}
          <DashboardHeader 
            title={getHeaderTitle()} 
            subtitle={getHeaderSubtitle()}
          />

          {/* Stats Cards */}
          {mentor && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <StatsCard 
                icon="📬" 
                title="Pending Requests" 
                value={pendingRequests}
                color="primary"
              />
              <StatsCard 
                icon="📅" 
                title="Pending Bookings" 
                value={pendingBookings}
                color="warning"
              />
              <StatsCard 
                icon="✓" 
                title="Approved Sessions" 
                value={approvedBookings}
                color="success"
              />
              <StatsCard 
                icon="🎤" 
                title="Interview Requests" 
                value={pendingInterviews}
                color="danger"
              />
            </div>
          )}

          {/* Dynamic Content View based on active Sidebar Route */}
          {isProfilePage && renderProfileCard()}
          {isRequestsPage && renderRequestsCard()}
          {isBookingsPage && renderBookingsCard()}
          {isResumePage && renderResumeCard()}
          {isInterviewsPage && renderInterviewsCard()}
          {isChatPage && renderChatCard()}
          {isNotificationsPage && renderNotificationsCard()}
          {isSettingsPage && renderSettingsCard()}

          {/* Dashboard Home Overview Grid */}
          {!isProfilePage && !isRequestsPage && !isBookingsPage && !isResumePage && !isInterviewsPage && !isChatPage && !isNotificationsPage && !isSettingsPage && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {renderProfileCard()}
              {renderRequestsCard()}
              {renderBookingsCard()}
              {renderInterviewsCard()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;