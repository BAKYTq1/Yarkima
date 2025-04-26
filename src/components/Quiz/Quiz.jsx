import React, { useState, useEffect } from 'react';
import './Quiz.scss';
import { auth, db, saveQuizResult } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { courseId } = useParams();

  const [state, setState] = useState({
    currentIndex: 0,
    selected: null,
    isChecked: false,
    isCorrect: false,
    streak: 0,
    answers: [],
    userId: null,
    courseData: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!courseId) {
          throw new Error("Не указан ID курса");
        }

        console.log("Загружаю курс с ID:", courseId);
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists()) {
          throw new Error("Курс с указанным ID не найден");
        }

        const courseData = courseSnap.data();
        console.log("Полученные данные курса:", courseData);

        if (!courseData.questions || courseData.questions.length === 0) {
          throw new Error("Курс не содержит вопросов");
        }

        const validQuestions = courseData.questions.filter(q =>
          q.options && q.options.length > 0 && q.term && q.definition
        );

        if (validQuestions.length === 0) {
          throw new Error("Нет валидных вопросов с вариантами ответов");
        }

        setState(prev => ({
          ...prev,
          courseData: {
            ...courseData,
            questions: validQuestions
          },
          isLoading: false
        }));
      } catch (error) {
        console.error("Ошибка загрузки курса:", error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message
        }));
      }
    };

    fetchCourse();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState(prev => ({
        ...prev,
        userId: user ? user.uid : null
      }));
    });

    return () => unsubscribe();
  }, [courseId]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const handleCheck = () => {
    if (state.selected === null) return;
    
    const currentQuestion = state.courseData.questions[state.currentIndex];
    const correct = currentQuestion.options[state.selected] === currentQuestion.definition;
    
    const answer = {
      term: currentQuestion.term,
      definition: currentQuestion.definition,
      selectedAnswer: currentQuestion.options[state.selected],
      isCorrect: correct,
    };
  
    setState(prev => ({
      ...prev,
      isChecked: true,
      isCorrect: correct,
      streak: correct ? Math.min(prev.streak + 1, state.courseData.questions.length) : 0,
      answers: [...prev.answers, answer]
    }));
  };
  

  const handleNext = async () => {
    const nextIndex = state.currentIndex + 1;

    if (nextIndex >= state.courseData.questions.length) {
      if (state.userId) {
        await saveQuizResult({
          userId: state.userId,
          courseId,
          courseName: state.courseData.courseName || "Анонимный тест",
          answers: state.answers,
          score: state.answers.filter(a => a.isCorrect).length,
          totalQuestions: state.courseData.questions.length,
          timestamp: new Date().toISOString(),
        });
      }

      alert(`Тест завершен! Результат: ${state.answers.filter(a => a.isCorrect).length}/${state.courseData.questions.length}`);

      setState(prev => ({
        ...prev,
        currentIndex: 0,
        streak: 0,
        answers: [],
        selected: null,
        isChecked: false,
        isCorrect: false
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      currentIndex: nextIndex,
      selected: null,
      isChecked: false,
      isCorrect: false
    }));
  };

  if (state.isLoading) {
    return <div className="quiz-container">Загрузка теста...</div>;
  }

  if (state.error) {
    return <div className="quiz-container error">Ошибка: {state.error}</div>;
  }

  if (!state.courseData) {
    return <div className="quiz-container">Данные курса не загружены</div>;
  }

  const currentQuestion = state.courseData.questions[state.currentIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>{state.courseData.courseName || "Тест по словам"}</span>
        <div className="streak-info">
          <span className="progress">{state.streak} ПРАВИЛЬНЫХ ОТВЕТОВ ПОДРЯД!</span>
          <div className="streak-bar">
  <div className="bar-fill" style={{ width: `${(state.streak / state.courseData.questions.length) * 100}%` }}></div>
</div>

        </div>
      </div>

      <div className="quiz-body">
        <div className={`quiz-card ${state.isChecked ? (state.isCorrect ? 'correct' : 'wrong') : ''}`}>
          <p className="instruction">Выберите правильный перевод</p>
          <h2 className="word">
            {currentQuestion.term}
            <span className="sound-icon" onClick={() => speak(currentQuestion.term)}>🔊</span>
          </h2>

          <div className="options">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                className={`option 
                  ${state.selected === i ? 'selected' : ''} 
                  ${state.isChecked && option === currentQuestion.definition ? 'right' : ''} 
                  ${state.isChecked && state.selected === i && option !== currentQuestion.definition ? 'wrong' : ''}`}
                onClick={() => !state.isChecked && setState(prev => ({ ...prev, selected: i }))}
                disabled={!option}
              >
                {option || "(пустой вариант)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="actions container">
        {!state.isChecked ? (
          <>
            <button className="skip" onClick={handleNext}>ПРОПУСТИТЬ</button>
            <button className="check" onClick={handleCheck} disabled={state.selected === null}>ПРОВЕРИТЬ</button>
          </>
        ) : (
          <>
            <div className={`result ${state.isCorrect ? 'success' : 'error'}`}>
              <div className="icon">{state.isCorrect ? '✅' : '❌'}</div>
              <span>{state.isCorrect ? 'СУПЕР!' : 'ОШИБКА!'}</span>
            </div>
            <button className="next" onClick={handleNext}>ДАЛЕЕ</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
