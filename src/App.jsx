// src/App.jsx - корневой компонент со всей структурой приложения

// Вместо <link rel="stylesheet" href="style.css"> в HTML, в React импортируйте CSS прямо в JSX-файлы:
//import './App.css';
//import './components/WordCard.css';

import { useState } from 'react'
import ExamMode from './components/examMode';
import StudyMode from './components/studyMode';
import CardSlider from './components/cardSlider';
// import ExamCards from './components/examCards';
import ResultsModal from './components/resultsModal';
import './App.css';

const cards = [
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
];

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
  const [studyMode] = useState(true); // true - режим изучения, false - экзамен
  const [currentWord, setCurrentWord] = useState(1);
  const [totalWords, setTotalWords] = useState(5);
  const [progress, setProgress] = useState(0);
  const [correctPercent, setCorrectPercent] = useState(0);
  const [time, setTime] = useState('00:00');
  const [card] = useState(cards[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleShuffleWords = () => {
    // Логика перемешивания слов
    console.log('Перемешиваем слова...');
    setCurrentWord(1);
    setProgress(0);
  };

  const flipCardOver = () => {
    //логика для переворота карточки с английского на русский
    console.log('карточка нажата для перевода');
  }

    const next = () => {
    //логика для слайдера = следующая карточка
    console.log('карточка нажата для перевода вперед');
  }

    const back = () => {
    //логика для слайдера = предыдущая карточка
    console.log('карточка нажата для перевода назад');
  }

    const exam = () => {
    //логика для слайдера = перейти к экзамену
    console.log('экзамен');
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
            card={card}
            flipCardOver={flipCardOver}
            next={next}
            back={back}
            exam={exam}
            currentCardIndex={currentCardIndex}
            cards={cards}
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
