import {useState} from 'react';

export const IsOpenResults=() => {
    const [isOpenResults, setIsOpenResults]=useState(false);

    const openResults=()=> {
        setIsOpenResults(!isOpenResults);
    };

    return {
        isOpenResults,
        openResults
    };
};