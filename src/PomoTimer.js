import React, { useState, useEffect } from 'react';

const PomoTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [pomoCount, setPomoCount] = useState(0);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        alert('Timer is done!');
                        setIsActive(false);
                        setPomoCount(prevCount => {
                            const newCount = prevCount + 1;
                            if (newCount % 4 === 0) {
                                setMinutes(15); // Long break
                            } else {
                                setMinutes(5);  // Short break
                            }
                            return newCount;
                        });
                        setSeconds(0);
                    } else {
                        setMinutes(prevMinutes => prevMinutes - 1)
                        setSeconds(59);
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div>
            <h2>Pomodoro Timer</h2>
            <div>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>
        </div>
    );
};

export default PomoTimer;
