import {useState, useEffect, useMemo} from 'react';

const ExamCards = ({cards, progValue, setProgress, setCorrectPercent, setwordAttempts, openResults, setIsTimerRunning}) => {
    //нужно состояние для того, чтобы карточки перемешивались 1 раз и useEffect и в useEffect сбрасывать и другие состояния
    //массив карточек

    const shuffledCards = useMemo(() => {
        // Используйте map, когда нужно преобразовать каждый элемент в один новый элемент
        // Используйте flatMap, когда нужно преобразовать каждый элемент в массив элементов и объединить их
        // этот код выполняется только когда зависимости меняются
        return cards.flatMap(card => [card.frontEn, card.backRus])
            .sort(() => Math.random() - 0.5)
        //useMemo кэширует результат на основе зависимостей, ❌ если cards не в зависимостях, те [] - будет использоваться начальное значение
    }, [cards])

    useEffect(() => {
        setProgress(0);
        setSelectedCard(null);
        setMatchedCards([]);
        setWrongPairs([]);
        setFadingOutCards([])
    }, [cards]);

    const [shuffledCardsAfter, setShuffledCardsAfter] = useState(shuffledCards);
    //выбранная карта
    //Здесь хранится слово выбранной карточки, текущее значение будет null
    const [selectedCard, setSelectedCard] = useState(null);
    
    // Добавляем состояние для проверенной пары
    //совпадающие карты
    const [matchedCards, setMatchedCards] = useState([]);
    //несовпадающие карты
    const [wrongPairs, setWrongPairs] = useState([]);
    //карточки для исчезновения
    const [fadingOutCards, setFadingOutCards] = useState([]);
    
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

    const onCardClick = (event) => {
        //добавляет все выбранные слова
        //при этой записи wordAttempts.push(event) и setwordAttempts(wordAttempts), wordAttempts меняется при каждом клике - это массив,
        //который мутирует и openResults может создавать новый объект при каждом рендере. Лучше использовать состояние setwordAttempts(prev => [...prev, event])

        // wordAttempts.push(event)
        // setwordAttempts(wordAttempts);

        setwordAttempts(prev => [...prev, event]);

        if (selectedCard==null) {
        //Устанавливает эту карточку со словом как выбранную карточку
            setSelectedCard(event);
        } else {
            checkCards(selectedCard, event);
            setSelectedCard(null);
        }
    }

    function checkCards(card1, card2) {
        const keysValues = Object.entries(dictionary);
        const findCard = keysValues.find(item => item.includes(card1) && item.includes(card2));
    
        if (findCard) {
            setMatchedCards([card1, card2]);
            setFadingOutCards([card1, card2]);
            // progress = progValue; // ❌ Нельзя напрямую изменять пропсы
            setProgress(prev=>prev+progValue);
            setCorrectPercent(prev=>prev+progValue)
            // localStorage.setItem('myProgress', progress);
                setTimeout(() => {
                    //Если shuffledCards должен изменяться и нужно рендерить другой массив, то нужно убрать useState и вычислять перемешанные карточки напрямую или использовать другие подходы: useMemo, если cards меняется нечасто, или useEffect, если нужно полностью сбрасывать игру при изменении cards
                    setShuffledCardsAfter(prev => prev.filter((item) => item!==card1&& item!==card2));
                    setMatchedCards([]);
                    setFadingOutCards([]);
                }, 1000);
        } else {
            setWrongPairs([card1, card2]);

            setTimeout(() => {
                setWrongPairs([]);
            }, 1000);
        }
    }

    const getCardClass=(cardText)=> {
        let className = 'card';
        if (matchedCards.includes(cardText)||selectedCard===cardText) {
            //классы обязательно добавляются с пробелами, тк карточке уже присвоен класс 'card', если без пробела, то будет 'cardcorrect'
            className+=' correct';
        }

        if (wrongPairs.includes(cardText)) {
            className+=' wrong';
        }

        if (fadingOutCards.includes(cardText)) {
            className+=' fade-out';
        }

        return className;
    }

    const [hasOpenedResults, setHasOpenedResults] = useState(false);

    useEffect(() => {
        // const getResults=()=> {
        //если вызов функции, которая изменяет состояние, как openResults, происходит в теле компонента, а не в useEffect или обработчике события, то будет ошибка.
            if (shuffledCardsAfter.length===0 && !hasOpenedResults) {
                setIsTimerRunning(false);
                openResults(true);
                setHasOpenedResults(true); //для предотвращения повторных вызовов
            }
        // }
    }, [shuffledCardsAfter.length, openResults, setIsTimerRunning, hasOpenedResults]);

  return (
    <div id="exam-cards">
        {shuffledCardsAfter.length>0 && (
            shuffledCardsAfter.map((cardText) => {
                return (
                    <div
                        //key={word} - уникальный ключ для React
                        key={cardText}
                        //Всегда: "card", плюс "correct" только если selectedCard === cardText
                        className={getCardClass(cardText)}
                        onClick={() => onCardClick(cardText)}
                    >
                    {cardText}
                    </div>
                );
            })
        )}
    </div>
  );
}
export default ExamCards;