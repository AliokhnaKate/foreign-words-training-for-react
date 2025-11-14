function CardSlider({cards, setCurrentWord, currentCardIndex, setCurrentCardIndex, progValue, setProgress, isFlipped, flipCardOver, setStudyMode, setIsTimerRunning }) {
    const card=cards[currentCardIndex];

    const next = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
            setProgress(prev => prev + progValue);
            setCurrentWord(prev => prev + 1);
        }
    }

    const back = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(prev => prev - 1);
            setProgress(prev => prev - progValue);
            setCurrentWord(prev => prev - 1);
        }
    }

    const exam = () => {
    //логика для слайдера = перейти к экзамену
    setStudyMode(false);
    setCurrentCardIndex(0);      
    // 3. Запускаем таймер экзамена
    setIsTimerRunning(true)
    }

    return (
        <div className="study-cards">
            <div className="slider">
                <div className={`flip-card ${isFlipped? 'active':''}`} onClick={flipCardOver}>
                    <div className="flip-card-inner">
                        <div className="flip-card-back" id="card-back">
                            <div>
                                <h1>{card.backRus}</h1>
                                <p><b>Пример:</b> <span>{card.example}</span></p>
                            </div>
                        </div>
                        <div className="flip-card-front">
                            <div id="card-front">
                                <h1>{card.frontEn}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slider-controls">
                <button onClick={back} disabled={currentCardIndex===0}>◀️</button>
                <button onClick={exam}>Тестирование</button>
                <button onClick={next} disabled={currentCardIndex===cards.length-1}>▶️</button>
            </div>
        </div>
);
}

export default CardSlider;