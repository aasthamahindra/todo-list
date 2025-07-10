import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function TaskItem({ task, onChange }) {
  const { token } = useAuth();

  const toggleComplete = async () => {
    await axios.put(
      `http://localhost:3000/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    onChange();
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:3000/tasks/${task._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onChange();
  };

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      {/* Left: round dot + title */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={toggleComplete}>
        {/* Dot */}
        <div
          className={`h-4 w-4 rounded-full border-2 transition ${
            task.completed ? 'bg-purple-500 border-purple-500' : 'border-gray-400'
          }`}
        ></div>
        {/* Title */}
        <div
          className={`text-sm ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task.title}
        </div>
      </div>

      {/* Right: Trash icon */}
      <button onClick={deleteTask} className="text-gray-400 hover:text-red-400 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}