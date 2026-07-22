import React, { useEffect, useState } from 'react';
import {
  getStudentProfile,
  updateStudentProfile,
  getAllMentors,
  searchMentors,
  sendMentorRequest
} from '../services/authService';
import { useNavigate } from 'react-router-dom';
import BookingForm from "../components/BookingForm";
import { getStudentBookings } from "../services/authService";
import { uploadResume, getResume } from "../services/resumeService";
import {
    requestMockInterview,
    getStudentInterviews
} from "../services/mockInterviewService";
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import {
  DashboardHeader,
  StatsCard,
  SectionCard,
  MentorCard,
  StatusBadge,
  EmptyState,
  DataTable
} from '../components/DashboardComponents';

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [requestMessage, setRequestMessage] = useState('');
  const [selectedMentorId, setSelectedMentorId] = useState(null); 
  const [showRequestModal, setShowRequestModal] = useState(false); 
  const [bookings, setBookings] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [resume, setResume] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showMockInterviewModal, setShowMockInterviewModal] = useState(false);
  const [selectedMentorForInterview, setSelectedMentorForInterview] = useState(null);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [editForm, setEditForm] = useState({
    name: '',
    college: '',
    department: '',
    yearOfStudy: '',
    skills: '',
    linkedinUrl: '',
    githubUrl: ''
  });

  useEffect(() => {
    if (!token || role !== 'STUDENT') {
      navigate('/student/login');
      return;
    }

    fetchStudentProfile();
    fetchAllMentors();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const response = await getStudentProfile(email);
      setStudent(response.data);
      fetchBookings(response.data.id);
      fetchResume(response.data.id);
      fetchMockInterviews(response.data.id);

      setEditForm({
        name: response.data.name || '',
        college: response.data.college || '',
        department: response.data.department || '',
        yearOfStudy: response.data.yearOfStudy || '',
        skills: response.data.skills || '',
        linkedinUrl: response.data.linkedinUrl || '',
        githubUrl: response.data.githubUrl || ''
      });
    } catch (err) {
      setError('Failed to load student profile');
    }
  };

  const fetchAllMentors = async () => {
    try {
      const response = await getAllMentors();
      setMentors(response.data);
    } catch (err) {
      setError('Failed to load mentors');
    }
  };

  const fetchBookings = async (studentId) => {
    try {
        const response = await getStudentBookings(studentId);
        setBookings(response.data);
    } catch (err) {
        console.log(err);
    }
  };

  const fetchResume = async (studentId) => {
    try {
        const response = await getResume(studentId);
        setResume(response.data);
    } catch (err) {
        console.log("Resume not uploaded yet");
    }
  };

  const fetchMockInterviews = async (studentId) => {
    try {
        const response = await getStudentInterviews(studentId);
        setInterviews(response.data);
    } catch(err){
        console.log("No Interviews Yet");
    }
  };

  const handleRequestInterview = async (mentorId) => {
    try {
        await requestMockInterview({
            studentId: student.id,
            mentorId: mentorId,
            topic,
            preferredDate,
            preferredTime
        });

        setMessage("Mock Interview Requested Successfully");
        fetchMockInterviews(student.id);
        setTopic("");
        setPreferredDate("");
        setPreferredTime("");
        setShowMockInterviewModal(false);

    } catch (err) {
        setError("Failed to Request Interview");
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
        setError("Please select a PDF");
        return;
    }

    const formData = new FormData();
    formData.append("studentId", student.id);
    formData.append("file", resumeFile);

    try {
        await uploadResume(formData);
        setMessage("Resume Uploaded Successfully");
        fetchResume(student.id);
    } catch (err) {
        setError("Upload Failed");
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchKeyword.trim()) {
        fetchAllMentors();
        return;
      }

      const response = await searchMentors(searchKeyword);
      setMentors(response.data);
    } catch (err) {
      setError('Mentor search failed');
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
      const payload = {
        ...editForm,
        yearOfStudy: editForm.yearOfStudy ? Number(editForm.yearOfStudy) : null
      };

      const response = await updateStudentProfile(student.id, payload);
      setStudent(response.data);
      setMessage('Profile updated successfully');
      setShowProfileEdit(false);
    } catch (err) {
      setError('Profile update failed');
    }
  };

  const handleSendRequest = async () => {
    if (!requestMessage.trim()) {
      setError("Please enter a message");
      return;
    }

    try {
      const requestData = {
        studentId: student.id,
        mentorId: selectedMentorId,
        message: requestMessage
      };

      const response = await sendMentorRequest(requestData);
      setMessage(response.data);
      setShowRequestModal(false);
      setRequestMessage('');
    } catch (err) {
      setError("Failed to send request");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/student/login');
  };

  const approvedBookingsCount = bookings.filter(b => b.status === 'APPROVED').length;
  const resumeUploaded = resume ? 1 : 0;
  const pendingInterviews = interviews.filter(i => i.status === 'PENDING').length;

  return (
    <div className="app-wrapper">
      <Sidebar role="STUDENT" />
      
      <div className="app-main">
        <TopNavbar userName={student?.name || 'Student'} />
        
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
            title="Welcome back!" 
            subtitle={`Here's your learning overview - keep progressing! 👋`}
          />

          {/* Stats Cards */}
          {student && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <StatsCard 
                icon="🎓" 
                title="Total Mentors" 
                value={mentors.length}
                color="primary"
              />
              <StatsCard 
                icon="📅" 
                title="Upcoming Sessions" 
                value={approvedBookingsCount}
                color="success"
              />
              <StatsCard 
                icon="📄" 
                title="Resume Status" 
                value={resumeUploaded ? 'Uploaded' : 'Pending'}
                color="warning"
              />
              <StatsCard 
                icon="🎤" 
                title="Mock Interviews" 
                value={pendingInterviews}
                color="danger"
              />
            </div>
          )}

          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {/* Profile Card */}
            <SectionCard 
              title="Your Profile" 
              subtitle="Personal information"
              actions={
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => setShowProfileEdit(!showProfileEdit)}
                >
                  {showProfileEdit ? '✕ Cancel' : '✎ Edit'}
                </button>
              }
            >
              {student ? (
                <>
                  {!showProfileEdit ? (
                    <div className="profile-view">
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Name</div>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{student.name}</div>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Email</div>
                        <div style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{student.email}</div>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>College</div>
                        <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{student.college || 'Not set'}</div>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Department</div>
                        <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{student.department || 'Not set'}</div>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Year of Study</div>
                        <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{student.yearOfStudy ? `Year ${student.yearOfStudy}` : 'Not set'}</div>
                      </div>
                      {student.skills && (
                        <div>
                          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '500', marginBottom: '0.25rem' }}>Skills</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {student.skills.split(',').map((skill, idx) => (
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
                        <label className="form-label">College</label>
                        <input
                          className="form-control"
                          type="text"
                          name="college"
                          value={editForm.college}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="form-label">Department</label>
                        <input
                          className="form-control"
                          type="text"
                          name="department"
                          value={editForm.department}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="form-label">Year of Study</label>
                        <input
                          className="form-control"
                          type="number"
                          name="yearOfStudy"
                          value={editForm.yearOfStudy}
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
                        <label className="form-label">LinkedIn URL</label>
                        <input
                          className="form-control"
                          type="text"
                          name="linkedinUrl"
                          value={editForm.linkedinUrl}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="form-label">GitHub URL</label>
                        <input
                          className="form-control"
                          type="text"
                          name="githubUrl"
                          value={editForm.githubUrl}
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

            {/* Resume Card */}
            <SectionCard 
              title="Resume" 
              subtitle="Upload your resume for review"
            >
              {!resume ? (
                <div style={{ 
                  border: '2px dashed var(--border-light)', 
                  borderRadius: 'var(--radius-lg)', 
                  padding: '2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  backgroundColor: 'var(--background)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📄</div>
                  <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Drag & drop your PDF here or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="resume-input"
                  />
                  <label htmlFor="resume-input" className="btn btn-primary">
                    📤 Choose File
                  </label>
                  {resumeFile && (
                    <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--success-green)' }}>
                      ✓ {resumeFile.name}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>✓</span>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{resume.fileName}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Uploaded</div>
                    </div>
                  </div>
                  {resume.feedback && (
                    <div style={{ padding: '1rem', backgroundColor: 'var(--primary-blue-light)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary-blue)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Feedback</div>
                      <p style={{ margin: 0, color: 'var(--primary-blue)', fontSize: '0.875rem' }}>{resume.feedback}</p>
                    </div>
                  )}
                </div>
              )}
              {!resume ? (
                <button 
                  className="btn btn-success" 
                  onClick={handleResumeUpload}
                  style={{ width: '100%' }}
                  disabled={!resumeFile}
                >
                  📤 Upload Resume
                </button>
              ) : (
                <button 
                  className="btn btn-outline-primary" 
                  onClick={() => setResumeFile(null)}
                  style={{ width: '100%' }}
                >
                  🔄 Upload New Resume
                </button>
              )}
            </SectionCard>

            {/* Find Mentors Card */}
            <SectionCard 
              title="Search Mentors" 
              subtitle="Find and connect with mentors"
            >
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search mentors..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleSearch}>
                  🔍
                </button>
              </div>
            </SectionCard>

            {/* Bookings Summary */}
            <SectionCard 
              title="Upcoming Sessions" 
              subtitle={`${approvedBookingsCount} approved booking${approvedBookingsCount !== 1 ? 's' : ''}`}
            >
              {bookings.length === 0 ? (
                <EmptyState 
                  icon="📅" 
                  title="No bookings yet" 
                  description="Book a session with a mentor to get started"
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-blue)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{booking.mentor.name}</div>
                        <StatusBadge status={booking.status} />
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        📅 {booking.bookingDate} at {booking.bookingTime}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        ⏱️ {booking.duration} minutes
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          </div>

          {/* Mentors Grid */}
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Available Mentors</h2>
            {mentors.length === 0 ? (
              <EmptyState 
                icon="🔍" 
                title="No mentors found" 
                description="Try searching with different keywords"
              />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {mentors.map((mentor) => (
                  <MentorCard 
                    key={mentor.id} 
                    mentor={mentor}
                    onSendRequest={() => {
                      setSelectedMentorId(mentor.id);
                      setShowRequestModal(true);
                    }}
                    onBook={() => {
                      // Book session logic
                    }}
                    onRequestInterview={() => {
                      setSelectedMentorForInterview(mentor);
                      setShowMockInterviewModal(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mock Interviews Section */}
          <SectionCard 
            title="Mock Interview Requests" 
            subtitle={`${pendingInterviews} pending request${pendingInterviews !== 1 ? 's' : ''}`}
          >
            {interviews.length === 0 ? (
              <EmptyState 
                icon="🎤" 
                title="No interviews yet" 
                description="Request a mock interview with a mentor to practice"
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {interviews.map((interview) => (
                  <div key={interview.id} style={{ padding: '1.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--warning-orange)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Topic: {interview.topic}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          📅 {interview.preferredDate} at {interview.preferredTime}
                        </div>
                      </div>
                      <StatusBadge status={interview.status} />
                    </div>
                    {interview.meetingLink && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => window.open(interview.meetingLink, '_blank')}
                      >
                        🎥 Join Interview
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Bookings History */}
          <SectionCard 
            title="Bookings History" 
            subtitle="Your session history"
          >
            {bookings.length === 0 ? (
              <EmptyState 
                icon="📋" 
                title="No bookings" 
                description="Book a session with a mentor to get started"
              />
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mentor</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Duration</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td style={{ fontWeight: '500' }}>{booking.mentor.name}</td>
                        <td>{booking.bookingDate}</td>
                        <td>{booking.bookingTime}</td>
                        <td>{booking.duration}m</td>
                        <td>
                          <StatusBadge status={booking.status} />
                        </td>
                        <td>
                          {booking.status === 'APPROVED' && (
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => navigate(`/chat/${booking.id}`)}
                            >
                              💬 Chat
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>
      </div>

      {/* Send Request Modal */}
      {showRequestModal && (
        <div className="modal d-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Mentor Request</h5>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                  onClick={() => setShowRequestModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tell the mentor why you'd like to connect..."
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowRequestModal(false);
                    setRequestMessage('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSendRequest}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mock Interview Modal */}
      {showMockInterviewModal && (
        <div className="modal d-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Mock Interview</h5>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                  onClick={() => setShowMockInterviewModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">Interview Topic</label>
                  <input
                    type="text"
                    className="form-control"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Java Full Stack Development"
                  />
                </div>
                <div>
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Preferred Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowMockInterviewModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequestInterview(selectedMentorForInterview.id)}
                >
                  Request Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
//                 <p>Loading profile...</p>
//               )}
//             </div>
//           </div>

//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h4 className="mb-3">Edit Profile</h4>

//               <form onSubmit={handleUpdate}>
//                 <input
//                   className="form-control mb-3"
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={editForm.name}
//                   onChange={handleChange}
//                 />

//                 <input
//                   className="form-control mb-3"
//                   type="text"
//                   name="college"
//                   placeholder="College"
//                   value={editForm.college}
//                   onChange={handleChange}
//                 />

//                 <input
//                   className="form-control mb-3"
//                   type="text"
//                   name="department"
//                   placeholder="Department"
//                   value={editForm.department}
//                   onChange={handleChange}
//                 />

//                 <input
//                   className="form-control mb-3"
//                   type="number"
//                   name="yearOfStudy"
//                   placeholder="Year of Study"
//                   value={editForm.yearOfStudy}
//                   onChange={handleChange}
//                 />

//                 <input
//                   className="form-control mb-3"
//                   type="text"
//                   name="skills"
//                   placeholder="Skills"
//                   value={editForm.skills}
//                   onChange={handleChange}
//                 />

//                 <input
//                   className="form-control mb-3"
//                   type="text"
//                   name="linkedinUrl"
//                   placeholder="LinkedIn URL"
//                   value={editForm.linkedinUrl}
//                   onChange={handleChange}
//                 />

//                 <input
//                   className="form-control mb-3"
//                   type="text"
//                   name="githubUrl"
//                   placeholder="GitHub URL"
//                   value={editForm.githubUrl}
//                   onChange={handleChange}
//                 />

//                 <button className="btn btn-primary w-100" type="submit">
//                   Update Profile
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="card shadow-sm mt-4">

//     <div className="card-body">

//         <h4 className="mb-3">Resume Upload</h4>

//         <input
//             type="file"
//             className="form-control mb-3"
//             accept=".pdf"
//             onChange={(e) => setResumeFile(e.target.files[0])}
//         />

//         <button
//             className="btn btn-success w-100"
//             onClick={handleResumeUpload}
//         >
//             Upload Resume
//         </button>

//         <hr />

//         {resume && (

//             <div>

//                 <h6>Uploaded Resume</h6>

//                 <p>

//                     <strong>File :</strong>

//                     {resume.fileName}

//                 </p>

//                 <p>

//                     <strong>Feedback :</strong>

//                     {
//                         resume.feedback
//                             ? resume.feedback
//                             : "No feedback yet"
//                     }

//                 </p>

//             </div>

//         )}

//     </div>

// </div>

//         {/* RIGHT SIDE - MENTORS */}
//         <div className="col-lg-7">
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h4 className="mb-3">Find Mentors</h4>

//               <div className="d-flex gap-2 mb-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search by mentor name or skill"
//                   value={searchKeyword}
//                   onChange={(e) => setSearchKeyword(e.target.value)}
//                 />
//                 <button className="btn btn-success" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>

//               {mentors.length === 0 ? (
//                 <p>No mentors found.</p>
//               ) : (
//                 <div className="row g-3">
//                   {mentors.map((mentor) => (
//                     <div className="col-md-6" key={mentor.id}>
//                       <div className="card border h-100">
//                         <div className="card-body">
//                           <h5>{mentor.name}</h5>
//                           <p className="mb-1"><strong>Company:</strong> {mentor.company}</p>
//                           <p className="mb-1"><strong>Experience:</strong> {mentor.experience}</p>
//                           <p className="mb-1"><strong>Skills:</strong> {mentor.skills}</p>
//                           <p className="mb-1"><strong>Expertise:</strong> {mentor.expertise}</p>
//                           <p className="mb-1"><strong>Availability:</strong> {mentor.availability}</p>
//                           <p className="mb-0"><strong>Rating:</strong> {mentor.rating ?? 'N/A'}</p>
//                           <button className="btn btn-primary mt-3" onClick={() => {
//                             setSelectedMentorId(mentor.id);
//                             setShowRequestModal(true);}} >Send Request</button>
//                             <BookingForm studentId={student.id} mentorId={mentor.id}/>
//                             <hr />

// <h4 className="mt-4">Mock Interview</h4>

// <div className="mb-3">
//     <label className="form-label">Interview Topic</label>
//     <input
//         type="text"
//         className="form-control"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         placeholder="Example: Java Full Stack"
//     />
// </div>

// <div className="mb-3">
//     <label className="form-label">Preferred Date</label>
//     <input
//         type="date"
//         className="form-control"
//         value={preferredDate}
//         onChange={(e) => setPreferredDate(e.target.value)}
//     />
// </div>

// <div className="mb-3">
//     <label className="form-label">Preferred Time</label>
//     <input
//         type="time"
//         className="form-control"
//         value={preferredTime}
//         onChange={(e) => setPreferredTime(e.target.value)}
//     />
// </div>

// <button
//     className="btn btn-warning w-100"
//     onClick={() => handleRequestInterview(mentor.id)}
// >
//     Request Mock Interview
// </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {showRequestModal && (

//         <div className="modal d-block">

//           <div className="modal-dialog">

//             <div className="modal-content">

//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   Send Mentor Request
//                 </h5>
//               </div>

//               <div className="modal-body">

//                 <textarea
//                   className="form-control"
//                   rows="4"
//                   placeholder="Enter your message..."
//                   value={requestMessage}
//                   onChange={(e) => setRequestMessage(e.target.value)}
//                 />

//               </div>

//               <div className="modal-footer">

//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => {
//                     setShowRequestModal(false);
//                     setRequestMessage('');
//                   }}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   className="btn btn-primary"
//                   onClick={handleSendRequest}
//                 >
//                   Send Request
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>

//       )}
//       <div className="card shadow mt-4">
//     <div className="card-body">

//         <h4>My Bookings</h4>

//         <hr />

//         {bookings.length === 0 ? (

//             <p>No Bookings</p>

//         ) : (

//             bookings.map((booking) => (

//                 <div className="card mb-3" key={booking.id}>

//                     <div className="card-body">

//                         <h5>{booking.mentor.name}</h5>

//                         <p>
//                             <strong>Date:</strong> {booking.bookingDate}
//                         </p>

//                         <p>
//                             <strong>Time:</strong> {booking.bookingTime}
//                         </p>

//                         <p>
//                             <strong>Duration:</strong> {booking.duration} Minutes
//                         </p>

//                         <p>
//                             <strong>Status:</strong>  <span
//          className={
//             booking.status === "APPROVED"
//                 ? "badge bg-success"
//                 : booking.status === "REJECTED"
//                 ? "badge bg-danger"
//                 : "badge bg-warning text-dark"
//         }
//     >
//         {booking.status}
//     </span>
//                         </p>
//                         {booking.status === "APPROVED" && (

// <button
// className="btn btn-primary mt-3"
// onClick={() => navigate(`/chat/${booking.id}`)}
// >

// 💬 Chat

// </button>

// )}

//                     </div>

//                 </div>

//             ))

//         )}
//         <div className="card shadow mt-4">
//     <div className="card-body">

//         <h4>My Mock Interviews</h4>

//         <hr />

//         {interviews.length === 0 ? (

//             <p>No Interview Requests Yet</p>

//         ) : (

//             interviews.map((item) => (

//                 <div className="card mb-3" key={item.id}>

//                     <div className="card-body">

//                         <p>
//                             <strong>Topic:</strong> {item.topic}
//                         </p>

//                         <p>
//                             <strong>Date:</strong> {item.preferredDate}
//                         </p>

//                         <p>
//                             <strong>Time:</strong> {item.preferredTime}
//                         </p>

//                         <p>
//                             <strong>Status:</strong>{" "}
//                             <span
//                                 className={
//                                     item.status === "APPROVED"
//                                         ? "badge bg-success"
//                                         : item.status === "REJECTED"
//                                         ? "badge bg-danger"
//                                         : "badge bg-warning text-dark"
//                                 }
//                             >
//                                 {item.status}
//                             </span>
//                         </p>

//                         {item.meetingLink && (
//                             <p>
//                                 <strong>Meeting Link:</strong>{" "}
//                                 <a
//                                     href={item.meetingLink}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                 >
//                                     Join Interview
//                                 </a>
//                             </p>
//                         )}

//                     </div>

//                 </div>

//             ))

//         )}

//     </div>
// </div>

//     </div>
// </div>

//     </div>
    
//   );
// }

// export default StudentDashboard;