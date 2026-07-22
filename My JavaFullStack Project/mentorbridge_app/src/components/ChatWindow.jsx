import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

function ChatWindow({ 
  messages = [], 
  activeConversation, 
  onSend, 
  text, 
  onTextChange, 
  role, 
  loading 
}) {
  const messagesEndRef = useRef(null);
  const isStudent = role === 'STUDENT';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onSend();
  };

  if (!activeConversation) {
    return (
      <div className="chat-window" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <EmptyState 
          icon="💬"
          title="Start Chatting"
          description="Select an approved booking from the sidebar conversation list to open a chat session."
        />
      </div>
    );
  }

  const partner = isStudent ? activeConversation.mentor : activeConversation.student;
  const name = partner?.name || 'User';

  return (
    <div className="chat-window">
      {/* Top Header */}
      <div className="chat-header animate-fade">
        <div className="chat-header-user">
          <div className="chat-header-avatar">
            <span>{name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="chat-header-info">
            <span className="chat-header-name">{name}</span>
            <span className="chat-header-status">Online</span>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="chat-action-btn" title="Start voice call" onClick={() => alert('Voice call feature coming soon!')}>
            📞
          </button>
          <button className="chat-action-btn" title="Start video call" onClick={() => alert('Video call feature coming soon!')}>
            🎥
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div className="chat-messages animate-fade">
        {loading ? (
          <LoadingSpinner />
        ) : messages.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EmptyState 
              icon="👋"
              title={`Say hello to ${name}`}
              description="Type a message below to start your mentorship discussion."
            />
          </div>
        ) : (
          messages.map((msg, index) => {
            // Determine if message is sent by current logged in user
            const isOwn = msg.senderRole === role;
            return (
              <MessageBubble 
                key={msg.id || index} 
                message={msg} 
                isOwnMessage={isOwn} 
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Form */}
      <form onSubmit={handleSubmit} className="chat-input-area">
        <button type="button" className="chat-action-btn" title="Attach Files" onClick={() => alert('Attachments coming soon!')}>
          📎
        </button>
        <button type="button" className="chat-action-btn" title="Emoji Keyboard" onClick={() => alert('Emojis coming soon!')}>
          😊
        </button>
        
        <div className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
