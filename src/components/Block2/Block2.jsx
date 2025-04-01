import React, { useState, useRef } from 'react';
import Foto from '../../assets/image/figure1.png';
import './style.scss';

const Block2 = () => {
  const [courses] = useState(
    Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      image: Foto,
      title: `Курс ${i + 1}`,
    }))
  );

  const [selectedCourse, setSelectedCourse] = useState(null);
  const rowsRef = useRef([]);

  // Создаем 3 ряда с разными наборами курсов
  const createRows = () => {
    const row1 = [...courses.slice(0, 8), ...courses.slice(0, 8)]; // Дублируем для бесшовности
    const row2 = [...courses.slice(8, 16), ...courses.slice(8, 16)];
    const row3 = [...courses.slice(16), ...courses.slice(0, 6), ...courses.slice(16)]; // Компенсируем меньшую длину
    
    return [row1, row2, row3];
  };

  const rows = createRows();

  const openModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  // Инициализация анимации для каждого ряда
  const initAnimation = (rowElement, index) => {
    if (!rowElement) return;
    
    // Разная скорость для каждого ряда для более интересного эффекта
    const speeds = [30, 31, 34];
    rowElement.style.animationDuration = `${speeds[index]}s`;
  };

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
                    alt={course.title}
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
            <h2>{selectedCourse.title}</h2>
            <img 
              src={selectedCourse.image} 
              alt={selectedCourse.title}
              width={200}
            />
            <p>ID курса: {selectedCourse.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Block2;