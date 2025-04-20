import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Block2 = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const rowsRef = useRef([]);
  const navigate = useNavigate();

  // Загрузка курсов из Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Добавляем заглушку для изображения, если нет coverImage
          image: doc.data().coverImage || 'https://via.placeholder.com/200'
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error('Ошибка загрузки курсов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Загрузка информации о создателе
  useEffect(() => {
    const fetchCreator = async () => {
      if (!selectedCourse?.creatorId) {
        setCreatorInfo({ noCreator: true });
        return;
      }
      
      try {
        const creatorRef = doc(db, "users", selectedCourse.creatorId);
        const creatorSnap = await getDoc(creatorRef);
        
        if (creatorSnap.exists()) {
          setCreatorInfo({
            ...creatorSnap.data(),
            noCreator: false
          });
        } else {
          setCreatorInfo({ noCreator: true });
        }
      } catch (error) {
        console.error("Ошибка загрузки создателя:", error);
        setCreatorInfo({ noCreator: true });
      }
    };
    
    if (selectedCourse) {
      fetchCreator();
    }
  }, [selectedCourse]);

  // Создание рядов для анимированного отображения
  const createRows = () => {
    if (courses.length === 0) return [[], [], []];
    
    const row1 = [...courses.slice(0, 8), ...courses.slice(0, 8)];
    const row2 = [...courses.slice(0, 30), ...courses.slice(0, 16)];
    const row3 = [...courses.slice(0, 50), ...courses.slice(0, 30)];
    
    return [row1, row2, row3];
  };

  const rows = createRows();

  // Открытие модального окна с курсом
  const openModal = (course) => {
    setSelectedCourse(course);
    setCreatorInfo(null);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedCourse(null);
    setCreatorInfo(null);
  };

  // Инициализация анимации рядов
  const initAnimation = (rowElement) => {
    if (!rowElement) return;
    rowElement.style.animationDuration = `30s`; // одна скорость для всех
  };
  

  // Переход на страницу курса
  const handleStartCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <div className="loading">Загрузка курсов...</div>;
  }

  return (
    <div className="block-2">
      <div className="previews-courses__rows">
        {rows.map((rowCourses, rowIndex) => (
          <div 
            className="preview-courses__row"
            key={`row-${rowIndex}`}
            ref={el => {
              rowsRef.current[rowIndex] = el;
              initAnimation(el, rowIndex);
            }}
          >
            {rowCourses.map((course, index) => (
              <div 
                className="preview-course hexagon" 
                key={`course-${course.id}-${rowIndex}-${index}`}
                onClick={() => openModal(course)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(course)}
              >
                <div className="preview-course__inner">
                  <img
                    src={course.image}
                    alt={course.courseName || course.title}
                    className='preview-img'
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedCourse.courseName || selectedCourse.title}</h2>
            <img 
              src={selectedCourse.image} 
              alt={selectedCourse.courseName || selectedCourse.title}
              width={200}
            />
            
            <div className="course-info">
              <p>{selectedCourse.courseDescription || 'Описание отсутствует'}</p>
              <div className="course-meta" style={{display:'flex', gap:'10px'}}>
                <span>Категория: {selectedCourse.category || 'Не указана'}</span>
                <span>Язык: {selectedCourse.language || 'Не указан'}</span>
              </div>
            </div>
            
            <div className={`creator-info ${creatorInfo?.noCreator ? 'no-creator' : ''}`}>
              <h3>Создатель курса:</h3>
              {creatorInfo?.noCreator ? (
                <div className="creator-placeholder">
                  <FaUser className="placeholder-icon" />
                  <p>Создатель не указан</p>
                </div>
              ) : (
                <>
                  <div className="creator-avatar-wrapper">
                    {creatorInfo?.photoURL ? (
                      <img 
                        src={creatorInfo.photoURL} 
                        alt="Аватар создателя"
                        className="creator-avatar"
                      />
                    ) : (
                      <div className="creator-avatar placeholder">
                        <FaUser />
                      </div>
                    )}
                    <p className="creator-name">{creatorInfo?.displayName || "Анонимный создатель"}</p>
                  </div>
                  {creatorInfo?.email && <p className="creator-email">{creatorInfo.email}</p>}
                </>
              )}
            </div>

            <button 
              className="start-course-btn"
              onClick={() => handleStartCourse(selectedCourse.id)}
            >
              Пройти курс
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Block2;