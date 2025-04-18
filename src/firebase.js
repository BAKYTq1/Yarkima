// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,  // Для подписки на обновления
  addDoc,      // Для отправки сообщений
  serverTimestamp,
  getDoc,      // Для получения данных о пользователе
  doc          // Для ссылки на конкретный документ
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
  const q = query(messagesRef, orderBy("timestamp", "desc"));

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

// Функция получения данных пользователя
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("Пользователь не найден");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
};

// Функция отправки сообщения
export const sendMessage = async (text, userId, displayName, userEmail) => {
  try {
    await addDoc(messagesRef, {
      text,
      uid: userId,
      displayName,
      userEmail,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Ошибка отправки сообщения:", error);
    throw error;
  }
};

// Ссылка на коллекцию курсов
const coursesRef = collection(db, "courses");

// Функция для создания нового курса
export const createCourse = async (courseData) => {
  try {
    await addDoc(coursesRef, {
      ...courseData,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Ошибка при создании курса:", error);
    throw error;
  }
};

// Функция для сохранения результатов викторины
export const saveQuizResult = async (result) => {
  try {
    await addDoc(collection(db, "quizResults"), {
      ...result,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Ошибка при сохранении викторины:", error);
  }
};

// Экспорт всех функций
export { auth, db, subscribeToMessages, saveQuizResult };
