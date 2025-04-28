import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firestore } from './firebase-config'; 
import { 
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  getDocs,
  setDoc,
  where,
  limit,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Константы для коллекций
const DB_COLLECTIONS = {
  COURSES: "courses",
  MESSAGES: "messages",
  USERS: "users",
  QUIZ_RESULTS: "quizResults"
};

// Загрузка файлов в Storage
const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};

// Работа с курсами
const courseService = {
  create: async (courseData) => {
    const { coverImage, shirtImage, ...rest } = courseData;
    
    const [coverUrl, shirtUrl] = await Promise.all([
      coverImage ? uploadFile(coverImage, "courses/covers") : null,
      shirtImage ? uploadFile(shirtImage, "courses/shirts") : null
    ]);

    const docRef = await addDoc(collection(db, DB_COLLECTIONS.COURSES), {
      ...rest,
      coverImage: coverUrl,
      shirtImage: shirtUrl,
      createdAt: serverTimestamp()
    });

    return docRef.id;
  },

  getById: async (id) => {
    const docSnap = await getDoc(doc(db, DB_COLLECTIONS.COURSES, id));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }
};

// Работа с сообщениями
const messageService = {
  send: async (text, user) => {
    await addDoc(collection(db, DB_COLLECTIONS.MESSAGES), {
      text,
      uid: user.uid,
      displayName: user.displayName,
      userEmail: user.email,
      timestamp: serverTimestamp()
    });
  },

  subscribe: (callback, options = { limit: 50 }) => {
    const q = query(
      collection(db, DB_COLLECTIONS.MESSAGES),
      orderBy("timestamp", "desc"),
      limit(options.limit)
    );

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Конвертируем Firestore Timestamp в дату
        timestamp: doc.data().timestamp?.toDate()
      }));
      callback(messages);
    });
  }
};

// Работа с пользователями
const userService = {
  get: async (userId) => {
    const docSnap = await getDoc(doc(db, DB_COLLECTIONS.USERS, userId));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  getAll: async () => {
    const snapshot = await getDocs(collection(db, DB_COLLECTIONS.USERS));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  set: async (userId, data) => {
    await setDoc(doc(db, DB_COLLECTIONS.USERS, userId), data, { merge: true });
  },

  findByEmail: async (email) => {
    const q = query(
      collection(db, DB_COLLECTIONS.USERS),
      where("email", "==", email)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

// Работа с тестами
const quizService = {
  saveResult: async (result) => {
    await addDoc(collection(db, DB_COLLECTIONS.QUIZ_RESULTS), {
      ...result,
      timestamp: serverTimestamp()
    });
  }
};

export {
  auth,
  db,
  storage,
  courseService,
  messageService,
  userService,
  quizService,
  uploadFile
};
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { 
//   getFirestore,
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
//   getDoc,
//   doc,
//   getDocs,
//   setDoc
// } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDAF2K5VsbhQpbZ_4rXxfiRvFaRAqVo97s",
//   authDomain: "yarkima-register.firebaseapp.com",
//   projectId: "yarkima-register",
//   storageBucket: "yarkima-register.appspot.com",
//   messagingSenderId: "24557997554",
//   appId: "1:24557997554:web:b89a215143fdb644c36f6b",
//   measurementId: "G-D8DKTCRVBN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// Function to upload a file to Firebase Storage and get its URL
const uploadFileToStorage = async (file, folder) => {
  try {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref); // Get file URL
  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
    throw error;
  }
};

// Updated function to create a course
const createCourse = async (courseData) => {
  try {
    const { coverImage, shirtImage, ...restData } = courseData;

    // Upload files to Firebase Storage
    const coverImageUrl = coverImage ? await uploadFileToStorage(coverImage, "courses/covers") : null;
    const shirtImageUrl = shirtImage ? await uploadFileToStorage(shirtImage, "courses/shirts") : null;

    // Prepare data for Firestore
    const processedData = {
      ...restData,
      coverImage: coverImageUrl,
      shirtImage: shirtImageUrl,
      timestamp: serverTimestamp() // Add server timestamp
    };

    // Add document to Firestore
    const docRef = await addDoc(collection(db, "courses"), processedData);
    return docRef.id; // Return the ID of the created course
  } catch (error) {
    console.error("Ошибка при создании курса:", error);
    throw error; // Rethrow the error for the caller
  }
};

// Other Firestore-related functions remain unchanged
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
// const sendMessage = async (text, receiverId) => {
//   const user = auth.currentUser; // текущий залогиненный пользователь

//   try {
//     await addDoc(messagesRef, {
//       text,
//       from: user.uid,     // кто отправил
//       to: receiverId,     // кому отправил
//       timestamp: serverTimestamp()
//     });
//   } catch (error) {
//     console.error("Ошибка отправки сообщения:", error);
//     throw error;
//   }
// };


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

// Функция для получения всех пользователей
const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "users"); // Обращаемся к коллекции users
    const snapshot = await getDocs(usersRef); // Запрашиваем все документы
    const usersList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Все пользователи:", usersList); // Логируем всех пользователей для проверки

    return usersList; // Возвращаем список пользователей
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};


// Функция для добавления или обновления данных пользователя в Firestore
const addUserData = async (userId, userData) => {
  const userRef = doc(db, "users", userId);  // Получаем ссылку на документ пользователя в коллекции "users"
  try {
    await setDoc(userRef, userData, { merge: true });  // Добавляем или обновляем данные
    console.log("Данные пользователя обновлены/добавлены");
  } catch (error) {
    console.error("Ошибка при обновлении данных пользователя:", error);
  }
};


// Функция генерации ID чата
const generateChatId = (user1Id, user2Id) => {
  return [user1Id, user2Id].sort().join('_');
};

// Отправка сообщения в конкретный чат
const sendMessageToChat = async (fromUser, toUser, text) => {
  const chatId = generateChatId(fromUser.uid, toUser.uid);
  const chatRef = collection(db, "chats", chatId, "messages");

  await addDoc(chatRef, {
    text,
    from: fromUser.uid,
    to: toUser.uid,
    displayName: fromUser.displayName,
    timestamp: serverTimestamp()
  });

  // Можно дополнительно создать пустой документ о самом чате для списка чатов
  await setDoc(doc(db, "chats", chatId), {
    users: [fromUser.uid, toUser.uid],
    lastMessage: text,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

const subscribeToChatMessages = (chatId, callback) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate()
    }));
    callback(messages);
  });
};
const getMessages = async (userId) => {
  const user = auth.currentUser;

  const q = query(
    messagesRef,
    where('from', 'in', [user.uid, userId]),
    where('to', 'in', [user.uid, userId]),
    orderBy('timestamp', 'asc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
const saveUserDataOnAuthStateChanged = async (user) => {
  if (user) {
    const userData = {
      username: user.displayName,
      email: user.email,
      photoURL: user.photoURL || 'https://i.pravatar.cc/150?img=5',
      createdAt: new Date(),
    };

    // Проверяем, есть ли пользователь с таким email
    const existingUser = await userService.findByEmail(user.email);
    if (existingUser.length === 0) {
      // Добавляем данные пользователя в Firestore
      addUserData(user.uid, userData);
    }
  }
};
const fetchAllUsers = async () => {
  try {
    const allUsers = await getAllUsers();
    const usersArray = Object.values(allUsers);  // Преобразуем объект в массив, если это необходимо
    setUsers(usersArray);
  } catch (error) {
    console.error("Ошибка при получении списка пользователей:", error);
  }
};
// firebase.js

// export const getChatMessages = async (chatId) => {
//   try {
//     const messagesSnapshot = await Firestore
//       .collection('chats')
//       .doc(chatId)
//       .collection('messages')
//       .orderBy('timestamp')  // Сортируем по времени, чтобы показывать сообщения в правильном порядке
//       .get();

//     const messages = messagesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return messages;  // Возвращаем массив сообщений
//   } catch (error) {
//     console.error("Error fetching messages: ", error);
//     throw error;
//   }
// };

// // Отправляем новое сообщение в чат
// export const sendMessage = async (chatId, messageText, userId) => {
//   try {
//     const message = {
//       text: messageText,
//       userId: userId,
//       timestamp: new Date(),
//     };

//     await firestore
//       .collection('chats')
//       .doc(chatId)
//       .collection('messages')
//       .add(message);  // Добавляем новое сообщение в коллекцию

//     console.log("Message sent successfully");
//   } catch (error) {
//     console.error("Error sending message: ", error);
//     throw error;
//   }
// };

// firebase.js

// Получаем все сообщения для определенного чата
// firebase.js (или ваш файл, где находится код для работы с Firestore)

// Функция для получения сообщений
// firebase.js (или ваш файл с кодом для работы с Firestore)


// Заменим старую версию метода .collection() на новую

// Получение сообщений
const getChatMessages = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "chats")); // Указываем правильную коллекцию
    const messages = querySnapshot.docs.map(doc => doc.data());
    setMessages(messages); // Обновляем стейт с полученными сообщениями
  } catch (error) {
    console.error("Error fetching messages: ", error);
  }
};


// Отправляем новое сообщение в чат
export const sendMessage = async (chatId, messageText, userId) => {
  try {
    const message = {
      text: messageText,
      userId: userId,
      timestamp: new Date(),
    };

    await firestore
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(message);  // Добавляем новое сообщение в коллекцию

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message: ", error);
    throw error;
  }
};


export {
  // auth,
  // db,
  uploadFileToStorage,
  subscribeToMessages,
  getUserData,
  createCourse,
  saveQuizResult,
  getAllUsers,
  addUserData,
  sendMessageToChat,
  subscribeToChatMessages,
  getMessages,
  saveUserDataOnAuthStateChanged,
  fetchAllUsers,
  getChatMessages,
  
};