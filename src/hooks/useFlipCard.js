//Чаще используют формат .js потому что:
    //Хуки-это логика, а не компоненты
    //Они не возвращают JSX(обычно)
    //Соглашения сообщества-большинство проектов используют.js
    //Меньше путаницы- .jsx ассоциируется с компонентами

//Правила хуков:
    //✅ Можно вызывать хуки на верхнем уровне функционального компонента
    //❌ Нельзя вызывать хуки внутри условий, циклов, вложенных функций

import {useState} from 'react';

export const useFlipCard=() => {
    const [isFlipped, setIsFlipped]=useState(false);

    const flipCardOver=() => {
        setIsFlipped(!isFlipped);
    };

    //сбрасывает переворот при смене карточки
    const resetFlip=() => {
        setIsFlipped(false);
    };

    return {
        isFlipped,
        flipCardOver,
        resetFlip
    };
};