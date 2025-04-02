// src/api/payment.js
import api from './client';

export const createPayment = async (courseId) => {
  const response = await api.post('/payment', { courseId });
  return response.data.url; // URL для редиректа на Stripe
};