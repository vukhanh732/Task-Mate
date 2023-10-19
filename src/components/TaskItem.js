import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-item">
      <input type="checkbox" checked={task.completed} onChange={() => {}} /> {/* onChange to be implemented */}
      <span>{task.title}</span>
      {/* Future: Edit and Delete buttons/options */}
    </div>
  );
}

export default TaskItem;
