import React from 'react'
import './Public.css'
import left from '../../assets/svg/left.svg'
import russian from '../../assets/svg/russian.svg'
import newprof from '../../assets/svg/newprofile.svg'
import england from '../../assets/svg/england.svg'
import japon from '../../assets/svg/japon.svg'
import france from '../../assets/svg/france.svg'
import german from '../../assets/svg/german.svg'
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from 'react-router-dom'



function Public() {
    return (
        <>
            <div className='center-course'>

                <div className='center-left'>
                    <section className='section-container'>
                        <div className='top-profile'>
                            <p>Публичный профиль</p>
                            <p>/</p>
                            <p>История заказов</p>
                        </div>
                        <div className='bottom-profile'>
                            <img src={left} alt="" />
                            <h1>История заказов</h1>
                        </div>
                        <div className='author-course'>
                            <div className='all-h'>
                                <h1>Курс</h1>
                                <h1>Автор</h1>
                            </div>
                            <div className='all-p'>
                                <p>Дата</p>
                                <p>Вид оплаты</p>
                                <p>Стоимость</p>
                            </div>
                        </div>
                        <div className='payment'>
                            <div className='pay-lang'>
                                <img src={russian} alt="" />
                                <h3>Русский язык</h3>
                            </div>
                            <div className='profile-lang'>
                                <img src={newprof} alt="" />
                                <h3>gingerbread</h3>
                            </div>
                            <h4>08.03.2024</h4>
                            <p>Лицевой счет</p>
                            <h2>299 ₽</h2>
                        </div>
                        <div className='again-line'></div>


                        <div className='payment'>
                            <div className='pay-lang'>
                                <img src={england} alt="" />
                                <h3> Английский язык</h3>
                            </div>
                            <div className='profile-lang'>
                                <img src={newprof} alt="" />
                                <h3>gingerbread</h3>
                            </div>
                            <h4>08.03.2024</h4>
                            <p> Карта</p>
                            <h2>299 ₽</h2>
                        </div>
                        <div className='again-line'></div>


                        <div className='payment'>
                            <div className='pay-lang'>
                                <img src={german} alt="" />
                                <h3> Немецкий язык</h3>
                            </div>
                            <div className='profile-lang'>
                                <img src={newprof} alt="" />
                                <h3>gingerbread</h3>
                            </div>
                            <h4>08.03.2024</h4>
                            <p>Лицевой счет</p>
                            <h2>399 ₽</h2>
                        </div>
                        <div className='again-line'></div>


                        <div className='payment'>
                            <div className='pay-lang'>
                                <img src={france} alt="" />
                                <h3> Французский язык</h3>
                            </div>
                            <div className='profile-lang'>
                                <img src={newprof} alt="" />
                                <h3>gingerbread</h3>
                            </div>
                            <h4>08.03.2024</h4>
                            <p> Карта</p>
                            <h2>299 ₽</h2>
                        </div>
                        <div className='again-line'></div>


                        <div className='payment'>
                            <div className='pay-lang'>
                                <img src={japon} alt="" />
                                <h3> Японский язык</h3>
                            </div>
                            <div className='profile-lang'>
                                <img src={newprof} alt="" />
                                <h3>gingerbread</h3>
                            </div>
                            <h4>08.03.2024</h4>
                            <p> Карта</p>
                            <h2>499 ₽</h2>
                        </div>

                        <div className='more'>показать еще</div>
                    </section>
                </div>

                {/* <div className='info__ul'>
                    <Link to="/information"><button>Основная информация</button></Link>
                    <Link to="/addinfo" > <button>Дополнительная информация</button></Link>
                    <button>Социальные сети</button>
                    <button>Идентификатор пользователя</button>
                    <button>Лицевой счет</button>
                    <Link to="/public" ><button>История заказов</button></Link>
                    <button>Пароль</button>
                    <button className='info__red'>Выйти</button>
                </div> */}
            </div>

        </>
    )
}

export default Public
