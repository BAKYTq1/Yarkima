import React from 'react'
import "./Footer.css"
import Per from  "./Frame 6313.svg"

const Footer = () => {
  return (
   
<div className='a'> 
<div className='j' >
        <div className='b'>
          <img src= {Per} alt="" />
          <h1>YarKima</h1>
        </div>


        <div className="c">
          <h3>О СЕРВИСЕ</h3>
          <ul>
            <li>Что такое YarKiMa</li>
            <li>Реквизиты</li>
            <li>Контакты </li>
          </ul>
        </div>

        <div className="c">
          <h3>ДЛЯ УЧЕНИКОВ</h3>
          <ul>
            <li>Подсказки</li>
            <li>Квизы, опросы, тесты</li>
            <li>Зачуивание</li>
          </ul>
        </div>

        <div className="c">
          <h3>ДЛЯ ПАРТНЕРОВ</h3>
          <ul>
            <li>Мы предлагаем</li>
            <li>Регистрация партнеров</li>
            <li>Личный кабинет</li>
          </ul>
        </div>
      </div>

      <div className="e">
        <p>© 2024 YarKiMa</p>
        <p className='p'>Политика конфиденциальности</p>
        <p className='q'>Условия использования</p>
        <p className="f">ПОДДЕРЖКА</p>
      </div>
   </div>
  ); 
};

export default Footer;
