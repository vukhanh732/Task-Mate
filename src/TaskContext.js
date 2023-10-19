import React, { useState, createContext, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = props => {
  // Try to get tasks from localStorage first, fall back to an empty array
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const [tasks, setTasks] = useState(initialTasks);
  const [filterCategory, setFilterCategory] = useState("All");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={[tasks, setTasks, filterCategory, setFilterCategory]}>
      {props.children}
    </TaskContext.Provider>
  );
};
