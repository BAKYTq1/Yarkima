// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi3jDPSKJpt4OWGrSn06jO77jVLoVoCAU",
  authDomain: "register-7dbf8.firebaseapp.com",
  projectId: "register-7dbf8",
  storageBucket: "register-7dbf8.firebasestorage.app",
  messagingSenderId: "765206203965",
  appId: "1:765206203965:web:4fbfa49c407e4a2622a454",
  measurementId: "G-0LNVYVLZ70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Получаем Firestore
const db = getFirestore(app);

// Получаем Auth
const auth = getAuth(app);

// Экспортируем db и auth
export { db, auth };
