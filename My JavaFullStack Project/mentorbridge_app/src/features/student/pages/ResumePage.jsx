import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Grid,
  Flex,
  EmptyState,
  Alert,
} from '../components/UIComponents';
import { useStudentData } from '../hooks';
import { useResumeUpload } from '../hooks';
import styles from '../styles/Pages.module.css';

function ResumePage() {
  const { student, resume, setResume, fetchResume } = useStudentData();
  const { uploadResumeFile } = useResumeUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    const result = await uploadResumeFile(student.id, selectedFile);

    if (result.success) {
      setMessage('Resume uploaded successfully!');
      setSelectedFile(null);
      fetchResume(student.id);
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
          <h1 className={styles.pageTitle}>Resume</h1>
          <p className={styles.pageSubtitle}>Upload and get feedback from mentors</p>
        </div>
      </div>

      {message && (
        <Alert type="success" icon="✓" title="Success" message={message} onClose={() => setMessage('')} />
      )}

      {error && (
        <Alert type="error" icon="✕" title="Error" message={error} onClose={() => setError('')} />
      )}

      <Grid columns="auto-fit" minWidth="350px">
        {/* Upload Section */}
        <Card>
          <CardHeader title={resume ? 'Update Resume' : 'Upload Resume'} />
          <CardBody>
            <Flex direction="column" gap="var(--spacing-lg)" align="stretch">
              {!resume ? (
                <>
                  {/* Drop Zone */}
                  <div className={styles.resumeDropZone}>
                    <div className={styles.resumeIcon}>📄</div>
                    <p className={styles.resumeMessage}>Drag & drop your PDF here or click to browse</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                      id="resume-input"
                    />
                    <label htmlFor="resume-input" className="btn btn-primary" style={{ cursor: 'pointer' }}>
                      📤 Choose File
                    </label>
                    {selectedFile && (
                      <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--success-green)', fontSize: '0.9rem' }}>
                        ✓ {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    block
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                  >
                    {loading ? '⏳ Uploading...' : '📤 Upload Resume'}
                  </Button>
                </>
              ) : (
                <>
                  {/* Uploaded Resume */}
                  <div className={styles.resumeFile}>
                    <span className={styles.resumeFileIcon}>✓</span>
                    <div className={styles.resumeFileInfo}>
                      <div className={styles.resumeFileName}>{resume.fileName}</div>
                      <div className={styles.resumeFileTime}>Uploaded and verified</div>
                    </div>
                  </div>
                  <Button variant="outline" block onClick={() => window.open(resume.fileUrl || '#', '_blank')}>
                    📥 Download Resume
                  </Button>
                  <Button
                    variant="secondary"
                    block
                    onClick={() => {
                      setSelectedFile(null);
                      setResume(null);
                    }}
                  >
                    🔄 Upload New Resume
                  </Button>
                </>
              )}
            </Flex>
          </CardBody>
        </Card>

        {/* Feedback Section */}
        {resume && resume.feedback && (
          <Card>
            <CardHeader title="Mentor Feedback" subtitle="Latest feedback on your resume" />
            <CardBody>
              <div className={styles.resumeFeedback}>
                <div className={styles.resumeFeedbackLabel}>Feedback from Mentor</div>
                <p className={styles.resumeFeedbackText}>{resume.feedback}</p>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader title="Resume Tips" />
          <CardBody>
            <Flex direction="column" gap="var(--spacing-md)">
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>📝 Format</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Use PDF format for best compatibility. Keep it to 1-2 pages.
                </p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>🎯 Content</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Include relevant skills, projects, and experience. Make it ATS-friendly.
                </p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>✨ Polish</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Check for spelling and grammar. Use consistent formatting.
                </p>
              </div>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </div>
  );
}

export default ResumePage;
