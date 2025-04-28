import React, { useState, useEffect } from 'react';
import "./Profile.css";
import personal__man from "../../assets/image/personal-man.png";
import arrow from "../../assets/svg/arrow.svg";
import { Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const loadUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || '');
        setEmail(currentUser.email || '');

        try {
          // Загружаем доп. информацию из Firestore
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setPhone(data.phone || '');
          }
        } catch (error) {
          console.error('Ошибка загрузки данных пользователя:', error);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, [auth, db]);

  const handleSave = async () => {
    if (!name || !email || !phone) {
      setError('Все поля должны быть заполнены!');
      return;
    }

    setError('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // Обновляем профиль в Firebase Authentication
      await updateProfile(currentUser, {
        displayName: name
      });

      // Обновляем данные в Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        displayName: name,
        email: email,
        phone: phone,
      });

      console.log('Данные успешно сохранены!');
      alert('Данные обновлены');
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      alert('Ошибка при сохранении');
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <section className='info__flex container'>
      <div className='info__profile'>
        <div className='top-profile'>
          <p>Публичный профиль</p>
          <p>/</p>
          <p>Настройки</p>
        </div>
        <div className='profile__first'>
          <Link to={'/personal'}><img src={arrow} alt="arrow" /></Link>
          <h2>Основная информация</h2>
        </div>
        <div className='profile__second'>
          <img src={personal__man} alt="Avatar" />
          <div>
            <h1>{name || 'Пользователь'}</h1>
            <p>{email || 'Email не указан'}</p>
          </div>
        </div>
        <div className='profile__third'>
          <div className='third__input'>
            <p>Имя</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='third__input'>
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='third__input'>
            <p>Телефон</p>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {error && <p className='error'>{error}</p>}

          <button className='join' onClick={handleSave}>Сохранить изменения</button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
