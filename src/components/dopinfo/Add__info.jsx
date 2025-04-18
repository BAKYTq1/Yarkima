import React from 'react'
import "./add_info.css"
import arrow from "../../assets/svg/arrow.svg"
import { Link } from 'react-router-dom'
import arrow__button from "../../assets/svg/arrow_button.svg"


function Addinfo() {
    return (
        <section className='add__flex container'>
            <div className='add__info '>
                <div className='top-profile'>
                    <p>Публичный профиль</p>
                    <p>/</p>
                    <p>История заказов</p>
                </div>
                <div className='profile__first'>
                    <img src={arrow} alt="" />
                    <h2>ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</h2>
                </div>
                <div className='add__input'>
                    <div>
                        <p>Место рождения</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Место проживания</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Дата рождения</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Пол   </p>
                        <input type="text"/> <img className='arrow__button' src={arrow__button} alt="" />
                    </div>
                </div>
                <div className='add__second'>
                    <div className='add__button'>
                        <p>Семейное положение</p>
                        <div className='checkbox__btn'>
                            <input className='btn__input' type="checkbox" />
                            <p>Женат</p>
                        </div>

                        <div className='checkbox__btn'>
                            <input className='btn__input' type="checkbox" />
                            <p>Замужем</p>
                        </div>
                    </div>
                    <div className='second__input'>
                        <p>Количество детей</p>
                        <input type="text" /> <img className='arrow__button' src={arrow__button} alt="" />
                    </div>
                    <div className='add__button'>
                        <p>Преобладающая рука</p>
                        <div className='checkbox__btn'>
                            <input className='btn__input' type="checkbox" />
                            <p>Правша</p>
                        </div>
                        <div className='checkbox__btn'>
                            <input className='btn__input' type="checkbox" />
                            <p>Левша</p>
                        </div>
                    </div>
                    <div className='second__input'>
                        <p>Профессия</p>
                        <input type="text" /> <img className='arrow__button' src={arrow__button} alt="" />
                    </div>
                    <div className='second__input'>
                        <p>Группа крови</p> 
                        <input type="text" /> <img className='arrow__button' src={arrow__button} alt="" />  ``
                    </div>
                </div>
                <button className='join'>СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
            </div>
            {/* <div className='info__ul'>
                <Link to="/information"><button>Основная информация</button></Link>
                <Link to="/add__info" > <button>Дополнительная информация</button></Link>
                <button>Социальные сети</button>
                <button>Идентификатор пользователя</button>
                <button>Лицевой счет</button>
                <Link to="/public" ><button>История заказов</button></Link>
                <button>Пароль</button>
                <button className='info__red'>Выйти</button>
            </div> */}
        </section>
    )
}

export default Addinfo;
