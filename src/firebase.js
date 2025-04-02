// Импорт необходимых функций из Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,  // Добавлен недостающий импорт
  addDoc,      // Для отправки сообщений
  serverTimestamp
} from "firebase/firestore";

// Конфигурация вашего Firebase проекта
const firebaseConfig = {
  apiKey: "AIzaSyDAF2K5VsbhQpbZ_4rXxfiRvFaRAqVo97s",
  authDomain: "yarkima-register.firebaseapp.com",
  projectId: "yarkima-register",
  storageBucket: "yarkima-register.appspot.com",
  messagingSenderId: "24557997554",
  appId: "1:24557997554:web:b89a215143fdb644c36f6b",
  measurementId: "G-D8DKTCRVBN"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов
const auth = getAuth(app);
const db = getFirestore(app);

// Ссылка на коллекцию сообщений
const messagesRef = collection(db, "messages");

// Функция для подписки на сообщения
const subscribeToMessages = (callback) => {
  const q = query(messagesRef, orderBy("timestamp", "desc")); // Сортировка по времени
  
  // Подписка на обновления
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });

  return unsubscribe; // Функция для отписки
};

// Добавьте эту функцию в ваш firebase.js
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.data();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
// Функция отправки сообщения
export const sendMessage = async (text, userId, displayName, userEmail) => {
  try {
    await addDoc(messagesRef, {
      text,
      uid: userId,
      displayName,  // Добавляем имя пользователя
      userEmail,    // Добавляем email
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Ошибка отправки:", error);
    throw error;
  }
};

export { auth, db, subscribeToMessages };