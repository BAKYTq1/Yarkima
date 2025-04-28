// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, addDoc, onSnapshot, serverTimestamp,  arrayUnion, doc, getDoc, setDoc, updateDoc, where, } from "firebase/firestore";  // Импортируем нужные функции

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
const firestore = getFirestore(app);  // Получаем экземпляр Firestore

// Экспортируем firestore и все необходимые функции
export { firestore, collection, getDocs, query, orderBy, addDoc, onSnapshot,serverTimestamp, arrayUnion, doc, getDoc, setDoc, updateDoc,  where, };
