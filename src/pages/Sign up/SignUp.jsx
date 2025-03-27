import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import { auth } from '../../firebase';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast.success(`Аккаунт создан! Добро пожаловать, ${userCredential.user.email}!`);
    } catch (error) {
      toast.error("Ошибка регистрации: " + error.message);
    }
  };

  // 🔥 Регистрация через Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Вход выполнен: ${result.user.displayName}`);
    } catch (error) {
      toast.error("Ошибка входа через Google: " + error.message);
    }
  };

  return (
    <div className='Sign-Up'>
      <div className='item-signup'>
        <div>
          <img src="" alt="" width={845} height={781} />
        </div>
        <div className="signup">
          <h2>Create an account</h2>
          <p>Enter your details below</p>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit">Create Account</button>
          </form>
          
          {/* Кнопка входа через Google */}
          <button className="google-signin-btn" onClick={handleGoogleSignIn}>
            <img src="/google-icon.png" alt="Google" width="20" height="20" /> Sign up with Google
          </button>

          <p className='sing-tag-p'>Already have an account? <Link to={'/signin'}>Login</Link></p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default Register;
