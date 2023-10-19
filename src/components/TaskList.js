import React, { useState, useContext } from 'react';
import { TaskContext } from '../TaskContext';
import TaskItem from './TaskItem';
import TaskContextMenu from './TaskContextMenu';

function TaskList() {
  const [tasks, setTasks, filterCategory, setFilterCategory] = useContext(TaskContext);
  const categories = ["All", "Work", "School", "Home", "Personal", "Shopping"];
  
  const [contextMenuTask, setContextMenuTask] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const showContextMenu = (e, task) => {
    e.preventDefault();
    setContextMenuTask(task);
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
  };

  const hideContextMenu = () => {
    setContextMenuTask(null);
  };

  return (
    <div>
      <div onContextMenu={hideContextMenu}>
      {/* ... existing code ... */}
      {contextMenuTask && (
        <TaskContextMenu
          task={contextMenuTask}
          position={contextMenuPosition}
          hideMenu={hideContextMenu}
          deleteTask={taskId => {
            setTasks(tasks.filter(task => task.id !== taskId));
            hideContextMenu();
          }}
        />
      )}
      </div>
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
            <TaskItem key={task.id} task={task} showContextMenu={showContextMenu} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
