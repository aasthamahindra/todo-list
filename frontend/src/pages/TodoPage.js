/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import '../styles/todo.css';

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showForm, setShowForm] = useState(false);
  const { token, logout } = useAuth();

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3000/task", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log({ res })
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="todo-page">
      <div className="todo-header">Website todo</div>
      <div className="todo-card">
        {/* Controls */}
        <div className="todo-controls">
          <label>
            Filter:
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </label>

          <label>
            Sort:
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </label>
        </div>

        {/* Tasks */}
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} onChange={fetchTasks} />
          ))
        ) : (
          <p>No tasks found.</p>
        )}

        {/* TaskForm */}
        {showForm && (
          <div className="task-form">
            <TaskForm onAdd={() => { fetchTasks(); setShowForm(false); }} />
          </div>
        )}


        {/* Logout */}
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Floating Button */}
      <button
        className="new-task-button"
        onClick={() => setShowForm(true)}
      >
        + New task
      </button>
    </div>
  );
}