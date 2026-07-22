import React from 'react';

function EmptyState({ icon = '📭', title = 'No Data Found', description = '', action }) {
  return (
    <div className="empty-state-container animate-fade">
      <div className="empty-state-icon">{icon}</div>
      <h4 className="empty-state-title">{title}</h4>
      {description && <p className="empty-state-description">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
