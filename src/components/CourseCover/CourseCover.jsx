import React, { useState } from "react";
import { Down1 } from "./Down1/Down1"; // Пример использования компонента выпадающего списка
import { Plus } from "./Plus/Plus";
import { Remove1 } from "./Remove1/Remove1";
import { Settings } from "./Settings/Settings";
import "./CourseCover.css";
import { createCourse } from "../../firebase"; // путь подкорректируй под себя

const CourseCover = () => {
  const [ courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [category, setCategory] = useState("Языки"); // по умолчанию категория
  const [language, setLanguage] = useState("Русский"); // по умолчанию язык
  const [courseType, setCourseType] = useState("Тест");
  const [coverImage, setCoverImage] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [shirtImage, setShirtImage] = useState(null);
  const [questions, setQuestions] = useState([
    { term: "Milk", definition: "Молоко", options: ["Молоко", "Корова", "Трава", "Творог"] },
    { term: "ЯЗЫК", definition: "ЯЗЫК", options: [] }
  ]);

  const handleCreateCourse = async () => {
    try {
      const newCourse = {
        courseName,
        courseDescription,
        category,
        language,
        courseType,
        questions,
      };
  
      await createCourse(newCourse);
      alert("Курс успешно создан!");
      navigate("/courses"); // если хочешь редирект
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { term: "", definition: "", options: [] }]);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
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

  // Проверка, активна ли кнопка "Создать"
  const isCreateButtonActive = courseName.trim() !== "" && category !== "" && language !== "";

  // Функции для переключения категории и языка
  const toggleCategory = () => {
    setCategory(prevCategory => (prevCategory === "Языки" ? "Программирование" : "Языки"));
  };

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === "Русский" ? "Английский" : "Русский"));
  };

  return (
    <div className="frame container">
      <div className="div">
        <div className="text-wrapper">СОЗДАТЬ НОВЫЙ КУРС</div>

        <div className="div-2">
          <button
            className={`button ${isCreateButtonActive ? "active" : ""}`} // Кнопка окрашивается в синий, если активна
            onClick={handleCreateCourse}
            disabled={!isCreateButtonActive} // Кнопка будет отключена, если условия не выполнены
          >
            <div className="text-wrapper-2">СОЗДАТЬ</div>
          </button>

          <div className="settings-wrapper" 
          onClick={() => setShowSettings(true)}>
            <Settings className="settings-instance"/>
          </div>
        </div>
      </div>

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
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
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
                onChange={(e) => setShirtImage(e.target.files[0])}
              />
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
          {/* Категория */}
          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Категория</div>
              <div className="TEXT-3">{category}</div>
            </div>
            <Down1 className="down" onClick={toggleCategory} /> {/* Добавляем обработчик для категории */}
          </div>

          {/* Язык */}
          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Язык</div>
              <div className="TEXT-3">{language}</div>
            </div>
            <Down1 className="down" onClick={toggleLanguage} /> {/* Добавляем обработчик для языка */}
          </div>

          {/* Тип курса */}
          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Тип курса</div>
              <div className="TEXT-3">{courseType}</div>
            </div>
            <Down1
              className="down"
              onClick={() => setCourseType(courseType === "Тест" ? "Курс" : "Тест")}
            />
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
