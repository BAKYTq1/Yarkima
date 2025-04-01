// // src/components/CourseList.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchCourses } from '../../api/courses';
// import { createPayment } from '../../api/payment';

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchCourses();
//         setCourses(data);
//       } catch (err) {
//         setError(err.message);
//         console.error("Ошибка загрузки курсов:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCourses();
//   }, []);

//   const handleBuyCourse = async (courseId) => {
//     try {
//       const paymentUrl = await createPayment(courseId);
//       window.location.href = paymentUrl;
//     } catch (err) {
//       console.error("Ошибка при оплате:", err);
//       alert("Произошла ошибка при переходе к оплате");
//     }
//   };

//   if (loading) return <div style={{color: 'white'}}>Загрузка курсов...</div>;
//   if (error) return <div style={{color: 'red'}}>Ошибка: {error}</div>;
//   if (!courses.length) return <div style={{color: 'white'}}>Курсы не найдены</div>;

//   return (
//     <div className="course-grid" style={{backgroundColor: 'black', padding: '20px'}}>
//       {courses.map(course => (
//         <div key={course.id} className="course-card" style={{color: 'white', margin: '10px', padding: '15px', border: '1px solid #333'}}>
//           <h3>{course.title}</h3>
//           <p>Цена: {course.price} ₽</p>
//           <button 
//             onClick={() => handleBuyCourse(course.id)}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             Купить курс
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseList;