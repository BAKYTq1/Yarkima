import React, { useState } from 'react';
import { Down1 } from './Down1/Down1';
import { Plus } from './Plus/Plus';
import { Remove1 } from './Remove1/Remove1';
import { Settings } from './Settings/Settings';
import './CourseCover.css';
import { createCourse } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Инициализация Firebase Storage
const storage = getStorage();  // Подключаем Firebase Storage

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

  // Обработчик загрузки обложки
  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const coverUrl = await uploadFileToStorage(file);  // Загружаем файл в Firebase Storage
        setCoverImage(coverUrl);  // Сохраняем URL обложки
        setCoverPreview(URL.createObjectURL(file));  // Показываем превью
      } catch (error) {
        console.error('Ошибка загрузки изображения:', error);
        setError('Ошибка загрузки изображения');
      }
    }
  };

  // Обработчик загрузки рубашки
  const handleShirtChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const shirtUrl = await uploadFileToStorage(file);  // Загружаем рубашку
        setShirtImage(shirtUrl);  // Сохраняем URL рубашки
        setShirtPreview(URL.createObjectURL(file));  // Показываем превью
      } catch (error) {
        console.error('Ошибка загрузки изображения:', error);
        setError('Ошибка загрузки изображения');
      }
    }
  };

  // Функция для загрузки файла в Firebase Storage
  const uploadFileToStorage = async (file) => {
    const storageRef = ref(storage, 'courses/' + file.name);  // Путь для хранения файла
    const snapshot = await uploadBytes(storageRef, file);  // Загрузка файла
    const downloadURL = await getDownloadURL(snapshot.ref);  // Получаем URL для файла
    return downloadURL;
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

      await createCourse({
        courseName,
        courseDescription,
        category,
        language,
        courseType,
        questions,
        coverImage,  // Используем URL обложки из состояния
        shirtImage,  // Используем URL рубашки из состояния
        createdAt: new Date().toISOString()
      });

      alert('Курс успешно создан!');
      resetForm();  // Сброс формы
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

  // Добавить вопрос
  const handleAddQuestion = () => {
    setQuestions([...questions, { term: '', definition: '', options: [] }]);
  };

  // Удалить вопрос
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  // Добавить вариант ответа
  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  // Удалить вариант ответа
  const handleRemoveOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, oIndex) => oIndex !== optionIndex);
    setQuestions(newQuestions);
  };

  return (
    <div className="frame container">
      <div className="div">
        <div className="text-wrapper">СОЗДАТЬ НОВЫЙ КУРС</div>
        <div className="div-2">
          <button
            className={`button ${courseName.trim() !== '' && questions.length > 0 ? 'active' : ''}`}
            onClick={handleCreateCourse}
            disabled={isLoading || courseName.trim() === '' || questions.length === 0}
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

      {error && <div className="error-message">{error}</div>}

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
                    /> </div>
            <div className="div-15">
              <Remove1 className="img" onClick={() => handleRemoveOption(qIndex, oIndex)} />
            </div>
          </div>
        ))}

        <div className="plus-wrapper">
          <Plus className="plus-instance" onClick={() => handleAddOption(qIndex)} />
        </div>
      </div>
    </div>
  ))}

  <div className="group-4" onClick={handleAddQuestion}>
    <div className="text-wrapper-5">ДОБАВИТЬ ТЕРМИН</div>
    <Plus className="plus-2" />
  </div>

  {showSettings && (
    <div className="settings-modal">
      <div className="modal-content">
        <button onClick={() => setShowSettings(false)}>Закрыть</button>
        {/* Здесь можно разместить дополнительные настройки */}
      </div>
    </div>
  )}
</div>
); };

export default CourseCover;