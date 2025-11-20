function StudyMode({ currentWord, totalWords, progress, onShuffleWords }) {
  return (
    <div id="study-mode">
      <h3>
        Слово <span id="current-word">{currentWord}</span> из <span id="total-word">{totalWords}</span>
      </h3>
      <progress id="words-progress" value={progress} max="100">
        {progress}%
      </progress>
      <button id="shuffle-words" onClick={onShuffleWords}>
        Перемешать слова
      </button>
    </div>
  );
}

export default StudyMode;