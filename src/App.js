import React from 'react';
import TopBar from './components/TopBar';
import TaskList from './components/TaskList';
import PomoTimer from './PomoTimer';  // Ensure this path points correctly to your PomoTimer component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';

function App() {
    return (
        
        <Router>
            <div className="App">
                <Header />  {/* Include the header here */}
                <TopBar />
                <Routes>
                    <Route path="/pomo-timer" element={<PomoTimer />} />
                    <Route path="/" element={<TaskList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
