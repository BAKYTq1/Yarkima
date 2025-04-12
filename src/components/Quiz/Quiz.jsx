import React, { useState } from 'react';
import './Quiz.scss';

const questions = [
  {
    word: 'Coffee',
    transcription: '[ˈkɔfɪ]',
    correctIndex: 0,
    options: ['Кофе', 'Соль', 'Чай', 'Сахар'],
  },
  {
    word: 'Apple',
    transcription: '[ˈæpl]',
    correctIndex: 2,
    options: ['Груша', 'Молоко', 'Яблоко', 'Масло'],
  },
  {
    word: 'Milk',
    transcription: '[mɪlk]',
    correctIndex: 1,
    options: ['Сыр', 'Молоко', 'Яблоко', 'Чай'],
  },
  {
    word: 'Sugar',
    transcription: '[ˈʃʊɡər]',
    correctIndex: 3,
    options: ['Мука', 'Соль', 'Сыр', 'Сахар'],
  }
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQuestion = questions[currentIndex];
  const { word, transcription, options, correctIndex } = currentQuestion;

  const handleCheck = () => {
    if (selected === null) return;
    const answerIsCorrect = selected === correctIndex;

    setIsCorrect(answerIsCorrect);
    setIsChecked(true);

    if (answerIsCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert('Вы прошли все вопросы!');
      setCurrentIndex(0);
      setStreak(0);
    }

    setSelected(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>АНГЛИЙСКИЙ ЯЗЫК</span>
        <span className="progress">{streak} ПРАВИЛЬНЫХ ОТВЕТА ПОДРЯД!</span>
      </div>

      <div className="quiz-body">
        <div className={`quiz-card ${isCorrect ? 'correct' : isChecked ? 'wrong' : ''}`}>
          <p className="instruction">Выберите слово</p>
          <h2 className="word">
            {word}
            <span className="sound-icon" onClick={speak}>🔊</span>
          </h2>
          <p className="transcription">{transcription}</p>

          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option 
                  ${selected === index ? 'selected' : ''} 
                  ${isChecked && index === correctIndex ? 'right' : ''}
                  ${isChecked && selected === index && selected !== correctIndex ? 'wrong' : ''}
                `}
                onClick={() => !isChecked && setSelected(index)}
              >
                {option}
                <span className="number">{index + 1}</span>
              </button>
            ))}
          </div>

          <div className="actions">
            {!isChecked ? (
              <>
                <button className="skip" onClick={handleNext}>ПРОПУСТИТЬ</button>
                <button className="check" onClick={handleCheck} disabled={selected === null}>
                  ПРОВЕРИТЬ
                </button>
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
      </div>
    </div>
  );
};

export default Quiz;
