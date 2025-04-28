import React, { useEffect, useState } from 'react';
import { auth, getAllUsers, getUserData, userService } from '../../firebase'; // Импортируем нужные функции
import { Link } from 'react-router-dom';
import './style.scss';

const PublicProfile = () => {
  const [user, setUser] = useState(null);  // Данные текущего пользователя
  const [users, setUsers] = useState([]);  // Состояние для всех пользователей
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем данные текущего пользователя
    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userData = await getUserData(currentUser.uid);
          console.log("Текущий пользователь:", userData);
          setUser(userData);
        } else {
          console.log("Пользователь не авторизован.");
        }
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    // Получаем всех пользователей из Firestore
    const fetchAllUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        console.log("Все пользователи:", allUsers);  // Логируем всех пользователей
        setUsers(allUsers);  // Обновляем состояние с пользователями
      } catch (error) {
        console.error("Ошибка при получении списка пользователей:", error);
      }
    };

    fetchUser();
    fetchAllUsers();  // Загружаем всех пользователей при монтировании компонента
  }, []);  // Зависимость пустая, значит эффект выполнится только при монтировании компонента

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getAll();
        setUsers(usersData);  // Сохраняем пользователей в state
        setLoading(false);  // Останавливаем загрузку
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    fetchUsers();  // Загружаем пользователей при монтировании компонента
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="profile">
      <div className="profile__container">
        {users.length > 0 ? (
          <ul>
            {users.map((userItem) => (
              <div className="profile__header" key={userItem.id}>
                <img
                  className="profile__avatar"
                  src={userItem.photoURL || 'https://i.pravatar.cc/150?img=5'}
                  alt="Аватар"
                />
                <div className="profile__info">
                  <h2 className="profile__username">{userItem.displayName}</h2>
                  <p className="profile__email">{userItem.email}</p>
                </div>
                <div className="profile__actions">
                  <Link to={`chat/${userItem.id} `}>
                    <button className="profile__button">Написать</button>
                  </Link>
                  <button className="profile__button profile__button--gradient">Моя визитка</button>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>Пользователи не найдены</p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
