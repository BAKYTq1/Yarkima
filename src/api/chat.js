// src/api/chat.js
import api from './client';

export const sendMessage = async (courseId, text) => {
  const response = await api.post(`/courses/${courseId}/messages`, { text });
  return response.data;
};

export const getMessages = async (courseId) => {
  const response = await api.get(`/courses/${courseId}/messages`);
  return response.data;
};