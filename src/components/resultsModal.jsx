import React from 'react';

const ResultsModal = ({ isOpen, time, wordAttempts, onClose,  }) => {

  if (!isOpen) return null;

  return (
    <div className="results-modal">
      <h1>Твоя статистика 🥺💜</h1>
      <div className="results-content">
        {Object.entries(wordAttempts).map(([word, attempts]) => (
          <div key={word} className="word-stats">
            <p className="word">Слово: <span>{word}</span></p>
            <p className="attempts">Попытки: <span>{attempts}</span></p>
          </div>
        ))}
      </div>
      <p><b>Время:</b> <span className="time" id="timer">{time}</span></p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default ResultsModal;