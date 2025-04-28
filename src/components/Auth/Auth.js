import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Auth() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error("Ошибка входа:", err);
    }
  };

  return (
    <button onClick={handleLogin} className="auth-btn">
      Войти через Google
    </button>
  );
}