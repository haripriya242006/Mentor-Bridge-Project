import React from 'react';
import styles from '../styles/Components.module.css';

/* CARD COMPONENT */
export function Card({ children, className = '', ...props }) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, actions, children }) {
  return (
    <div className={styles.cardHeader}>
      <div>
        {title && <h3 className={styles.cardTitle}>{title}</h3>}
        {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={styles.cardActions}>{actions}</div>}
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`${styles.cardBody} ${className}`}>{children}</div>;
}

/* BUTTON COMPONENT */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  className = '',
  ...props
}) {
  let variantClass = styles.buttonPrimary;
  if (variant === 'success') variantClass = styles.buttonSuccess;
  if (variant === 'warning') variantClass = styles.buttonWarning;
  if (variant === 'danger') variantClass = styles.buttonDanger;
  if (variant === 'secondary') variantClass = styles.buttonSecondary;
  if (variant === 'outline') variantClass = styles.buttonOutline;
  if (variant === 'ghost') variantClass = styles.buttonGhost;

  let sizeClass = '';
  if (size === 'sm') sizeClass = styles.buttonSm;
  if (size === 'lg') sizeClass = styles.buttonLg;

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} ${block ? styles.buttonBlock : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/* BADGE COMPONENT */
export function Badge({ status, size = 'md', className = '' }) {
  let statusClass = '';
  if (status === 'SUCCESS' || status === 'APPROVED' || status === 'COMPLETED') {
    statusClass = styles.badgeSuccess;
  } else if (status === 'PENDING') {
    statusClass = styles.badgePending;
  } else if (status === 'REJECTED') {
    statusClass = styles.badgeRejected;
  } else if (status === 'APPROVED') {
    statusClass = styles.badgeApproved;
  }

  let sizeClass = '';
  if (size === 'md') sizeClass = styles.badgeMd;
  if (size === 'lg') sizeClass = styles.badgeLg;

  return (
    <span className={`${styles.badge} ${statusClass} ${sizeClass} ${className}`}>
      {status}
    </span>
  );
}

/* TABLE COMPONENT */
export function Table({ headers, rows, onRowClick, className = '' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={`${styles.table} ${className}`}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={styles.tableRow}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {Array.isArray(row) ? (
                row.map((cell, cellIdx) => (
                  <td key={cellIdx} className={styles.tableCell}>
                    {cell}
                  </td>
                ))
              ) : (
                <td colSpan={headers.length} className={styles.tableCell}>
                  {row}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* EMPTY STATE COMPONENT */
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>{icon}</div>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      {description && <p className={styles.emptyStateDescription}>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

/* STATS CARD COMPONENT */
export function StatsCard({ icon, title, value, trend, color = 'primary' }) {
  let borderColor = 'var(--primary-blue)';
  if (color === 'success') borderColor = 'var(--success-green)';
  if (color === 'warning') borderColor = 'var(--warning-orange)';
  if (color === 'danger') borderColor = 'var(--danger-red)';

  return (
    <Card style={{ borderLeft: `4px solid ${borderColor}`, minHeight: '120px' }}>
      <CardBody>
        <div className={styles.statsCard}>
          <span className={styles.statsCardIcon}>{icon}</span>
          <p className={styles.statsCardTitle}>{title}</p>
          <p className={styles.statsCardValue}>{value}</p>
          {trend && (
            <span className={`${styles.statsCardTrend} ${trend.direction === 'up' ? styles.trendUp : styles.trendDown}`}>
              {trend.direction === 'up' ? '📈' : '📉'} {trend.text}
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

/* FORM GROUP COMPONENT */
export function FormGroup({ label, children, error, ...props }) {
  return (
    <div className={styles.formGroup} {...props}>
      {label && <label className={styles.formLabel}>{label}</label>}
      {children}
      {error && <small style={{ color: 'var(--danger-red)' }}>{error}</small>}
    </div>
  );
}

/* INPUT COMPONENT */
export function Input({ label, error, className = '', ...props }) {
  return (
    <FormGroup label={label} error={error}>
      <input className={`${styles.formInput} ${className}`} {...props} />
    </FormGroup>
  );
}

/* SELECT COMPONENT */
export function Select({ label, options, error, className = '', ...props }) {
  return (
    <FormGroup label={label} error={error}>
      <select className={`${styles.formSelect} ${className}`} {...props}>
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
}

/* TEXTAREA COMPONENT */
export function Textarea({ label, error, className = '', ...props }) {
  return (
    <FormGroup label={label} error={error}>
      <textarea className={`${styles.formTextarea} ${className}`} {...props} />
    </FormGroup>
  );
}

/* MODAL COMPONENT */
export function Modal({ isOpen, title, onClose, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {title && (
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
            <button className={styles.modalClose} onClick={onClose}>
              ✕
            </button>
          </div>
        )}
        <div className={styles.modalBody}>{children}</div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );
}

/* ALERT COMPONENT */
export function Alert({ type = 'info', icon, title, message, onClose }) {
  let alertClass = styles.alertInfo;
  if (type === 'success') alertClass = styles.alertSuccess;
  if (type === 'error') alertClass = styles.alertError;
  if (type === 'warning') alertClass = styles.alertWarning;

  return (
    <div className={`${styles.alert} ${alertClass}`}>
      {icon && <span className={styles.alertIcon}>{icon}</span>}
      <div className={styles.alertContent}>
        {title && <h4 className={styles.alertTitle}>{title}</h4>}
        {message && <p className={styles.alertMessage}>{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            color: 'inherit',
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* GRID LAYOUT COMPONENT */
export function Grid({ children, columns = 'auto-fit', minWidth = '250px', gap = 'var(--spacing-lg)', className = '' }) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
}

/* FLEX LAYOUT COMPONENT */
export function Flex({ children, direction = 'row', gap = 'var(--spacing-md)', align = 'center', justify = 'flex-start', className = '', ...props }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: gap,
        alignItems: align,
        justifyContent: justify,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
