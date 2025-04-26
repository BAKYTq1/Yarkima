import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../firebase';
import { Link } from 'react-router-dom';
import './style.scss';

const PublicProfile = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('info');

  const mockUser = {
    username: 'Алиса Иванова',
    email: 'alisa@example.com',
    photoURL: 'https://i.pravatar.cc/150?img=5',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <p className="profile-content__text">Здесь будет информация о пользователе.</p>;
      case 'favorites':
        return <p className="profile-content__text">Здесь избранные курсы.</p>;
      case 'my-courses':
        return <p className="profile-content__text">Здесь курсы пользователя.</p>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__header">
          <img className="profile__avatar" src={mockUser.photoURL} alt="Аватар" />
          <div className="profile__info">
            <h2 className="profile__username">{mockUser.username}</h2>
            <p className="profile__email">{mockUser.email}</p>
          </div>
          <div className="profile__actions">
            <Link to="/chats">
              <button className="profile__button">Написать</button>
            </Link>
            <button className="profile__button profile__button--gradient">Моя визитка</button>
          </div>
        </div>

        <div className="profile__tabs">
          <button
            className={`profile__tab ${activeTab === 'info' ? 'profile__tab--active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Информация
          </button>
          <button
            className={`profile__tab ${activeTab === 'favorites' ? 'profile__tab--active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Избранные курсы
          </button>
          <button
            className={`profile__tab ${activeTab === 'my-courses' ? 'profile__tab--active' : ''}`}
            onClick={() => setActiveTab('my-courses')}
          >
            Мои курсы
          </button>
        </div>

        <div className="profile__content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
