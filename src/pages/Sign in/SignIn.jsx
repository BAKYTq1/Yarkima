import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import './style.scss';

function Voyti() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast.success("Вы авторизованы!");
      } else {
        toast.info("Вы не авторизованы.");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Добро пожаловать, ${userCredential.user.email}!`);
    } catch (error) {
      toast.error("Ошибка входа: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Вы вышли из аккаунта.");
    } catch (error) {
      toast.error("Ошибка выхода: " + error.message);
    }
  };

  return (
    <div className='Sign-In'>
      <div className='item-signin'>
        <div>
          <img src="" alt="" width={845} height={781} />
        </div>
        <div className="signin">
          <h2>Log In to Exclusive</h2>
          <p>Enter your details below</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className='submits'>
              <button type="submit">Log In</button>
              <Link to={'/forgot-password'}>Forgot Password?</Link>
            </div>
          </form>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      {/* Добавляем контейнер для уведомлений */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default Voyti;
