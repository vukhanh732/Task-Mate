import React, { useState, useContext } from 'react';
import { TaskContext } from '../TaskContext';

function TopBar() {
  const [tasks, setTasks] = useContext(TaskContext);
  const [taskInput, setTaskInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Work", "School", "Home", "Personal", "Shopping"];

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskInput,
        completed: false,
        category: selectedCategory
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
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
      <select 
        value={selectedCategory} 
        onChange={e => setSelectedCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat} className={`category-${cat}`}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TopBar;
