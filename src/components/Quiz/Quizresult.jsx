import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Quiz.scss';

const QuizResults = () => {
  const [userId, setUserId] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!userId) return;

      const q = query(
        collection(db, 'Courses'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const loaded = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setResults(loaded);
    };

    fetchResults();
  }, [userId]);

  return (
    <div className="quiz-results">
      <h2>Результаты викторины из Courses</h2>
      {results.length === 0 ? (
        <p>Нет сохранённых данных</p>
      ) : (
        results.map((result, index) => (
          <div key={result.id} className="quiz-result">
            <h3>Прохождение #{results.length - index}</h3>
            <ul>
              {result.answers?.map((ans, i) => (
                <li key={i} className={ans.isCorrect ? 'correct' : 'wrong'}>
                  <strong>{ans.word}</strong> ({ans.transcription}) — 
                  выбрано: {ans.selectedAnswer}, правильный: {ans.correctAnswer}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default QuizResults;
