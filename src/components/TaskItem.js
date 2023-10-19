import React, { useState, useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { FaStar } from 'react-icons/fa';

function TaskItem({ task, showContextMenu }) {
    const [tasks, setTasks] = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const toggleCompletion = () => {
        setTasks(tasks.map(t => {
            if (t.id === task.id) {
                return { ...t, completed: !t.completed };
            }
            return t;
        }));
    };

    const saveEdit = () => {
        setTasks(tasks.map(t => {
            if (t.id === task.id) {
                return { ...t, title: editedTitle };
            }
            return t;
        }));
        setIsEditing(false);
    };

    const getDueDateDisplay = () => {
        if (!task.dueDate) return null;

        const currentDate = new Date();
        const dueDate = new Date(task.dueDate);

        if (dueDate < currentDate) {
            return <span className="due-date overdue"> (Overdue: {dueDate.toLocaleDateString()})</span>;
        } else if ((dueDate - currentDate) / (1000 * 60 * 60 * 24) <= 2) {  // if the task is due in less than 2 days
            return <span className="due-date due-soon"> (Due soon: {dueDate.toLocaleDateString()})</span>;
        } else {
            return <span className="due-date"> ({dueDate.toLocaleDateString()})</span>;
        }
    };

    return (
        <div
            className={`task-item category-${task.category}`}
            onContextMenu={e => showContextMenu(e, task)}
        >
            <div className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input type="checkbox" checked={task.completed} onChange={toggleCompletion} />

                {task.important &&
                    <FaStar style={{ color: 'yellow', marginRight: '5px' }} />
                }

                {
                    isEditing ?
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={e => setEditedTitle(e.target.value)}
                            onBlur={saveEdit}
                            onKeyPress={event => {
                                if (event.key === "Enter") {
                                    saveEdit();
                                }
                            }}
                        />
                        :
                        <span onDoubleClick={() => setIsEditing(true)}>
                            {task.title}
                        </span>
                }
                {getDueDateDisplay()}
            </div>
        </div>
    );
}

export default TaskItem;
