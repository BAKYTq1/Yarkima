import { useState, useEffect } from 'react';
import { auth, subscribeToMessages, sendMessage } from '../../firebase';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((messages) => {
      setMessages(messages);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    if (!auth.currentUser) {
      setError('Требуется авторизация');
      return;
    }

    try {
      await sendMessage(
        newMessage, 
        auth.currentUser.uid,
        auth.currentUser.displayName || auth.currentUser.email.split('@')[0],
        auth.currentUser.email
      );
      setNewMessage('');
      setError(null);
    } catch (err) {
      setError('Ошибка отправки: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Загрузка сообщений...</div>;

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.uid === auth.currentUser?.uid ? 'own-message' : ''}`}
          >
            <div className="message-header">
              <span className="user-name">
                {msg.displayName || msg.userEmail || 'Аноним'}
              </span>
              <span className="message-time">
                {msg.timestamp?.toDate().toLocaleTimeString()}
              </span>
            </div>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
          className="message-input"
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!newMessage.trim()}
        >
          Отправить
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Chat;