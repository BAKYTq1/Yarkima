import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SupportChat = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Привет! Чем могу помочь?' }
  ]); 
  const [ai , setAi] = useState('Копировать')
  const [input, setInput] = useState('');
  const apiKey = 'DDWlnVGpXBlF8ojP6KiF0SOs1Wh4vouE04uC1zWm';

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
  const handleClick = () => {
    setAi('Скопировано');
    setTimeout(() => setAi('Копировать'), 2000); // Через 2 секунды вернуть обратно
  };

  const renderMessage = (msg, i) => {
    if (msg.role === 'bot' && msg.text.includes('```')) {
      const parts = msg.text.split(/```/);
      return (
        <div key={i} className="message bot">
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              const [lang, ...codeLines] = part.split('\n');
              const code = codeLines.join('\n');
              return (
                <div className="code-block" key={index}>
                  <SyntaxHighlighter language={lang || 'javascript'} style={oneDark}>
                    {code}
                  </SyntaxHighlighter>
                  <button
  className="copy-btn"
  onClick={async () => {
    try {
      await navigator.clipboard.writeText(code);
      handleClick();
    } catch (err) {
      console.error('Ошибка при копировании:', err);
    }
  }}
>
  <p>{ai}</p>
</button>

                </div>
              );
            }
            return <p key={index}>{part}</p>;
          })}
        </div>
      );
    }

    return (
      <div key={i} className={`message ${msg.role}`}>
        {msg.text}
      </div>
    );
  };

  return (
    <div className="support-chat">
      <div className="messages">
        {messages.map(renderMessage)}
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
