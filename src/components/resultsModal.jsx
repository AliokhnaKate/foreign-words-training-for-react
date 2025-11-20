const ResultsModal = ({ isOpenResults, time, wordAttempts }) => {
  if (!isOpenResults) return null;

  const wordAttemptsDublicates = searchForDuplicates(wordAttempts);
  localStorage.setItem('objDublicates', JSON.stringify(wordAttemptsDublicates))

  function searchForDuplicates(arr) {
    return arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});
}

  return (
    <div className="results-modal">
      <h1>Твоя статистика 🥺💜</h1>
      <div className="results-content">
        {Object.entries(wordAttemptsDublicates).map(([word, attempts]) => (
          <div key={word} className="word-stats">
            <p className="word">Слово: <span>{String(word)}</span></p>
            <p className="attempts">Попытки: <span>{String(attempts)}</span></p>
          </div>
        ))}
      </div>
      <p><b>Время:</b> <span className="time" id="timer">{String(time)}</span></p>
    </div>
  );
};

export default ResultsModal;