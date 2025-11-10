// import React from 'react';

// const ExamCards = ({ cards, onCardClick, matchedCards, selectedCard }) => {
//   const allCards = cards.flatMap(card => [card.frontEn, card.backRus])
//     .sort(() => Math.random() - 0.5);

//   return (
//     <div id="exam-cards">
//       {allCards.map((cardText, index) => {
//         const isMatched = matchedCards.includes(cardText);
//         const isSelected = selectedCard === cardText;
        
//         let className = 'card';
//         if (isMatched) className += ' fade-out';
//         if (isSelected) className += ' correct';
        
//         return (
//           <div
//             key={index}
//             className={className}
//             onClick={() => !isMatched && onCardClick(cardText)}
//           >
//             {cardText}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ExamCards;

// function renderExamCards(arr) {
//     myProgress = 0;
//     studyMode.classList.add('hidden');
//     examMode.classList.remove('hidden');

//     arr.forEach(function (card) {
//         const myCardEn = makeCard();
//         myCardEn.textContent = card['frontEn'];
//         const myCardRus = makeCard();
//         myCardRus.textContent = card['backRus'];
//         examCards.append(myCardEn, myCardRus);
//     });

//     examCards.addEventListener('click', clickCard)
// }