// src/api/courses.js
export const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      return response.data; // Убедитесь, что ответ содержит массив курсов
    } catch (err) {
      throw new Error(err.response?.data?.message || "Не удалось загрузить курсы");
    }
  };