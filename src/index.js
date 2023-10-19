import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TaskProvider } from './TaskContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
