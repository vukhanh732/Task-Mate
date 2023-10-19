import React from 'react';
import TaskItem from './TaskItem';

function TaskList() {
  return (
    <div className="task-list">
      {/* Example Task Item */}
      <TaskItem />
      {/* You'll render multiple TaskItems based on data later */}
    </div>
  );
}

export default TaskList;
