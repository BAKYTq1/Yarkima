import React, { useState } from 'react';
import './SubscriptionForm.scss';
import russianFlag from '../../assets/image/russian-flag.png';
import hexCheck from '../../assets/image/hex-check.png';
import { Link } from 'react-router-dom';


const SubscriptionForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showError, setShowError] = useState(false);

  const handleSubscribe = () => {
    setShowError(true);
  };

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

      <div className="right-panel">
        <h3>ИНФОРМАЦИЯ ОБ ОПЛАТЕ</h3>
        <div className="method-select">
          <button
            className={paymentMethod === 'card' ? 'active' : ''}
            onClick={() => setPaymentMethod('card')}
          >
            Кредитная карта
          </button>
          <button
            className={paymentMethod === 'account' ? 'active' : ''}
            onClick={() => setPaymentMethod('account')}
          >
            Лицевой счёт
          </button>
        </div>

        {paymentMethod === 'account' && (
          <div className="balance-block">
            <div className='balas'>Баланс</div>
            <div className='balance-info'>
            <span className="balance">4 323 ₽</span>
            <button className="recharge">пополнить</button>
            </div>
          </div>
        )}
        
        <Link to={'/errormassege'}>
        <button className="subscribe-button" onClick={handleSubscribe}>
          ОФОРМИТЬ ПОДПИСКУ
        </button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionForm;
