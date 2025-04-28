import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import './style.scss'; // Стили можешь добавить отдельно

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchBalance = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setBalance(userData.balance || 0);
          setTransactions(userData.transactions || []); // Загружаем историю транзакций
        }
      }
    };

    fetchBalance();
  }, []);

  const handleTopUp = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      const newBalance = balance + Number(amount);
      const newTransaction = {
        type: 'Пополнение',
        amount: Number(amount),
        date: new Date().toLocaleString(),
      };

      // Обновляем баланс пользователя
      await updateDoc(userRef, {
        balance: newBalance,
        transactions: [...transactions, newTransaction] // Добавляем транзакцию в историю
      });

      setBalance(newBalance);
      setTransactions([...transactions, newTransaction]); // Обновляем локальное состояние транзакций
      setAmount('');
    } catch (error) {
      console.error('Ошибка при пополнении баланса:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account-balance container">
      <h2>Лицевой счёт</h2>
      <div className="balance-info">
        <p>Текущий баланс: <strong>{balance} ₽</strong></p>
      </div>

      <div className="top-up-section">
        <input
          type="number"
          placeholder="Введите сумму пополнения"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
        <button onClick={handleTopUp} disabled={loading}>
          {loading ? 'Обработка...' : 'Пополнить'}
        </button>
      </div>

      {/* История транзакций */}
      <div className="transactions-section">
        <h3>История транзакций</h3>
        {transactions.length === 0 ? (
          <p>Нет транзакций</p>
        ) : (
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.type}: +{transaction.amount} ₽ — {transaction.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AccountBalance;
