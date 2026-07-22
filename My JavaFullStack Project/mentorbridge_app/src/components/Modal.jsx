import React, { useEffect } from 'react';

function Modal({ isOpen, title, onClose, children, footer }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--spacing-md)',
        animation: 'fadeIn var(--transition-fast)'
      }}
      onClick={onClose}
    >
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-xl)',
          animation: 'slideUp var(--transition-fast)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="card-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--border)',
            backgroundColor: '#FFFFFF'
          }}
        >
          <h3 className="card-title" style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
            {title}
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              transition: 'color var(--transition-fast)'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--text-main)'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            ✕
          </button>
        </div>

        <div 
          className="card-body"
          style={{
            padding: 'var(--spacing-lg)',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 140px)'
          }}
        >
          {children}
        </div>

        {footer && (
          <div 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--spacing-sm)',
              backgroundColor: 'var(--background)'
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
