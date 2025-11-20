import {useState, useEffect} from 'react';

export const useTimer=()=> {
    let [time, setTime]=useState('00:00');
    const [isTimerRunning, setIsTimerRunning]=useState(false);

    useEffect(() => {
        let interval = null;

        if (isTimerRunning) {
            interval=setInterval(() => {
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
            clearInterval(interval);
        };
    })

    return {
        time,
        isTimerRunning,
        setIsTimerRunning
    };
}