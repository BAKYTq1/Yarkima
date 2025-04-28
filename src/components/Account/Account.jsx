import React, { useState, useEffect } from 'react';
import './style.scss';

const Account = () => {
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [topUpHistory, setTopUpHistory] = useState([]);

  useEffect(() => {
    // Здесь загружаем стартовые данные
    const fetchAccountData = async () => {
      setBalance(1500); // Стартовый баланс
      setAccountNumber('1234 5678 9012 3456');
      // Можно потом подгружать историю пополнений из Firestore
    };

    fetchAccountData();
  }, []);

  const handleTopUp = () => {
    const topUpAmount = parseFloat(amount);
    if (!isNaN(topUpAmount) && topUpAmount > 0) {
      const newBalance = balance + topUpAmount;
      setBalance(newBalance);
      setAmount('');

      // Добавляем новое пополнение в историю
      const newTopUp = {
        amount: topUpAmount,
        date: new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };
      setTopUpHistory([newTopUp, ...topUpHistory]); // Новое пополнение сверху
    }
  };

  return (
    <div className="account-container">
      <h2>Лицевой счёт</h2>

      <div className="account-info">
        <p><strong>Номер счёта:</strong> {accountNumber}</p>
        <p><strong>Баланс:</strong> {balance} ₽</p>
      </div>

      <div className="account-topup">
        <input
          type="number"
          placeholder="Введите сумму"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleTopUp}>Пополнить</button>
      </div>

      <div className="topup-history">
        <h3>История пополнений</h3>
        {topUpHistory.length === 0 ? (
          <p>Нет пополнений</p>
        ) : (
          <ul>
            {topUpHistory.map((topUp, index) => (
              <li key={index}>
                +{topUp.amount} ₽ — {topUp.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Account;
