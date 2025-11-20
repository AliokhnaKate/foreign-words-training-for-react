import {useState} from 'react';

export const useFlipCard=() => {
    const [isFlipped, setIsFlipped]=useState(false);

    const flipCardOver=() => {
        setIsFlipped(!isFlipped);
    };

    const resetFlip=() => {
        setIsFlipped(false);
    };

    return {
        isFlipped,
        flipCardOver,
        resetFlip
    };
};