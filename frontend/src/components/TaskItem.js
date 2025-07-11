import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function TaskItem({ task, onChange }) {
  const { token } = useAuth();

  const toggleComplete = async () => {
    await axios.put(
      `http://localhost:3000/task/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    onChange();
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:3000/task/${task._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onChange();
  };

  return (
    <div className={`todo-task ${task.completed ? 'completed' : ''}`}>
      <div onClick={toggleComplete} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <div
          className={`dot ${task.completed ? 'dot-completed' : ''}`}
          onClick={toggleComplete}
        />
        <span>{task.title}</span>
      </div>
      {task.description && (
            <div className="text-sm text-gray-500 mt-1 ml-6">
              {task.description}
            </div>
      )}

      <button onClick={deleteTask} className="delete-btn" title="Delete task">
        🗑️
      </button>
    </div>
  );
}