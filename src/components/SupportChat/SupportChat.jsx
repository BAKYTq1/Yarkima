import React, { useState } from 'react';
import axios from 'axios';
import './style.scss'; // стили добавим потом

const SupportChat = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Привет! Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');
  const apiKey = 'DDWlnVGpXBlF8ojP6KiF0SOs1Wh4vouE04uC1zWm'; // Trial ключ

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post(
        'https://api.cohere.ai/v1/chat',
        {
          message: input,
          connectors: [{ id: "web-search" }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const botReply = response.data.text || 'Извините, не смог ответить.';
      setMessages([...newMessages, { role: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Ошибка при обращении к Cohere:', error);
      setMessages([
        ...newMessages,
        { role: 'bot', text: 'Извините, возникла ошибка. Попробуйте позже.' }
      ]);
    }
  };

  return (
    <div className="support-chat">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Напишите сообщение..."
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default SupportChat;
