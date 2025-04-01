// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ваш-api-адрес.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен Firebase к каждому запросу
api.interceptors.request.use(async (config) => {
  const token = await getAuthToken(); // Ваша функция получения токена
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;