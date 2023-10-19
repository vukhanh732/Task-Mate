import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks, filterCategory, setFilterCategory] = useContext(TaskContext);
  const categories = ["All", "Work", "School", "Home", "Personal", "Shopping"];

  return (
    <div>
      <select 
        value={filterCategory} 
        onChange={e => setFilterCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="task-list">
        {tasks
          .filter(task => filterCategory === "All" || task.category === filterCategory)
          .map(task => (
            <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
