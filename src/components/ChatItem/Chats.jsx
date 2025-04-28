import React, { useEffect, useState } from 'react';
import { auth, getAllUsers, getUserData, userService } from '../../firebase'; // Импортируем нужные функции
import { Link } from 'react-router-dom';
import './ChatList.scss';

const Chats = () => {
  const [user, setUser] = useState(null);  // Данные текущего пользователя
  const [users, setUsers] = useState([]);  // Состояние для всех пользователей
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // Состояние для выбранного пользователя

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userData = await getUserData(currentUser.uid);
          setUser(userData);
        }
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Ошибка при получении списка пользователей:", error);
      }
    };

    fetchUser();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getAll();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении пользователей: ", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="chat-list">
      <div className="chat-list__container">
        <h2 className="chat-list__title">Все пользователи</h2>
        {users.length > 0 ? (
          <div className="chat-list__users">
            {users.map((userItem) => (
              <div
                className="chat-list__user"
                key={userItem.id}
                onClick={() => handleUserSelect(userItem.id)}
              >
                <img
                  className="chat-list__avatar"
                  src={userItem.photoURL || 'https://i.pravatar.cc/150?img=5'}
                  alt="Аватар"
                />
                <div className="chat-list__info">
                  <h3 className="chat-list__name">{userItem.displayName}</h3>
                  <p className="chat-list__email">{userItem.email}</p>
                </div>
                {selectedUser === userItem.id && (
                  <div className="chat-list__actions">
                    <Link to={`/personal/partner/chat/${userItem.id}`}>
                      <button className="chat-list__button">Написать</button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Пользователи не найдены</p>
        )}
      </div>
    </div>
  );
};

export default Chats;
