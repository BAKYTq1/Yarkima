import React from 'react';
import chatlogo from '../../assets/image/chatlogo.png';
import Sidebar from "./Sidebar"
import './ChatList.scss';

const chats = [
  {
    name: 'Arcan_7',
    message: 'Привет, как дела? Прошел вчера новый курс по английскому языку, есть пара моментов...',
    time: '11:21',
    avatar: chatlogo
  },
  {
    name: 'Daniil.design',
    message: 'Когда новый курс?',
    time: '28.03.2024',
    avatar: chatlogo
  },
  {
    name: 'Viktorr.22',
    message: 'Как мне начать делать курсы на интересующие меня темы и получать вознаграждение?',
    time: '28.03.2024',
    avatar: chatlogo
  }
];

const ChatList = () => {
  return (
    <div className="chat-list container">
      <div className='sidebar'>
      <Sidebar />
      </div>
      <div className='chat-list-content'>
      {chats.map((chat, index) => (
        <div key={index} className="chat-item">
          <div className="chat-avatar">
            <img src={chat.avatar} alt={chat.name} />
          </div>
          <div className="chat-content">
            <div className="chat-header">
              <h3 className="chat-name">{chat.name}</h3>
              <span className="chat-time">{chat.time}</span>
            </div>
            <p className="chat-message">{chat.message}</p>
          </div>
        </div>
      ))}

      </div>
    </div>
  );
};

export default ChatList;
