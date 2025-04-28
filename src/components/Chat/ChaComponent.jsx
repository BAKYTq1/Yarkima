import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  firestore, 
  collection, 
  query, 
  orderBy, 
  addDoc, 
  onSnapshot, 
  serverTimestamp, 
  getDocs 
} from '../../firebase-config';  
import './style.scss';

const ChatComponent = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const currentUserId = 'exampleUserId'; // Замените на реальный ID пользователя

  // Загружаем список пользователей один раз
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersRef = collection(firestore, 'users');
        const querySnapshot = await getDocs(usersRef);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setUsers(usersData);
        console.log('Загруженные пользователи:', usersData);  // Лог для проверки загрузки пользователей
      } catch (err) {
        console.error('Ошибка загрузки пользователей', err);
      }
    };

    loadUsers();
  }, []);

  // Получаем сообщения в реальном времени
  useEffect(() => {
    setLoading(true);

    const messagesRef = collection(firestore, 'chats', id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));

      setMessages(messagesData);
      console.log('Загруженные сообщения:', messagesData);  // Лог для проверки загрузки сообщений

      // Загружаем имена пользователей для всех сообщений
      if (messagesData.length > 0) {
        const userIds = messagesData.map(msg => msg.userId);
        const uniqueUserIds = [...new Set(userIds)];  // Получаем уникальные userId

        const usersInfo = users.filter(user => uniqueUserIds.includes(user.id));
        const userNames = usersInfo.reduce((acc, user) => {
          acc[user.id] = user.name;  // Создаем объект с именами пользователей по userId
          return acc;
        }, {});

        setUserName(userNames);
      }

      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, users]); // Зависимость от users убрана, так как загрузка пользователей происходит только один раз

  // Функция для отправки нового сообщения
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const messagesRef = collection(firestore, 'chats', id, 'messages');
      
      await addDoc(messagesRef, {
        text: newMessage,
        userId: currentUserId,
        timestamp: serverTimestamp() // Используем серверное время
      });

      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
      alert('Не удалось отправить сообщение');
    }
  };

  // Функция для форматирования даты
  const formatDate = (date) => {
    if (!(date instanceof Date)) return '';

    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit', 
      month: '2-digit'
    });
  };

  return (
    <div className="chat-container">
      <h2>Чат</h2>

      {loading ? (
        <div className="loading">Загрузка сообщений...</div>
      ) : messages.length === 0 ? (
        <div className="no-messages">Нет сообщений</div>
      ) : (
        <div className="messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.userId === currentUserId ? 'my-message' : 'other-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {formatDate(message.timestamp)}
                </span>
                <div className="message-user">
                  {userName[message.userId] || 'Неизвестный'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim() || loading}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
