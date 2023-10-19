import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PomoTimer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [pomoCount, setPomoCount] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(25);
    const [inputSeconds, setInputSeconds] = useState(0);

    const setTimer = () => {
        setMinutes(inputMinutes);
        setSeconds(inputSeconds);
    };

    const playBuzzSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buzz = new Audio('https://www.soundjay.com/button/beep-07.wav');
        const source = audioContext.createMediaElementSource(buzz);
        source.connect(audioContext.destination);
        buzz.play();
    };

    useEffect(() => {
        let interval;
    
        if (isActive && !(minutes === 0 && seconds === 0)) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (seconds === 0 && minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(interval); // Ensure the interval is cleared if we reach this point.
                    playBuzzSound();
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
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
    
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);
    

    return (
        <div style={{ textAlign: 'center' }}>
            <Link to="/">Back to Tasks</Link>
            <h2>Pomodoro Timer</h2>

            <div>
                Set Timer: 
                <input type="number" value={inputMinutes} onChange={e => setInputMinutes(e.target.value)} min="0" /> minutes
                <input type="number" value={inputSeconds} onChange={e => setInputSeconds(e.target.value)} min="0" max="59" /> seconds
                <button onClick={setTimer}>Set</button>
            </div>

            <div style={{ 
                fontSize: '2rem', 
                margin: '20px auto', 
                border: '2px solid black', 
                padding: '10px', 
                borderRadius: '50%', 
                width: '150px', 
                height: '150px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>
        </div>
    );
};

export default PomoTimer;
