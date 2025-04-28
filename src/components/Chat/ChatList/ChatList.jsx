import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import { firestore } from '../../../firebase-config';
import { getAuth } from 'firebase/auth';
import '../style.scss';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const messagesEndRef = useRef(null);

  // Загрузка чатов
  useEffect(() => {
    if (currentUser) loadChats();
  }, [currentUser]);

  // Загрузка сообщений чата
  useEffect(() => {
    if (!chatId) return;
    const messagesQuery = query(
      collection(firestore, 'chats', chatId, 'messages'),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Загрузка чатов для текущего пользователя
  const loadChats = async () => {
    try {
      const chatsRef = collection(firestore, 'chats');
      const q = query(chatsRef, where('users', 'array-contains', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const chatsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatsData);
    } catch (err) {
      console.error('Ошибка загрузки чатов', err);
    }
  };

  // Загрузка пользователей
  const loadUsers = async () => {
    try {
      const usersRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(usersRef);
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (err) {
      console.error('Ошибка загрузки пользователей', err);
    }
  };

  // Создание группы
  const createGroup = async () => {
    if (!groupName || selectedUsers.length === 0) {
      alert('Введите название группы и выберите участников.');
      return;
    }
    try {
      const newChatRef = await addDoc(collection(firestore, 'chats'), {
        name: groupName,
        users: [...selectedUsers, currentUser.uid],
        createdAt: serverTimestamp(),
      });
      setShowModal(false);
      setGroupName('');
      setSelectedUsers([]);
      await loadChats();
      setChatId(newChatRef.id);
    } catch (err) {
      console.error('Ошибка создания группы', err);
    }
  };

  // Отправка сообщения
  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;
    try {
      const messageRef = collection(firestore, 'chats', chatId, 'messages');
      await addDoc(messageRef, {
        text: newMessage,
        senderId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setNewMessage('');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Ошибка отправки сообщения', err);
    }
  };

  // Получаем имя пользователя по его ID
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.displayName : 'Неизвестный';
  };

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <button
          className="chat__create-button"
          onClick={() => {
            loadUsers();
            setShowModal(true);
          }}
        >
          Создать группу
        </button>

        <div className="chat__list">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`chat__list-item ${chat.id === chatId ? 'chat__list-item--active' : ''}`}
              onClick={() => setChatId(chat.id)}
            >
              <h2>{chat.name}</h2>
            </div>
          ))}
        </div>
      </aside>

      <main className="chat__main">
        {chatId ? (
          <>
            <div className="chat__messages">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`chat__message ${msg.senderId === currentUser?.uid ? 'chat__message--sent' : 'chat__message--received'}`}
                >
                  <div>
                  <div className="chat__message-user">{getUserName(msg.senderId)}</div>
                  <div className="chat__message-text">{msg.text}</div>
                  </div>
                  <div className="chat__message-time">
                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString() : ''}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat__input">
              <input
                type="text"
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="chat__input-field"
              />
              <button
                className="chat__send-button"
                onClick={sendMessage}
              >
                Отправить
              </button>
            </div>
          </>
        ) : (
          <div className="chat__no-chat">
            Выберите группу для начала общения
          </div>
        )}
      </main>

      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Создать новую группу</h2>
            <input
              type="text"
              placeholder="Название группы"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="modal__input"
            />
            <div className="modal__user-list">
              {users.map(user => (
                <label key={user.id} className="modal__user-item">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => {
                      if (selectedUsers.includes(user.id)) {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                      } else {
                        setSelectedUsers([...selectedUsers, user.id]);
                      }
                    }}
                    className="modal__checkbox"
                  />
                  <span>{user.displayName || user.email}</span>
                </label>
              ))}
            </div>
            <div className="modal__buttons">
              <button className="modal__button" onClick={createGroup}>Создать</button>
              <button className="modal__button modal__button--cancel" onClick={() => setShowModal(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
