import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useContext(TaskContext);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
