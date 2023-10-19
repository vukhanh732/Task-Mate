import React from 'react';
import TopBar from './components/TopBar';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <TopBar />
      <TaskList />
      {/* Future: Modals and other components */}
    </div>
  );
}

function ColorGuide() {
  const categories = ["Work", "School", "Home", "Personal", "Shopping"];
  return (
    <div className="color-guide">
      <p>Category Colors:</p>
      <ul>
        {categories.map(cat => (
          <li key={cat} className={`category-${cat}`}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
