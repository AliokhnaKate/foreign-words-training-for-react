// src/App.jsx - корневой компонент со всей структурой приложения

// Вместо <link rel="stylesheet" href="style.css"> в HTML, в React импортируйте CSS прямо в JSX-файлы:
//import './App.css';
//import './components/WordCard.css';

import {useState, useEffect} from 'react';
import ExamMode from './components/examMode';
import StudyMode from './components/studyMode';
import CardSlider from './components/cardSlider';
// import ExamCards from './components/examCards';
import ResultsModal from './components/resultsModal';
import { useFlipCard } from './hooks/useFlipCard';
import './App.css';



const dictionary = {
  apple: 'яблоко',
  яблоко: 'apple',
  hello: 'привет',
  привет: 'hello',
  hour: 'час',
  час: 'hour',
  end: 'конец',
  конец: 'end',
  light: 'свет',
  свет: 'light'
};

function App() {
  const [studyMode, setStudyMode] = useState(true); // true - режим изучения, false - экзамен
  const [currentWord, setCurrentWord] = useState(1);
  const [totalWords, setTotalWords] = useState(5);
  const [correctPercent, setCorrectPercent] = useState(0);
  const [time, setTime] = useState('00:00');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // Получаем состояние и функции из хука
  const {isFlipped, showBack, flipCardOver, resetFlip} = useFlipCard();

  const [cards, setCards] = useState([
  {
    frontEn: 'apple',
    backRus: 'яблоко',
    example: 'Спелое и вкусное яблоко!',
  },
  {
    frontEn: 'hello',
    backRus: 'привет',
    example: 'Привет, мой дорогой друг!',
  },
  {
    frontEn: 'hour',
    backRus: 'час',
    example: 'Который сейчас час?',
  },
  {
    frontEn: 'end',
    backRus: 'конец',
    example: 'Конец сказки!',
  },
  {
    frontEn: 'light',
    backRus: 'свет',
    example: 'В доме включен свет!',
  },
]);

  const progValue = 100 / cards.length;
  const [progress, setProgress] = useState(progValue);

  const handleShuffleWords = () => {
    // Логика перемешивания слов
     resetFlip();

    setTimeout(() => {
      shuffle(cards);
      setCurrentCardIndex(0);
      setCards([...cards]);
      setProgress(prev => prev = progValue);
    }, 50)
  };

  const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
}
   
  return (
    <div className="container">
      <header>
        <a className="logo" href="">Wordsss</a>
      </header>
      <main>
        <div className="sidebar">
          {studyMode ? (
            // React компоненты должны начинаться с заглавной буквы (PascalCase) и должны быть импортированы из components.
            <StudyMode 
              currentWord={currentWord}
              totalWords={totalWords}
              progress={progress}
              onShuffleWords={handleShuffleWords}
            />
          ) : (
            <ExamMode 
              correctPercent={correctPercent}
              progress={progress}
              time={time}
            />
          )}
        </div>
        
        {/* Здесь будет основной контент - карточки слов */}
        <div className="content">
          <CardSlider 
            cards={cards}
            currentCardIndex={currentCardIndex}
            //самый простой способ передать состояние в другой компонент - это пропсы
            setCurrentCardIndex={setCurrentCardIndex}
            isFlipped={isFlipped}
            flipCardOver={flipCardOver}
          />
          {/* <ExamCards /> */}
        </div>
        <div className="motivation">Давай, ты сможешь!</div>
      </main>
      <ResultsModal />
    </div>
  );
}


export default App
