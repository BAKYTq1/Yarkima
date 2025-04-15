import React from 'react'
import './ErrorMessage.scss'
import russianFlag from '../../assets/image/russian-flag.png'
import hexCheck from '../../assets/image/hex-check.png'
import { Link } from 'react-router-dom'
import errorIcon from '../../assets/svg/error-icon.svg'

function ErrorMessage() {
  return (
    <div className="subscription-wrapper">
      <div className="left-panel">
              <div className="course">
                <p className="label">Выбранный курс</p>
                <div className="flag-block">
                  <img src={russianFlag} alt="russian" className='flag' />
                  <span>РУССКИЙ ЯЗЫК</span>
                  <img src={hexCheck} alt="hex" className="hex" />
                </div>
              </div>
              <div className="price-block">
                <p className="price">299 ₽ <span>/ месяц</span></p>
                <p className="note">Автоматически выставляется счёт.<br />Подписку можно отменить в любой момент.<br />Оплата будет списана повторно со следующего месяца.</p>
              </div>
            </div>
      <div className='right-panel'>
        <div className='error-message'>
          <div className='error-panel'>
              <div className='error-icon'>
                <img src={errorIcon} alt="" />
              </div>
              <div className='error-text'>
                <h2>Ошибка!</h2>
                <p>Оплата не прошла, повторите попытку.</p>
              </div>
          </div>
          <Link to="/register">
          <button>Продолжить</button>
          </Link>
        </div>
      </div>
        
    </div>
  )
}

export default ErrorMessage
