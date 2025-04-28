import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './style.scss';
import { FcGoogle } from "react-icons/fc";


function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // добавили состояние для телефона
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Проверка правильности номера
  const isValidPhone = (phone) => {
    const phoneRegex = /^(\+?\d{10,15})$/;
    return phoneRegex.test(phone);
  };

  // Сохраняем пользователя в Firestore
  const saveUserToFirestore = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phone: phone, // сохраняем телефон
      createdAt: new Date()
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidPhone(phone)) {
      toast.error('Введите корректный номер телефона');
      setIsLoading(false);
      return;
    }

    try {
      // Регистрируем пользователя
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Обновляем профиль с именем
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Сохраняем в Firestore
      await saveUserToFirestore(userCredential.user);

      toast.success(`Добро пожаловать, ${name}!`);
      navigate('/');
    } catch (error) {
      let errorMessage = "Ошибка регистрации";
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Этот email уже используется";
          break;
        case 'auth/weak-password':
          errorMessage = "Пароль должен содержать минимум 6 символов";
          break;
        case 'auth/invalid-email':
          errorMessage = "Некорректный email";
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      // Сохраняем пользователя Google в Firestore
      await saveUserToFirestore(result.user);

      toast.success(`Добро пожаловать, ${result.user.displayName || 'пользователь'}!`);
      navigate('/');
    } catch (error) {
      toast.error("Ошибка входа через Google: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-image-section'>
        <div className='main-containerr'>
          <div className="containerrr">
            <div className="cube">
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
            </div>
            <div className="hexa"></div>
          </div>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <h2>Создать аккаунт</h2>
          <p className="auth-subtitle">Заполните данные ниже</p>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="Телефон (+79991234567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Создание...' : 'Создать аккаунт'}
            </button>
          </form>

          <div className="auth-divider">
            <span>или</span>
          </div>

          <button 
            className="google-button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <FcGoogle />
            Зарегистрироваться через Google
          </button>

          <p className="auth-redirect">
            Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link>
          </p>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default Register;
