import React from 'react';

function MessageBubble({ message, isOwnMessage }) {
  if (!message) return null;

  // Format timestamp (assume ISO date or simple string)
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      const date = new Date(timeStr);
      if (isNaN(date.getTime())) return timeStr;
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return timeStr;
    }
  };

  return (
    <div className={`message-group ${isOwnMessage ? 'sent' : 'received'}`}>
      <div className="message-bubble">
        {message.message}
      </div>
      <div className="message-footer">
        <span>{formatTime(message.timestamp || message.time)}</span>
        {isOwnMessage && (
          <span className="message-status read">✓✓</span>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
