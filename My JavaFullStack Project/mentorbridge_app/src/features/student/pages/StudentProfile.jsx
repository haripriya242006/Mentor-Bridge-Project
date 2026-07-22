import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Input,
  Textarea,
  Grid,
  Flex,
  Alert,
} from '../components/UIComponents';
import { useStudentData } from '../hooks';
import { useProfileUpdate } from '../hooks';
import styles from '../styles/Pages.module.css';

function StudentProfile() {
  const { student, setStudent, fetchStudentData } = useStudentData();
  const { updateProfile } = useProfileUpdate();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    department: '',
    yearOfStudy: '',
    skills: '',
    linkedinUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        college: student.college || '',
        department: student.department || '',
        yearOfStudy: student.yearOfStudy || '',
        skills: student.skills || '',
        linkedinUrl: student.linkedinUrl || '',
        githubUrl: student.githubUrl || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const result = await updateProfile(student.id, formData);
    
    if (result.success) {
      setStudent(result.data);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
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
          <h1 className={styles.pageTitle}>Your Profile</h1>
          <p className={styles.pageSubtitle}>Manage your personal information</p>
        </div>
        {!isEditing && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            ✎ Edit Profile
          </Button>
        )}
      </div>

      {message && (
        <Alert type="success" icon="✓" title="Success" message={message} onClose={() => setMessage('')} />
      )}

      {error && (
        <Alert type="error" icon="✕" title="Error" message={error} onClose={() => setError('')} />
      )}

      {!isEditing ? (
        // View Mode
        <Grid columns="auto-fit" minWidth="350px">
          <Card>
            <CardHeader title="Personal Information" />
            <CardBody>
              <div className={styles.profileInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Name</div>
                  <div className={styles.infoValue}>{student?.name || 'Not set'}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoValue}>{student?.email || 'Not set'}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>College</div>
                  <div className={styles.infoValue}>{student?.college || 'Not set'}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Department</div>
                  <div className={styles.infoValue}>{student?.department || 'Not set'}</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Academic Information" />
            <CardBody>
              <div className={styles.profileInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Year of Study</div>
                  <div className={styles.infoValue}>
                    {student?.yearOfStudy ? `Year ${student.yearOfStudy}` : 'Not set'}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Skills</div>
                  <div className={styles.skillsContainer}>
                    {student?.skills ? (
                      student.skills.split(',').map((skill, idx) => (
                        <span key={idx} className={styles.skillTag}>
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <span className={styles.infoValue}>Not set</span>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Social & Web Presence" />
            <CardBody>
              <div className={styles.profileInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>LinkedIn URL</div>
                  <div className={styles.infoValue}>
                    {student?.linkedinUrl ? (
                      <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        {student.linkedinUrl}
                      </a>
                    ) : (
                      'Not set'
                    )}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>GitHub URL</div>
                  <div className={styles.infoValue}>
                    {student?.githubUrl ? (
                      <a href={student.githubUrl} target="_blank" rel="noopener noreferrer">
                        {student.githubUrl}
                      </a>
                    ) : (
                      'Not set'
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Grid>
      ) : (
        // Edit Mode
        <Card>
          <CardHeader title="Edit Profile" />
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Grid columns="auto-fit" minWidth="300px">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />

                <Input
                  label="College"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                />

                <Input
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                />

                <Input
                  label="Year of Study"
                  name="yearOfStudy"
                  type="number"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  placeholder="Enter year (1, 2, 3, 4)"
                />

                <Textarea
                  label="Skills (comma-separated)"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., JavaScript, React, Node.js"
                  style={{ gridColumn: '1 / -1' }}
                />

                <Input
                  label="LinkedIn URL"
                  name="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                />

                <Input
                  label="GitHub URL"
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />

                <Flex gap="var(--spacing-md)" style={{ gridColumn: '1 / -1' }}>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? '💾 Saving...' : '💾 Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Grid>
            </form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default StudentProfile;
