import {useState, useEffect} from 'react';

export const useTimer=()=> {
    //состояние для отображения текущего времени таймера в формате "минуты:секунды".
    let [time, setTime]=useState('00:00');
    //отвечает за управление состоянием работы таймера.
    //isTimerRunning - текущее состояние (true/false)
    const [isTimerRunning, setIsTimerRunning]=useState(false);

    //useEffect отвечает за всю логику выполнения и синхронизацию таймера с жизненным циклом компонента.
    //связывает: состояние isRunning(должен ли таймер работать) и Side effect setInterval(физический таймер в браузере)
    // ДО: два независимых состояния isRunning: true/false setInterval: работает/не работает
    // ПОСЛЕ: useEffect синхронизирует их isRunning=true  → setInterval ЗАПУЩЕН isRunning=false → setInterval ОСТАНОВЛЕН
    useEffect(() => {
        let interval = null;

        if (isTimerRunning) {
            // ШАГ 3: Запускаем интервал (выполняется каждую секунду)
            interval=setInterval(() => {
                //обновляем время
                setTime(time => {
                    const newTime=time.split(':');
                    let minutes=+newTime[0];
                    let seconds=+newTime[1];

                    if (seconds<=59) {
                        seconds++;
                    } else {
                        minutes++;
                        seconds=0;
                    }

                    if (minutes>=0&&seconds>=0) {
                        time=`${format(minutes)}:${format(seconds)}`
                    }

                    function format(value) {
                        if (value<10) {
                            return `0${value}`;
                        }
                        return value;
                    }
                return time;
                })                 
            }, 1000)
        }
        return () => {
            //без очистки: Создается новый интервал при каждом рендере (рендер 1 → интервал 1, рендер 2 → интервалы 1+2, и т.д.)
            clearInterval(interval); // Останавливаем таймер
        };
    })

    return {
        time,
        isTimerRunning,
        setIsTimerRunning
    };
}