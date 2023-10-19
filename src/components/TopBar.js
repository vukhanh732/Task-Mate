import React from 'react';

function TopBar() {
  return (
    <div className="top-bar">
      {/* Search Input */}
      <input type="text" placeholder="Search tasks..." />

      {/* Category Dropdown */}
      <select>
        <option value="all">All</option>
        <option value="school">School</option>
        <option value="work">Work</option>
        <option value="home">Home</option>
      </select>

      {/* Add Task Button */}
      <button>Add Task</button>
    </div>
  );
}

export default TopBar;
