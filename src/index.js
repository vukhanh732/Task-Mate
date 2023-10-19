import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from './TaskContext';
import './index.css';
import Modal from 'react-modal';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
Modal.setAppElement('#root');
root.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
);
