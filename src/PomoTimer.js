import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskList from './components/TaskList'; 

function PomoTimer() {
    
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(25);
    const [inputSeconds, setInputSeconds] = useState(0);
    
    const totalSeconds = inputMinutes * 60 + inputSeconds;
    const currentTimeInSeconds = minutes * 60 + seconds;
    const fractionCompleted = currentTimeInSeconds / totalSeconds;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = fractionCompleted * circumference;
    
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [mode, setMode] = useState('Pomodoro');
   
    const setTimer = () => {
        setIsActive(false);  // Stop the timer
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
                    clearInterval(interval);
                    playBuzzSound();
                    if (mode !== 'Break') {
                        alert('Work time is over! Break time starts now.');
                        setMinutes(breakMinutes);
                        setSeconds(breakSeconds);
                        setMode('Break');
                    } else {
                        alert('Break time is over! Work time starts now.');
                        setMinutes(inputMinutes);
                        setSeconds(inputSeconds);
                        setMode('Pomodoro');
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, mode, breakMinutes, breakSeconds, inputMinutes, inputSeconds]);

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            backgroundColor: mode === 'Break' ? 'lightgreen' : '#f7f8fc',
            fontFamily: 'Roboto, sans-serif'
        }}>
            <Link to="/">Back to Tasks</Link>
            <h2>{mode}</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <div>
                    <p>Set Work Timer:</p>
                    <input 
                        type="number" 
                        value={inputMinutes} 
                        onChange={e => setInputMinutes(e.target.value)} 
                        min="0"
                        placeholder="Minutes..."
                        style={{ fontFamily: 'Roboto, sans-serif', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '5px' }}
                    />
                    <input 
                        type="number" 
                        value={inputSeconds} 
                        onChange={e => setInputSeconds(e.target.value)} 
                        min="0" 
                        max="59"
                        placeholder="Seconds..."
                        style={{ fontFamily: 'Roboto, sans-serif', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '5px' }}
                    />
                </div>

                <div>
                    <p>Set Break Timer:</p>
                    <input 
                        type="number" 
                        value={breakMinutes} 
                        onChange={e => setBreakMinutes(e.target.value)} 
                        min="0"
                        placeholder="Minutes..."
                        style={{ fontFamily: 'Roboto, sans-serif', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '5px' }}
                    />
                    <input 
                        type="number" 
                        value={breakSeconds} 
                        onChange={e => setBreakSeconds(e.target.value)} 
                        min="0" 
                        max="59"
                        placeholder="Seconds..."
                        style={{ fontFamily: 'Roboto, sans-serif', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '5px' }}
                    />
                </div>
            </div>
            
            <button 
                onClick={setTimer}
                style={{ fontFamily: 'Roboto, sans-serif', padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Set Timers
            </button>
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
