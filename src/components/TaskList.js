import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, , filterCategory, setFilterCategory] = useContext(TaskContext);
  const categories = ["All", "Work", "School", "Home", "Personal", "Shopping"];

  return (
    <div>
      <select 
        value={filterCategory} 
        onChange={e => setFilterCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat} className={`category-${cat}`}>
            {cat}
          </option>
        ))}
      </select>
      <div className="task-list">
        {tasks
          .filter(task => filterCategory === "All" || task.category === filterCategory)
          .sort((a, b) => a.completed - b.completed)
          .map(task => (
            <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
