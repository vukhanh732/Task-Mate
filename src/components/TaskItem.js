import React from 'react';

function TaskItem() {
  return (
    <div className="task-item">
      <input type="checkbox" />
      <span>Task Title Here</span>
      {/* Other task details and options */}
    </div>
  );
}

export default TaskItem;
