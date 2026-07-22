import React, { useState, useEffect } from 'react';
import { useMentorData } from '../../features/mentor/hooks';
import ProfileCard from '../../components/ProfileCard';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';

function MentorProfile() {
  const { mentor, loading, fetchMentorData, handleUpdateProfile, error } = useMentorData();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    company: '',
    experience: '',
    skills: '',
    expertise: '',
    availability: '',
    linkedinUrl: '',
    githubUrl: ''
  });
  const [modalError, setModalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mentor) {
      setEditForm({
        name: mentor.name || '',
        company: mentor.company || '',
        experience: mentor.experience || '',
        skills: mentor.skills || '',
        expertise: mentor.expertise || '',
        availability: mentor.availability || '',
        linkedinUrl: mentor.linkedinUrl || '',
        githubUrl: mentor.githubUrl || ''
      });
    }
  }, [mentor]);

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

    const result = await handleUpdateProfile(editForm);
    setSubmitting(false);

    if (result.success) {
      setShowEditModal(false);
      fetchMentorData();
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
          <p className="header-subtitle">Manage your expert credentials, availability, and professional resume review setups.</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 'var(--spacing-lg)' }}>
          {error}
        </div>
      )}

      <ProfileCard 
        profile={mentor} 
        onEditClick={() => setShowEditModal(true)} 
        isStudent={false}
      />

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        title="Edit Mentor Qualifications"
        onClose={() => setShowEditModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
            <button 
              className="btn btn-success" 
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
            <label className="form-label">Current Company / Organization</label>
            <input 
              className="form-control" 
              type="text" 
              name="company" 
              value={editForm.company} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Experience (Years / Level)</label>
            <input 
              className="form-control" 
              type="text" 
              name="experience" 
              value={editForm.experience} 
              onChange={handleChange} 
              placeholder="e.g. 5+ years"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Area of Expertise</label>
            <input 
              className="form-control" 
              type="text" 
              name="expertise" 
              value={editForm.expertise} 
              onChange={handleChange} 
              placeholder="e.g. Full Stack Development"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Availability Schedule</label>
            <input 
              className="form-control" 
              type="text" 
              name="availability" 
              value={editForm.availability} 
              onChange={handleChange} 
              placeholder="e.g. Weekends, 5 PM - 8 PM"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills (Comma-separated)</label>
            <input 
              className="form-control" 
              type="text" 
              name="skills" 
              value={editForm.skills} 
              onChange={handleChange} 
              placeholder="React, Java, AWS, Docker"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn profile link</label>
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
            <label className="form-label">GitHub profile link</label>
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

export default MentorProfile;
