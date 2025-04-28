import { useEffect, useState } from 'react';
import { auth } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? { 
        uid: user.uid, 
        name: user.displayName, 
        photo: user.photoURL 
      } : null);
    });

    return () => unsubscribe();
  }, []);

  return { user };
}