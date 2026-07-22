import React from 'react';

function DashboardCard({ icon, title, value, trend, color = 'primary', onClick }) {
  return (
    <div 
      className={`metric-card metric-card-${color}`} 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="metric-card-icon">
        {icon}
      </div>
      <div className="metric-card-content">
        <span className="metric-card-title">{title}</span>
        <span className="metric-card-value">{value}</span>
        {trend && (
          <span className={`metric-card-trend ${trend.direction}`}>
            {trend.direction === 'up' ? '▲' : '▼'} {trend.text}
          </span>
        )}
      </div>
    </div>
  );
}

export default DashboardCard;
