import React, { useState } from 'react';
import { Down1 } from './Down1/Down1';
import { Plus } from './Plus/Plus';
import { Remove1 } from './Remove1/Remove1';
import { Settings } from './Settings/Settings';
import './CourseCover.css';
import { createCourse } from '../../firebase';

const CourseCover = () => {
  // Состояния формы
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [category, setCategory] = useState('Языки');
  const [language, setLanguage] = useState('Русский');
  const [courseType, setCourseType] = useState('Тест');
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [shirtImage, setShirtImage] = useState(null);
  const [shirtPreview, setShirtPreview] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [questions, setQuestions] = useState([
    { term: 'Milk', definition: 'Молоко', options: ['Молоко', 'Корова', 'Трава', 'Творог'] },
    { term: 'ЯЗЫК', definition: 'ЯЗЫК', options: [] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Обработчик выбора обложки
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Обработчик выбора рубашки
  const handleShirtChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShirtImage(file);
      setShirtPreview(URL.createObjectURL(file));
    }
  };

  // Функция конвертации файла в base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // Проверяем, что file существует и является Blob-объектом
      if (!file || !(file instanceof Blob)) {
        resolve(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Создание курса
  const handleCreateCourse = async () => {
    if (!courseName.trim()) {
      setError('Название курса обязательно');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Конвертируем изображения только если они были выбраны
      const coverBase64 = coverImage ? await fileToBase64(coverImage) : null;
      const shirtBase64 = shirtImage ? await fileToBase64(shirtImage) : null;

      await createCourse({
        courseName,
        courseDescription,
        category,
        language,
        courseType,
        questions,
        coverImage: coverBase64,
        shirtImage: shirtBase64,
        createdAt: new Date().toISOString()
      });

      alert('Курс успешно создан!');
      // Сброс формы
      resetForm();
    } catch (error) {
      console.error('Ошибка:', error);
      setError(`Ошибка при создании курса: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Сброс формы
  const resetForm = () => {
    setCourseName('');
    setCourseDescription('');
    setCoverImage(null);
    setCoverPreview(null);
    setShirtImage(null);
    setShirtPreview(null);
    setQuestions([
      { term: 'Milk', definition: 'Молоко', options: ['Молоко', 'Корова', 'Трава', 'Творог'] },
      { term: 'ЯЗЫК', definition: 'ЯЗЫК', options: [] }
    ]);
  };

  // ... остальные обработчики (добавление/удаление вопросов и вариантов) ...
  const handleAddQuestion = () => {
    setQuestions([...questions, { term: '', definition: '', options: [] }]);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(newQuestions);
  };

  const isCreateButtonActive = courseName.trim() !== '' && questions.length > 0;

  return (
    <div className="frame container">
      {/* Заголовок и кнопки */}
      <div className="div">
        <div className="text-wrapper">СОЗДАТЬ НОВЫЙ КУРС</div>
        <div className="div-2">
          <button
            className={`button ${isCreateButtonActive ? 'active' : ''}`}
            onClick={handleCreateCourse}
            disabled={!isCreateButtonActive || isLoading}
          >
            <div className="text-wrapper-2">
              {isLoading ? 'СОХРАНЕНИЕ...' : 'СОЗДАТЬ'}
            </div>
          </button>
          <div className="settings-wrapper" onClick={() => setShowSettings(true)}>
            <Settings className="settings-instance"/>
          </div>
        </div>
      </div>

      {/* Сообщение об ошибке */}
      {error && <div className="error-message">{error}</div>}

      {/* Секция загрузки изображений */}
      <div className="div-3">
        <div className="group">
          <div className="overlap-group">
            <div className="div-4">
              <div className="text-wrapper-3">ОБЛОЖКА КУРСА</div>
              <div className="div-5">
                <div className="FIELD-NAME">Изображение</div>
                <div className="FIELD-NAME-2">Макс. размер 10 мб</div>
              </div>
              <input
                type="file"
                className="button-2"
                accept="image/*"
                onChange={handleCoverChange}
              />
              {coverPreview && (
                <div className="image-preview-block">
                  <img src={coverPreview} alt="Обложка курса" className="preview-image"/>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            <div className="div-6">
              <div className="text-wrapper-3">ДОБАВЬТЕ РУБАШКУ</div>
              <div className="div-5">
                <div className="FIELD-NAME">Изображение или видео</div>
                <p className="FIELD-NAME-2">Макс. размер 10 мб и продолжительность 15 с.</p>
              </div>
              <input
                type="file"
                className="button-2"
                accept="image/*,video/*"
                onChange={handleShirtChange}
              />
              {shirtPreview && (
                <div className="image-preview-block">
                  {shirtImage.type.startsWith('image/') ? (
                    <img src={shirtPreview} alt="Рубашка курса" className="preview-image"/>
                  ) : (
                    <video controls className="preview-video">
                      <source src={shirtPreview} type={shirtImage.type}/>
                    </video>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Остальная часть формы (поля ввода, вопросы и т.д.) */}
      <div className="div-7">
        <div className="field">
          <div className="FIELD-NAME-3">Название курса</div>
          <input
            className="input-99"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div className="field-2">
          <div className="FIELD-NAME-4">Описание</div>
          <textarea
            className="opisani"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </div>

        <div className="div-8">
          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Категория</div>
              <div className="TEXT-3">{category}</div>
            </div>
            <Down1 className="down" onClick={() => setCategory(category === 'Языки' ? 'Программирование' : 'Языки')} />
          </div>

          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Язык</div>
              <div className="TEXT-3">{language}</div>
            </div>
            <Down1 className="down" onClick={() => setLanguage(language === 'Русский' ? 'Английский' : 'Русский')} />
          </div>

          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Тип курса</div>
              <div className="TEXT-3">{courseType}</div>
            </div>
            <Down1 className="down" onClick={() => setCourseType(courseType === 'Тест' ? 'Курс' : 'Тест')} />
          </div>
        </div>
      </div>

      {questions.map((question, qIndex) => (
        <div className="view" key={qIndex}>
          <div className="div-11">
            <div className="FIELD-NAME-5">{qIndex + 1}</div>

            <div className="div-12">
              <Remove1 className="img" onClick={() => handleRemoveQuestion(qIndex)} />
            </div>

            <div className="div-13">
              <input
                type="text"
                className="img-2"
                placeholder="Термин"
                value={question.term}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].term = e.target.value;
                  setQuestions(newQuestions);
                }}
              />

              <input
                type="text"
                className="img-2"
                placeholder="Определение"
                value={question.definition}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].definition = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
            </div>
          </div>

          <div className="div-8">
            {question.options.map((option, oIndex) => (
              <div className="div-14" key={oIndex}>
                <div className="field-3">
                  <input
                    type="text"
                    className="FIELD-NAME-2"
                    placeholder={`Вариант ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[qIndex].options[oIndex] = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />
                  <Remove1 className="img" onClick={() => handleRemoveOption(qIndex, oIndex)} />
                </div>
              </div>
            ))}

            <button className="button-3" onClick={() => handleAddOption(qIndex)}>
              <Plus className="img-33" />
              <div className="text-wrapper-4">ДОБАВИТЬ ВАРИАНТЫ ОТВЕТА</div>
            </button>
          </div>
        </div>
      ))}

      <div className="button-4" onClick={handleAddQuestion}>
        <Plus className="img-33" />
        <div className="text-wrapper-11">ДОБАВИТЬ КАРТОЧКУ</div>
      </div>

      <button className="button-5" onClick={handleCreateCourse}>
        <div className="text-wrapper-2">СОЗДАТЬ</div>
      </button>

      {showSettings && (
        <div className="modal-overlay555" onClick={() => setShowSettings(false)}>
          <div className="modal555" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header555">
              <h2 className="modal-title555">НАСТРОЙКИ КУРСА</h2>
              <button className="modal-close-btn555" onClick={() => setShowSettings(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-content555">
              <div className="modal-section555">
                <div className="modal-subtitle555">Вопросы (Максимум 20)</div>
                <div className="checkbox-group555">
                  <div className="checkbox-wrapper-555">
                    <span className="checkbox-label-text555">Верно - неверно</span>
                    <input className="tgl555 tgl-light555" id="cb1-555" type="checkbox" defaultChecked />
                    <label className="tgl-btn555" htmlFor="cb1-555"></label>
                  </div>
                  <div className="checkbox-wrapper-555">
                    <span className="checkbox-label-text555">С выбором ответов</span>
                    <input className="tgl555 tgl-light555" id="cb2-555" type="checkbox" defaultChecked />
                    <label className="tgl-btn555" htmlFor="cb2-555"></label>
                  </div>
                  <div className="checkbox-wrapper-555">
                    <span className="checkbox-label-text555">Подбор</span>
                    <input className="tgl555 tgl-light555" id="cb3-555" type="checkbox" />
                    <label className="tgl-btn555" htmlFor="cb3-555"></label>
                  </div>
                </div>
              </div>

              <div className="modal-section555">
                <div className="number-input-container555">
                  <span className="number-input-label555">Количество вопросов</span>
                  <input
                    type="number"
                    className="number-input555"
                    min="1"
                    max="20"
                    defaultValue="4"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer555">
              <button className="save-button555">СОХРАНИТЬ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCover;