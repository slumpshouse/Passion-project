import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ChatRoom = () => {
  const { selectedLanguage } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Simulate fetching online users and messages
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Maria', language: selectedLanguage, avatar: '👩' },
      { id: 2, name: 'John', language: selectedLanguage, avatar: '👨' },
      { id: 3, name: 'Yuki', language: selectedLanguage, avatar: '👧' },
      { id: 4, name: 'Pedro', language: selectedLanguage, avatar: '👦' },
    ];

    const mockMessages = [
      { id: 1, user: 'Maria', avatar: '👩', text: `Hello everyone! Learning ${selectedLanguage} too!`, time: '2 min ago' },
      { id: 2, user: 'John', avatar: '👨', text: 'Anyone want to practice conversation?', time: '5 min ago' },
      { id: 3, user: 'Yuki', avatar: '👧', text: `I've been studying ${selectedLanguage} for 3 months!`, time: '10 min ago' },
    ];

    setOnlineUsers(mockUsers);
    setMessages(mockMessages);
  }, [selectedLanguage]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      user: 'You',
      avatar: '😊',
      text: newMessage,
      time: 'Just now',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-room">
      <h2>💬 Community Chat</h2>
      <p className="chat-subtitle">Connect with others learning {selectedLanguage}</p>

      <div className="chat-container">
        <div className="online-users">
          <h3>🟢 Online ({onlineUsers.length})</h3>
          <div className="user-list">
            {onlineUsers.map(user => (
              <div key={user.id} className="user-item">
                <span className="user-avatar">{user.avatar}</span>
                <span className="user-name">{user.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-messages">
          <div className="messages-list">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.user === 'You' ? 'own-message' : ''}`}>
                <span className="message-avatar">{message.avatar}</span>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-user">{message.user}</span>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <p className="message-text">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="message-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
