import React, { useState } from 'react';
import "./Profile.css"
import personal__man from "../../assets/image/personal-man.png"
import arrow from "../../assets/svg/arrow.svg"
import { Link } from 'react-router-dom'

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!name || !email || !phone) {
            setError('Все поля должны быть заполнены!');
        } else {
            setError('');
            console.log('Данные сохранены:', { name, email, phone });
        }
    };

    return (
        <section className='info__flex container'>
            <div className='info__profile'>
                <div className='top-profile'>
                    <p>Публичный профиль</p>
                    <p>/</p>
                    <p>Настройки</p>
                </div>
                <div className='profile__first'>
                    <img src={arrow} alt="" />
                    <h2>Основная информация</h2>
                </div>
                <div className='profile__second'>
                    <img src={personal__man} alt="" />
                    <div>
                        <h1>MR_YARKIMA</h1>
                        <p>Виктор</p>
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
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {error && <p className='error'>{error}</p>}

                    <button className='join' onClick={handleSave}>Сохранить изменения</button>
                </div>
            </div>
            {/* <div className='info__ul'>
                <button>Основная информация</button>
                <Link to="/addinfo"><button>Дополнительная информация</button></Link>
                <button>Социальные сети</button>
                <button>Идентификатор пользователя</button>
                <button>Лицевой счет</button>
                <Link to="/public"><button>История заказов</button></Link>
                <button>Пароль</button>
                <button className='info__red'>Выйти</button>
            </div> */}
        </section>
    );
};

export default Profile;