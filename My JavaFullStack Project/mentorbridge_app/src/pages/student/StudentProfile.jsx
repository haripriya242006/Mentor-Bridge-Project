import React, { useState, useEffect } from 'react';
import { useStudentData, useProfileUpdate } from '../../features/student/hooks';
import ProfileCard from '../../components/ProfileCard';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentProfile() {
  const { student, loading, fetchStudentData, error } = useStudentData();
  const { updateProfile } = useProfileUpdate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    college: '',
    department: '',
    yearOfStudy: '',
    skills: '',
    linkedinUrl: '',
    githubUrl: ''
  });
  const [modalError, setModalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setEditForm({
        name: student.name || '',
        college: student.college || '',
        department: student.department || '',
        yearOfStudy: student.yearOfStudy || '',
        skills: student.skills || '',
        linkedinUrl: student.linkedinUrl || '',
        githubUrl: student.githubUrl || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setModalError('');
    setSubmitting(true);

    const result = await updateProfile(student.id, editForm);
    setSubmitting(false);

    if (result.success) {
      setShowEditModal(false);
      fetchStudentData();
    } else {
      setModalError(result.error || 'Failed to update profile');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-fade" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">My Profile</h1>
          <p className="header-subtitle">Manage your credentials, academic details, and portfolio links.</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 'var(--spacing-lg)' }}>
          {error}
        </div>
      )}

      <ProfileCard 
        profile={student} 
        onEditClick={() => setShowEditModal(true)} 
        isStudent={true}
      />

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        title="Edit Profile Details"
        onClose={() => setShowEditModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleUpdate}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        }
      >
        <form onSubmit={handleUpdate} className="flex-col gap-md">
          {modalError && (
            <div className="alert alert-danger" style={{ padding: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
              {modalError}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="form-control" 
              type="text" 
              name="name" 
              value={editForm.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">College Name</label>
            <input 
              className="form-control" 
              type="text" 
              name="college" 
              value={editForm.college} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department / Major</label>
            <input 
              className="form-control" 
              type="text" 
              name="department" 
              value={editForm.department} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Year of Study</label>
            <select 
              className="form-select" 
              name="yearOfStudy" 
              value={editForm.yearOfStudy} 
              onChange={handleChange}
            >
              <option value="">Select Year...</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Skills (Comma-separated)</label>
            <input 
              className="form-control" 
              type="text" 
              name="skills" 
              value={editForm.skills} 
              onChange={handleChange} 
              placeholder="React, Java, Spring Boot, SQL"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn Profile URL</label>
            <input 
              className="form-control" 
              type="text" 
              name="linkedinUrl" 
              value={editForm.linkedinUrl} 
              onChange={handleChange} 
              placeholder="linkedin.com/in/username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">GitHub Profile URL</label>
            <input 
              className="form-control" 
              type="text" 
              name="githubUrl" 
              value={editForm.githubUrl} 
              onChange={handleChange} 
              placeholder="github.com/username"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default StudentProfile;
