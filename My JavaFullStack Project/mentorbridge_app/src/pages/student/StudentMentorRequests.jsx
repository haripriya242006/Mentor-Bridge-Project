import React, { useEffect, useState } from 'react';
import { useStudentData } from '../../features/student/hooks';
import { getStudentRequests } from '../../services/authService';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

function StudentMentorRequests() {
  const { student, loading: studentLoading } = useStudentData();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      fetchRequests();
    }
  }, [student]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getStudentRequests(student.id);
      setRequests(res.data || []);
    } catch (err) {
      console.error('Failed to load requests:', err);
      setError('Failed to load connection requests.');
    } finally {
      setLoading(false);
    }
  };

  if (studentLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-fade">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Mentor Connection Requests</h1>
          <p className="header-subtitle">Track the status of your requests to industry mentors.</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 'var(--spacing-lg)' }}>
          {error}
        </div>
      )}

      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">Sent Invitations</h3>
          <span className="status-badge status-completed" style={{ fontSize: '0.8rem' }}>
            {requests.length} Total
          </span>
        </div>
        <div className="section-body">
          {requests.length === 0 ? (
            <EmptyState
              icon="📬"
              title="No requests sent yet"
              description="Browse the find mentors page to discover industry professionals and send request invitations."
            />
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mentor Name</th>
                    <th>Company</th>
                    <th>Invitation Message</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td>
                        <strong>{req.mentor?.name}</strong>
                      </td>
                      <td>{req.mentor?.company || 'Industry Professional'}</td>
                      <td>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          {req.message || 'Hello! I would love to connect with you on MentorBridge.'}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={req.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentMentorRequests;
