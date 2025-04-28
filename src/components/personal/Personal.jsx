import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './personal.scss';
import defaultAvatar from '../../assets/image/personal-man.png';
import { Link } from 'react-router-dom';

function Personal() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [photoURL, setPhotoURL] = useState(defaultAvatar);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  // Инициализация Firebase
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Начинаем загрузку, когда состояние аутентификации меняется

      if (currentUser) {
        setUser(currentUser);
        
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

          if (data.photoURL) {
            try {
              const url = await getDownloadURL(ref(storage, data.photoURL));
              setPhotoURL(url);
            } catch (error) {
              console.error("Error loading photo:", error);
              setPhotoURL(defaultAvatar); // В случае ошибки загружаем фото по умолчанию
            }
          } else {
            setPhotoURL(defaultAvatar); // Если фото не задано, ставим фото по умолчанию
          }
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      
      setLoading(false); // Завершаем загрузку
    });

    return () => unsubscribe(); // Очищаем подписку на изменения состояния аутентификации
  }, [auth, db, storage]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Выход выполнен успешно!');
    }).catch((error) => {
      console.error('Ошибка при выходе:', error);
    });
  };

  const renderContent = () => {
    if (loading) return <div>Загрузка...</div>;

    if (!user) {
      return <div>Пожалуйста, войдите в систему</div>;
    }

    switch (activeTab) {
      case 'info':
        return (
          <div className="personal__profiles">
            <h1>Информация о пользователе</h1>
            <div className="personal__info">
              <img 
                src={photoURL} 
                alt="User"
                width={150} 
                className="personal__avatar"
                onError={(e) => e.target.src = defaultAvatar} // Обработка ошибок при загрузке изображения
              />
              <div className="personal__text">
                <div>
                  <h2>{userData?.username || user.displayName || 'Пользователь'}</h2>
                  <p>{user.email || 'Email не указан'}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="personal__profiles">
            <h2>Избранные курсы</h2>
            <p>Здесь будут отображаться ваши избранные курсы</p>
          </div>
        );
      case 'my-courses':
        return (
          <div className="personal__profiles">
            <h2>Мои курсы</h2>
            <p>Здесь будут отображаться курсы, на которые вы подписаны</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="personal">
      <div className="personal__flex">
        <div className="personal__content">
          <div className="personal__profile">
            {user ? (
              <div className="personal__info">
                <img 
                  src={photoURL} 
                  alt="User" 
                  className="personal__avatar"
                  onError={(e) => e.target.src = defaultAvatar} // Обработка ошибок при загрузке изображения
                />
                <div className="personal__text">
                  <div>
                    <h1>{userData?.username || user.displayName || 'Пользователь'}</h1>
                    <p>{user.email || 'Email не указан'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>Пожалуйста, войдите в систему</div>
            )}
            <div className="btn__buttons">
              <Link to={'/infoblock'}><button>Настройки</button></Link>
              {user && (
                <button className="btn__gradient" onClick={handleSignOut}>Выйти</button>
              )}
            </div>
          </div>

          <div className="personal__word">
            <button
              className={activeTab === 'info' ? 'active' : ''}
              onClick={() => setActiveTab('info')}
            >
              Информация
            </button>
            <button
              className={activeTab === 'favorites' ? 'active' : ''}
              onClick={() => setActiveTab('favorites')}
            >
              Избранные курсы
            </button>
            <button
              className={activeTab === 'my-courses' ? 'active' : ''}
              onClick={() => setActiveTab('my-courses')}
            >
              Мои курсы
            </button>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Personal;
