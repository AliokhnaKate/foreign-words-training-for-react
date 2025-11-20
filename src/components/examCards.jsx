import {useState, useEffect, useMemo} from 'react';

const ExamCards = ({cards, progValue, setProgress, setCorrectPercent, setwordAttempts, openResults, setIsTimerRunning}) => {

    const shuffledCards = useMemo(() => {
        return cards.flatMap(card => [card.frontEn, card.backRus])
            .sort(() => Math.random() - 0.5)
    }, [cards])

    useEffect(() => {
        setProgress(0);
        setSelectedCard(null);
        setMatchedCards([]);
        setWrongPairs([]);
        setFadingOutCards([])
    }, [cards]);

    const [shuffledCardsAfter, setShuffledCardsAfter] = useState(shuffledCards);
    const [selectedCard, setSelectedCard] = useState(null);
    const [matchedCards, setMatchedCards] = useState([]);
    const [wrongPairs, setWrongPairs] = useState([]);
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
        setwordAttempts(prev => [...prev, event]);

        if (selectedCard==null) {
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
            setProgress(prev=>prev+progValue);
            setCorrectPercent(prev=>prev+progValue);
                setTimeout(() => {
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
            if (shuffledCardsAfter.length===0 && !hasOpenedResults) {
                setIsTimerRunning(false);
                openResults(true);
                setHasOpenedResults(true);
            }
        // }
    }, [shuffledCardsAfter.length, openResults, setIsTimerRunning, hasOpenedResults]);

  return (
    <div id="exam-cards">
        {shuffledCardsAfter.length>0 && (
            shuffledCardsAfter.map((cardText) => {
                return (
                    <div
                        key={cardText}
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