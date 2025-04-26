import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup 
} from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import GoogleIcon from '../../assets/svg/arrow.svg'; // Импортируйте SVG иконку Google
import './style.scss';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        checkAndAddUser(currentUser);
        toast.success(`Добро пожаловать, ${currentUser.email}!`);
        navigate('/');
      }     
      const checkAndAddUser = async (currentUser) => {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
      
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "Пользователь",
            createdAt: new Date()
          });
          console.log("✅ Пользователь добавлен в Firestore");
        } else {
          console.log("ℹ️ Пользователь уже есть в Firestore");
        }
      };
      
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMessage = "Ошибка входа";
      switch(error.code) {
        case 'auth/user-not-found':
          errorMessage = "Пользователь не найден";
          break;
        case 'auth/wrong-password':
          errorMessage = "Неверный пароль";
          break;
        case 'auth/invalid-email':
          errorMessage = "Некорректный email";
          break;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast.error("Ошибка входа через Google: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Вы успешно вышли из системы");
    } catch (error) {
      toast.error("Ошибка при выходе: " + error.message);
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
          <h2>Вход в аккаунт</h2>
          <p className="auth-subtitle">Введите ваши данные</p>
          
          <form onSubmit={handleLogin} className="auth-form">
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
            
            <div className="form-options">
              <Link to="/register" className="forgot-password">
                Забыли пароль?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>или</span>
          </div>
          
          <button 
            className="google-button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <img 
              src={GoogleIcon} 
              alt="Google" 
              className="google-icon" 
            />
            Войти через Google
          </button>
          
          <p className="auth-redirect">
            Нет аккаунта? <Link to="/register" className="auth-link">Зарегистрируйтесь</Link>
          </p>
          
          {user && (
            <button 
              className="logout-button"
              onClick={handleLogout}
            >
              Выйти
            </button>
          )}
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

export default Login;