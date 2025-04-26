import React from 'react';
import grouplogo from '../../assets/image/grouplogo.png';
import Sidebar from "../ChatItem/Sidebar";
import './Group.scss';

const chats = [
  {
      title: 'Русский язык',
      name: 'Arcan_7:',
    message: 'Привет, как дела? Прошел вчера новый курс по русскому языку, есть пара моментов, которые хотелось бы обсудить. Когда сможешь?',
    time: '11:21',
    avatar: grouplogo
  },
  {
    title: 'Английский язык',
    name: 'Mr_yarkima:',
  message: 'Когда ожидать курс для подготовки к егэ?',
  time: '28.03.2024',
  avatar: grouplogo
},
{
    title: 'Немецкий язык',
    name: 'Вы:',
  message: 'Когда ожидать курс для подготовки к егэ?',
  time: '28.03.2024',
  avatar: grouplogo
},
];

const Group = () => {
  return (
      <div className="chat-list">
      <div className="sidebar">
        <Sidebar />
      </div>
        <div className="chat-list-content">
          {chats.map((chat, index) => (
            <div key={index} className="chat-item">
              <div className="chat-avatar">
                <img src={chat.avatar} alt={chat.name} />
              </div>
              <div className="chat-content">
                <div className="chat-header">
                  <h3 className="chat-title">{chat.title}</h3>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <p className="chat-message"><span className='chat-name'>{chat.name}</span>{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Group;
