// src/components/CourseChat.jsx
import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../../api/chat';
// import { sendMessage, getMessages } from '../api/chat';

const CourseChat = ({ courseId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      const data = await getMessages(courseId);
      setMessages(data);
    };
    loadMessages();
  }, [courseId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(courseId, newMessage);
    setNewMessage('');
    // Обновляем сообщения после отправки
    const updatedMessages = await getMessages(courseId);
    setMessages(updatedMessages);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.userName}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Введите сообщение..."
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
};

export default CourseChat;