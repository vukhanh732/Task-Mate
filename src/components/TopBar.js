import React, { useState, useContext } from 'react';
import { TaskContext } from '../TaskContext';

function TopBar() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useContext(TaskContext);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskInput,
        completed: false
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTaskInput("");
    }
  };

  return (
    <div className="top-bar">
      <input 
        type="text" 
        placeholder="New task..." 
        value={taskInput} 
        onChange={e => setTaskInput(e.target.value)} 
      />
      <button onClick={addTask}>Add Task</button>
      {/* Future: Dropdown for categories and search functionality */}
    </div>
  );
}

export default TopBar;
