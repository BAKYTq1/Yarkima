import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './personal.scss';
import defaultAvatar from '../../assets/image/personal-man.png';
import { CgProfile } from "react-icons/cg";
import { GiPostOffice } from "react-icons/gi";
import { RiSettings3Line } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import { MdGroups2 } from "react-icons/md";
import { Link } from 'react-router-dom';
function Personal() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [photoURL, setPhotoURL] = useState(defaultAvatar);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [activeSidebarTop, setActiveSidebarTop] = useState('public');
  const [activeSidebarBottom, setActiveSidebarBottom] = useState('dating');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const moreButtonRef = useRef(null);

  // Инициализация Firebase
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();

  // Обработчик клика вне dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
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
              console.error("Error loading profile photo:", error);
              setPhotoURL(defaultAvatar);
            }
          }
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db, storage]);

  const toggleDropdown = () => {
    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setShowDropdown(!showDropdown);
  };

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleSidebarTopClick = (button) => {
    setActiveSidebarTop(button);
    if (button === 'more') {
      toggleDropdown();
    }
  };


  const renderContent = () => {
    if (loading) return <div>Загрузка...</div>;
    if (!user) return <div>Пожалуйста, войдите в систему</div>;

    switch (activeTab) {
      case 'info':
        return (
          <div className="personal__profiles">
            <div className="first__button">
              <div className="first__text">
                <img className="first__image" src={photoURL} alt="Course" />
                <div className="second__text">
                  <h1>Основы программирования на Python</h1>
                  <p>Начните свой путь в IT с основ программирования</p>
                </div>
              </div>
              <button>В процессе</button>
            </div>
            <div className="personal__third">
              <div>
                <button>Программирование</button>
                <button>Для начинающих</button>
              </div>
              <button>Продолжить</button>
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

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пожалуйста, войдите в систему</div>;

  return (
    <div className="personal">
      <div className="personal__flex">
        <div className="personal__fixed">
          <div className="fixed__button1">
            <button
              className={activeSidebarTop === 'public' ? 'active' : ''}
              onClick={() => handleSidebarTopClick('public')}
            >
             <CgProfile /> Публичный профиль
            </button>
            <button
              className={activeSidebarTop === 'partner' ? 'active' : ''}
              onClick={() => handleSidebarTopClick('partner')}
            >
             <GiPostOffice />
             Кабинет партнёра
            </button>
            <Link to={'/personInformation'}>
            <button
              ref={moreButtonRef}
              className={activeSidebarTop === 'nastroy' ? 'active' : ''}
              onClick={() => handleSidebarTopClick('nastroy')}
            >
             <RiSettings3Line />
             Настройки
            </button>
            </Link>
            <button
              ref={moreButtonRef}
              className={activeSidebarTop === 'podd' ? 'active' : ''}
              onClick={() => handleSidebarTopClick('podd')}
            >
             <MdSupportAgent /> Поддержка
            </button>
            <button
              // ref={moreButtonRef}
              className={activeSidebarTop === 'out' ? 'active' : ''}
              onClick={() => handleSidebarTopClick('out')}
            >
             <MdOutlinePowerSettingsNew /> Выйти
            </button>
            
          <p>Сообщество</p>

          {/* <div className="fixed__button2"> */}
            <button
               className={activeSidebarTop === 'znakom' ? 'active' : ''}
               onClick={() => handleSidebarTopClick('znakom')}
            >
            <FaUserFriends />
            Знакомства
            </button>
            <button
              className={activeSidebarTop === 'chats' ? 'active' : ''}
              onClick={() => handleSidebarTopClick('chats')}
            >
             <IoChatboxEllipsesOutline /> Чаты
            </button>
            <button
              className={activeSidebarTop === 'groups' ? 'active' : ''}
              onClick={() => handleSidebarTopClick('groups')}
            >
            <MdGroups2 />  Группы
            </button>
          {/* </div> */}
        </div>
        </div>

        <div className="personal__content">
          <div className="personal__profile">
            <div className="personal__info">
              <img 
                src={photoURL} 
                alt="User" 
                className="personal__avatar"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
              <div className="personal__text">
                <div>
                  <h1>{userData?.username || user.displayName || 'Пользователь'}</h1>
                  <p>{user.email || 'Email не указан'}</p>
                </div>
                {/* <div className="personal__icons">
                  <img src={photoURL} alt="Icon" className="personal__icon" />
                  <img src={photoURL} alt="Icon" className="personal__icon" />
                  <img src={photoURL} alt="Icon" className="personal__icon" />
                </div> */}
              </div>
            </div>
            <div className="btn__buttons">
              <button>Настройки</button>
              <button className="btn__gradient">Редактировать</button>
            </div>
          </div>

          <div className="personal__word">
            <button
              className={activeTab === 'info' ? 'active' : ''}
              onClick={() => handleTabClick('info')}
            >
              Информация
            </button>
            <button
              className={activeTab === 'favorites' ? 'active' : ''}
              onClick={() => handleTabClick('favorites')}
            >
              Избранные курсы
            </button>
            <button
              className={activeTab === 'my-courses' ? 'active' : ''}
              onClick={() => handleTabClick('my-courses')}
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