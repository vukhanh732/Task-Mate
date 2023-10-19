import React from 'react';

function TaskContextMenu({ task, position, hideMenu, deleteTask }) {
  return (
    <div
      className="context-menu"
      style={{ top: position.y, left: position.x }}
      onClick={hideMenu}
    >
      <ul>
        <li onClick={() => console.log('Set Due Date for', task.title)}>Set Due Date</li>
        <li onClick={() => console.log('Mark as Important', task.title)}>Mark as Important</li>
        <li onClick={() => deleteTask(task.id)}>Delete</li>
      </ul>
    </div>
  );
}

export default TaskContextMenu;
