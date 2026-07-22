import React, { useState } from 'react';
import { useStudentData, useResumeUpload } from '../../features/student/hooks';
import ResumeCard from '../../components/ResumeCard';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentResume() {
  const { student, resume, setResume, fetchResume, loading } = useStudentData();
  const { uploadResumeFile } = useResumeUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    if (file.type !== 'application/pdf') {
      setErr('Only PDF resumes are supported.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErr('File size must not exceed 5MB.');
      return;
    }
    setSelectedFile(file);
    setErr('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setErr('Please select a file to upload.');
      return;
    }
    setUploading(true);
    setErr('');
    setMsg('');

    const res = await uploadResumeFile(student.id, selectedFile);
    setUploading(false);

    if (res.success) {
      setMsg('Resume uploaded successfully!');
      setSelectedFile(null);
      fetchResume(student.id);
      setTimeout(() => setMsg(''), 4000);
    } else {
      setErr(res.error || 'Failed to upload resume.');
    }
  };

  const triggerDownload = () => {
    if (resume) {
      // In Spring Boot backend, resume is downloadable via download API.
      // Let's open the API url directly or open link.
      window.open(`http://localhost:8080/api/resume/download/${student.id}`, '_blank');
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
          <h1 className="header-title">Resume Review</h1>
          <p className="header-subtitle">Submit your professional resume for feedback and improvement tips.</p>
        </div>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-lg)' }}>
        
        {/* Upload Zone Panel */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">{resume ? 'Update Resume File' : 'Upload Resume Document'}</h3>
          </div>
          <div className="section-body flex-col gap-md">
            
            {/* Drag & Drop Area */}
            <div 
              className={`upload-area ${dragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('resume-file-picker').click()}
            >
              <input
                id="resume-file-picker"
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div className="upload-icon">📄</div>
              <p className="upload-text">
                {selectedFile ? selectedFile.name : 'Drag and drop your PDF resume here'}
              </p>
              <p className="upload-hint">or click to browse from folders (Max 5MB)</p>
            </div>

            <button 
              className="btn btn-primary w-full"
              onClick={handleUploadSubmit}
              disabled={!selectedFile || uploading}
            >
              {uploading ? '⏳ Uploading Document...' : '📤 Upload Resume'}
            </button>
          </div>
        </div>

        {/* Status / Feedback Cards */}
        <div className="flex-col gap-lg">
          {resume ? (
            <>
              {/* File Card */}
              <ResumeCard 
                resume={resume} 
                onDownload={triggerDownload} 
                onUploadNew={() => setResume(null)}
              />

              {/* Feedback Card */}
              <div className="card shadow-sm animate-fade">
                <div className="card-header">
                  <h3 className="card-title">Mentor Review Feedback</h3>
                </div>
                <div className="card-body">
                  {resume.feedback ? (
                    <div className="alert alert-success" style={{ display: 'block', margin: 0 }}>
                      <strong>Review Notes:</strong>
                      <p style={{ marginTop: 'var(--spacing-xs)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                        {resume.feedback}
                      </p>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-md)', color: 'var(--text-muted)' }}>
                      ⏳ Awaiting review comments. Your assigned mentors will post feedback soon.
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              icon="📄"
              title="No Resume Uploaded"
              description="Upload your resume in PDF format on the left to request constructive feedback."
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default StudentResume;
