import React, { useState, useContext, useRef } from 'react';
import { TaskContext } from '../TaskContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useOnClickOutside from '../hooks/useOnClickOutside';

function TaskContextMenu({ task, position, hideMenu, toggleImportant }) {
  const [tasks, setTasks] = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(task.dueDate);
  const [reminder, setReminder] = useState(task.reminder);
  const [customReminder, setCustomReminder] = useState("");

  const ref = useRef(); // <-- Define the ref here

  useOnClickOutside(ref, () => {  // Use the ref with the custom hook
    hideMenu();
    setIsModalOpen(false);
  });

  const saveDueDate = () => {
    setTasks(prevTasks => prevTasks.map(t => {
      if (t.id === task.id) {
        return { 
          ...t, 
          dueDate: selectedDate, 
          reminder: reminder === "custom" ? customReminder : reminder 
        };
      }
      return t;
    }));
    setIsModalOpen(false);
    hideMenu();
  };

  return (
    <div
      ref={ref}
      className="context-menu"
      style={{ top: position.y, left: position.x }}
    >
      <ul>
        <li onClick={() => setIsModalOpen(true)}>Set Due Date</li>
        <li onClick={toggleImportant}>
          {task.important ? "Unmark as Important" : "Mark as Important"}
        </li>
        <li onClick={() => {
          setTasks(tasks.filter(t => t.id !== task.id));
          hideMenu();
        }}>
          Delete
        </li>
      </ul>

      {isModalOpen && (
        <div className="date-modal">
          <h2>Select Due Date</h2>
          <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
          <div>
            Reminder:
            <select value={reminder} onChange={e => setReminder(e.target.value)}>
              <option value="30mins">30 mins</option>
              <option value="1hr">1 hr</option>
              <option value="12hr">12 hr</option>
              <option value="1day">1 day</option>
              <option value="custom">Custom</option>
            </select>
            {reminder === "custom" && 
            <input type="number" placeholder="Minutes" onChange={e => setCustomReminder(e.target.value)} />
}
          </div>
          <button onClick={saveDueDate}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TaskContextMenu;
