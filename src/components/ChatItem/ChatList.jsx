import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import chatlogo from '../../assets/image/chatlogo.png';
import './ChatList.scss';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const db = getFirestore();

  // Загружаем чаты из Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
      const chatList = snapshot.docs.map((doc) => doc.data());
      setChats(chatList);
    });

    return () => unsubscribe(); // очищаем подписку на события при размонтировании компонента
  }, [db]);

  return (
    <div className="chat-list">
      <div className="chat-list-content">
        {chats.map((chat, index) => (
          <div key={index} className="chat-item">
            <div className="chat-avatar">
              <img src={chat.avatar || chatlogo} alt={chat.name} />
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
