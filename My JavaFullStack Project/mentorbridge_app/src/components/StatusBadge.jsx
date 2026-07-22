import React from 'react';

function StatusBadge({ status }) {
  const getBadgeClass = () => {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
      case 'ACCEPTED':
      case 'COMPLETED':
      case 'SUCCESS':
        return 'status-approved';
      case 'PENDING':
        return 'status-pending';
      case 'REJECTED':
      case 'CANCELLED':
      case 'FAILED':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  return (
    <span className={`status-badge ${getBadgeClass()}`}>
      {status || 'PENDING'}
    </span>
  );
}

export default StatusBadge;
