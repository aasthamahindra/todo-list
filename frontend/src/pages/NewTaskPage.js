import React from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';
import '../styles/todo.css';

export default function NewTaskPage() {
  const navigate = useNavigate();

  const handleTaskAdded = () => {
    navigate('/todos');
  };

  return (
    <div className="todo-page">
      <div className='todo-form-card'>
        <h2>Add a new task</h2>
        <TaskForm onAdd={handleTaskAdded} />
      </div>
    </div>
  );
}
