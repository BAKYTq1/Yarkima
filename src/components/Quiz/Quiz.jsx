import React, { useState, useEffect } from 'react';
import './Quiz.scss';
import { saveQuizResult } from '../../firebase'; // Путь под себя

const questions = [
  // Ваши вопросы
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState([]);

  const current = questions[currentIndex];
  const { word, transcription, options, correctIndex } = current;

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speak();
  }, [currentIndex]);

  useEffect(() => {
    if (streak === 4) {
      alert('🎉 Поздравляем! 4 правильных ответа подряд!');
      setStreak(0);
    }
  }, [streak]);

  const handleCheck = () => {
    if (selected === null) return;
    const correct = selected === correctIndex;
    setIsCorrect(correct);
    setIsChecked(true);
    setStreak(correct ? streak + 1 : 0);
  
    const answer = {
      word,
      transcription,
      selectedAnswer: options[selected],
      correctAnswer: options[correctIndex],
      isCorrect: correct,
    };
  
    setAnswers(prev => [...prev, answer]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      // Сохранение результатов викторины в Firebase после завершения всех вопросов
      saveQuizResult({
        userId: "example_user_id", // Замените на реальный ID пользователя
        answers,
      });

      alert('Вы прошли все вопросы!');
      setCurrentIndex(0);
      setStreak(0);
      setAnswers([]);
    } else {
      setCurrentIndex(nextIndex);
    }

    setSelected(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>АНГЛИЙСКИЙ ЯЗЫК</span>
        <div className="streak-info">
          <span className="progress">{streak} ПРАВИЛЬНЫХ ОТВЕТА ПОДРЯД!</span>
          <div className="streak-bar">
            <div className="bar-fill" style={{ width: `${(streak / 4) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="quiz-body">
        <div className={`quiz-card ${isChecked ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
          <p className="instruction">Выберите слово</p>
          <h2 className="word">
            {word}
            <span className="sound-icon" onClick={speak}>🔊</span>
          </h2>
          <p className="transcription">{transcription}</p>

          <div className="options">
            {options.map((opt, i) => (
              <button
                key={i}
                className={`option 
                  ${selected === i ? 'selected' : ''} 
                  ${isChecked && i === correctIndex ? 'right' : ''} 
                  ${isChecked && selected === i && selected !== correctIndex ? 'wrong' : ''}`}
                onClick={() => !isChecked && setSelected(i)}
              >
                {opt}
                <span className="number">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="actions container">
        {!isChecked ? (
          <>
            <button className="skip" onClick={handleNext}>ПРОПУСТИТЬ</button>
            <button className="check" onClick={handleCheck} disabled={selected === null}>ПРОВЕРИТЬ</button>
          </>
        ) : isCorrect ? (
          <>
            <div className="result success">
              <div className="icon">✅</div>
              <span>СУПЕР!</span>
            </div>
            <button className="next" onClick={handleNext}>ДАЛЕЕ</button>
          </>
        ) : (
          <>
            <div className="result error">
              <div className="icon">❌</div>
              <span>ОШИБКА!</span>
            </div>
            <button className="next" onClick={handleNext}>ДАЛЕЕ</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
