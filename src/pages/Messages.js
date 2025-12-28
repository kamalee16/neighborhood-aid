import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
  const { user } = useAuth();
  const { messages, sendMessage, markMessageAsRead } = useData();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  // Group messages by conversation
  const conversations = messages.reduce((acc, message) => {
    const otherUserId = message.senderId === 'current-user' ? message.recipientId : message.senderId;
    if (!acc[otherUserId]) {
      acc[otherUserId] = [];
    }
    acc[otherUserId].push(message);
    return acc;
  }, {});

  // Mock user data for conversations
  const mockUsers = {
    'elderly-neighbor': { name: 'Margaret Smith', avatar: '👵' },
    'busy-parent': { name: 'David Johnson', avatar: '👨' },
    'handy-helper': { name: 'Mike Wilson', avatar: '🔧' },
    'student-tutor': { name: 'Sarah Chen', avatar: '📚' }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      sendMessage(selectedConversation, newMessage.trim());
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getLastMessage = (conversationMessages) => {
    const sorted = conversationMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sorted[0];
  };

  return (
    <div className="messages">
      <div className="container">
        <div className="messages-header">
          <h1>Messages</h1>
          <p>Communicate safely with your neighbors</p>
        </div>

        <div className="messages-container">
          {/* Conversations List */}
          <div className="conversations-sidebar">
            <div className="sidebar-header">
              <h3>Conversations</h3>
            </div>
            
            {Object.keys(conversations).length === 0 ? (
              <div className="no-conversations">
                <div className="no-conversations-icon">💬</div>
                <h4>No Messages Yet</h4>
                <p>Start helping neighbors to begin conversations</p>
              </div>
            ) : (
              <div className="conversations-list">
                {Object.entries(conversations).map(([userId, conversationMessages]) => {
                  const lastMessage = getLastMessage(conversationMessages);
                  const user = mockUsers[userId] || { name: 'Unknown User', avatar: '👤' };
                  const unreadCount = conversationMessages.filter(m => !m.read && m.senderId !== 'current-user').length;
                  
                  return (
                    <div
                      key={userId}
                      className={`conversation-item ${selectedConversation === userId ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedConversation(userId);
                        // Mark messages as read
                        conversationMessages.forEach(msg => {
                          if (!msg.read && msg.senderId !== 'current-user') {
                            markMessageAsRead(msg.id);
                          }
                        });
                      }}
                    >
                      <div className="conversation-avatar">
                        {user.avatar}
                      </div>
                      <div className="conversation-info">
                        <div className="conversation-header">
                          <h4>{user.name}</h4>
                          <span className="message-time">
                            {formatTime(lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="last-message">
                          {lastMessage.senderId === 'current-user' ? 'You: ' : ''}
                          {lastMessage.content.substring(0, 50)}
                          {lastMessage.content.length > 50 ? '...' : ''}
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <div className="unread-badge">
                          {unreadCount}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="chat-area">
            {selectedConversation ? (
              <>
                <div className="chat-header">
                  <div className="chat-user-info">
                    <div className="chat-avatar">
                      {mockUsers[selectedConversation]?.avatar || '👤'}
                    </div>
                    <div className="chat-user-details">
                      <h3>{mockUsers[selectedConversation]?.name || 'Unknown User'}</h3>
                      <span className="user-status">Active now</span>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="btn btn-outline btn-sm">
                      View Profile
                    </button>
                  </div>
                </div>

                <div className="messages-area">
                  {conversations[selectedConversation]
                    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                    .map(message => (
                      <div
                        key={message.id}
                        className={`message ${message.senderId === 'current-user' ? 'sent' : 'received'}`}
                      >
                        <div className="message-content">
                          {message.content}
                        </div>
                        <div className="message-time">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    ))}
                </div>

                <form onSubmit={handleSendMessage} className="message-input-form">
                  <div className="message-input-container">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="message-input"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="no-chat-selected">
                <div className="no-chat-icon">💬</div>
                <h3>Select a Conversation</h3>
                <p>Choose a conversation from the sidebar to start messaging</p>
              </div>
            )}
          </div>
        </div>

        {/* Safety Notice */}
        <div className="messaging-safety">
          <div className="safety-icon">🛡️</div>
          <div className="safety-content">
            <h4>Safe Messaging Guidelines</h4>
            <ul>
              <li>Keep conversations respectful and on-topic</li>
              <li>Never share personal information like addresses or phone numbers</li>
              <li>Report any inappropriate or suspicious messages</li>
              <li>Meet in public places for first-time interactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;