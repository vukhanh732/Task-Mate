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

export default App;
