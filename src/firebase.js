// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAF2K5VsbhQpbZ_4rXxfiRvFaRAqVo97s",
  authDomain: "yarkima-register.firebaseapp.com",
  projectId: "yarkima-register",
  storageBucket: "yarkima-register.appspot.com",
  messagingSenderId: "24557997554",
  appId: "1:24557997554:web:b89a215143fdb644c36f6b",
  measurementId: "G-D8DKTCRVBN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Функция конвертации файла в base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Обновленная функция создания курса
const createCourse = async (courseData) => {
  try {
    // Конвертируем изображения в base64
    const processedData = {
      ...courseData,
      coverImage: await fileToBase64(courseData.coverImage),
      shirtImage: await fileToBase64(courseData.shirtImage),
      timestamp: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "courses"), processedData);
    return docRef.id; // Возвращаем ID созданного курса
  } catch (error) {
    console.error("Ошибка при создании курса:", error);
    throw error;
  }
};

// Остальные функции остаются без изменений
const messagesRef = collection(db, "messages");

const subscribeToMessages = (callback) => {
  const q = query(messagesRef, orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
  return unsubscribe;
};

const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
};

const sendMessage = async (text, userId, displayName, userEmail) => {
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

const saveQuizResult = async (result) => {
  try {
    await addDoc(collection(db, "quizResults"), {
      ...result,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Ошибка при сохранении викторины:", error);
    throw error;
  }
};

export {
  auth,
  db,
  fileToBase64,
  subscribeToMessages,
  getUserData,
  sendMessage,
  createCourse,
  saveQuizResult
};