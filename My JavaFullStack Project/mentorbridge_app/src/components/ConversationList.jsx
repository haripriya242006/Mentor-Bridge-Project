import React from 'react';

function ConversationList({ 
  conversations = [], 
  activeId, 
  onSelect, 
  role, 
  searchQuery = '', 
  onSearchChange 
}) {
  const isStudent = role === 'STUDENT';

  // Filter conversations by searchQuery
  const filteredConversations = conversations.filter(conv => {
    const name = isStudent ? conv.mentor?.name : conv.student?.name;
    return name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar-header">
        <h3>Chats</h3>
        <div className="search-container" style={{ margin: 0, maxWidth: '100%' }}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="conversation-list">
        {filteredConversations.length === 0 ? (
          <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No conversations found
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const partner = isStudent ? conv.mentor : conv.student;
            const name = partner?.name || 'User';
            const isActive = activeId === conv.id;

            return (
              <div
                key={conv.id}
                className={`conversation-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelect(conv)}
              >
                <div className="conversation-avatar-wrapper">
                  <div className="conversation-avatar">
                    <span>{name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="online-indicator" />
                </div>

                <div className="conversation-info">
                  <div className="conversation-meta">
                    <span className="conversation-name">{name}</span>
                    <span className="conversation-time">{conv.bookingDate || ''}</span>
                  </div>
                  <div className="conversation-details">
                    <span className="conversation-last-msg">
                      Session: {conv.topic || 'Mentorship Discussion'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ConversationList;
