import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskList from './components/TaskList'; 

function PomoTimer() {
    
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [pomoCount, setPomoCount] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(25);
    const [inputSeconds, setInputSeconds] = useState(0);
    
    const totalSeconds = inputMinutes * 60 + inputSeconds;
    const currentTimeInSeconds = minutes * 60 + seconds;
    const fractionCompleted = currentTimeInSeconds / totalSeconds;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = fractionCompleted * circumference;
    
    
   
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
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Link to="/">Back to Tasks</Link>
            <h2>Pomodoro Timer</h2>

            <div>
                Set Timer: 
                <input type="number" value={inputMinutes} onChange={e => setInputMinutes(e.target.value)} min="0" /> minutes
                <input type="number" value={inputSeconds} onChange={e => setInputSeconds(e.target.value)} min="0" max="59" /> seconds
                <button onClick={setTimer}>Set</button>
            </div>

            {/* Updated Timer's Display */}
            <div style={{ position: 'relative', height: '150px', width: '150px', margin: '20px auto' }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle 
                        cx="75" 
                        cy="75" 
                        r="70"
                        stroke="#E0E0E0"
                        strokeWidth="5"
                        fill="none"
                    />
                    <circle 
                        cx="75" 
                        cy="75" 
                        r="70"
                        stroke="#FF4500"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        transform="rotate(-90 75 75)"
                    />
                </svg>
                <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    fontSize: '2rem' 
                }}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
            </div>


            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>

            <hr style={{ margin: '40px 0' }}/>  {/* Horizontal line for separation */}
            
            <TaskList />
        </div>
    );
    
};

export default PomoTimer;
