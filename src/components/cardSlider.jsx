import React from 'react';

const CardSlider = ({
    cards,
  card,
  flipCardOver, 
  next, 
  back,
  exam,
  currentCardIndex
}) => {
  return (
    <div className="study-cards">
      <div className="slider">
        <div className="flip-card" onClick={flipCardOver}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div id="card-front">
                <h1>{card.frontEn}</h1>
              </div>
            </div>
            <div className="flip-card-back" id="card-back">
              <div>
                <h1>{card.backRus}</h1>
                <p><b>Пример:</b> <span>{card.example}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slider-controls">
        <button onClick={back} disabled={currentCardIndex === 0}>◀️</button>
        <button onClick={exam}>Тестирование</button>
        <button onClick={next} disabled={currentCardIndex === cards.length - 1}>▶️</button>
      </div>
    </div>
  );
};

export default CardSlider;