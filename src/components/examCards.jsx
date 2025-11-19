import {useState, useEffect, useMemo} from 'react';

const ExamCards = ({cards, progValue, progress, setProgress, correctPercent, setCorrectPercent}) => {
    //нужно состояние для того, чтобы карточки перемешивались 1 раз и useEffect и в useEffect сбрасывать и другие состояния
    //массив карточек

    const shuffledCards = useMemo(() => {
        setProgress(0);
        // Используйте map, когда нужно преобразовать каждый элемент в один новый элемент
        // Используйте flatMap, когда нужно преобразовать каждый элемент в массив элементов и объединить их
        return cards.flatMap(card => [card.frontEn, card.backRus])
            .sort(() => Math.random() - 0.5)
    }, [])

    useEffect(() => {
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
            progress = progValue;
            setProgress(prev=>prev+progress);
            correctPercent=progValue;
            setCorrectPercent(prev=>prev+correctPercent)
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
            className+=' hidden';
        }

        return className;
    }

  return (
    <div id="exam-cards">
        {shuffledCardsAfter.length>0 ? (
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
        ) : (
            <div className="results-modal">
                <ResultsModal />
            </div>
        )}
    </div>
  );
}
export default ExamCards;