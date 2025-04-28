import React from 'react'
import instagram from "../../assets/svg/instagram.svg"
import wkontakte from "../../assets/svg/wkontakte.svg"
import facebook from "../../assets/svg/facebook.svg"
import question from "../../assets/svg/question.svg"
import Logo from "../../assets/svg/logo.svg";
import "./footer.css"

function Footer() {
  return (
    <>
    <div className='footer container'>
       <div>
       <div className='footer-logo'>
       <img src={Logo} alt="" />
       <h1>Yarkima</h1>
       </div>
       <div>
        <img src={instagram} alt="" />
        <img src={wkontakte} alt="" />
        <img src={facebook} alt="" />
       </div>
    </div>
    <div className='footer-text'>
      <h3>О сервисе</h3>
      <ul>
        <li>Что такое YarKiMa</li>
        <li>Реквизиты</li>
        <li>Контакты</li>
      </ul>
    </div>
    <div className='footer-text'>
      <h3>Для учеников</h3>
      <ul>
        <li>Подсказки</li>
        <li>Квизы, опросы, тесты</li>
        <li>Заучивание</li>
      </ul>
    </div>
    <div className='footer-text'>
      <h3>Для партнеров</h3>
      <ul>
        <li>Заучивание</li>
        <li>Регистрация партнеров</li>
        <li>Личный кабинет</li>
      </ul>
    </div>
    </div>



    <div className='footer-bottom'>
      <p>2024 YarKiMa</p>
      <p>Политика конфиденциальности</p>
      <p>Условия использования</p>
      <div className='footer-end'>
        <img src={question} alt="" />
        <h3>Поддержка</h3>
      </div>
    </div>
    </>
    

   
 
  )
}

export default Footer
