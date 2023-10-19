import React, { useState, createContext } from 'react';

export const TaskContext = createContext();

export const TaskProvider = props => {
  const [tasks, setTasks] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All"); // New state

  return (
    <TaskContext.Provider value={[tasks, setTasks, filterCategory, setFilterCategory]}>
      {props.children}
    </TaskContext.Provider>
  );
};
