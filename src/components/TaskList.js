import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useContext(TaskContext);

  const sortedTasks = tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  return (
    <div className="task-list">
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
