import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const { token, logout } = useAuth();

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3000/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  });

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
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">
        {/* Header */}
        <div className="bg-purple-500 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
          <div className="text-2xl font-bold">Website todo</div>
          <button className="text-3xl font-light">&#9776;</button> {/* Hamburger icon */}
        </div>

        {/* Filter/Sort */}
        <div className="px-4 py-2 flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <label>Filter:</label>
            <select
              className="rounded px-2 py-1 border border-gray-300"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label>Sort:</label>
            <select
              className="rounded px-2 py-1 border border-gray-300"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Tasks */}
        <div className="px-4 pb-4">
          {filteredTasks.length ? (
            filteredTasks.map((task) => (
              <TaskItem key={task._id} task={task} onChange={fetchTasks} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No tasks found.</p>
          )}
        </div>

        {/* TaskForm */}
        <div className="px-4 pb-4">
          <TaskForm onAdd={fetchTasks} />
        </div>

        {/* Logout */}
        <div className="px-4 pb-4">
          <button
            onClick={logout}
            className="w-full bg-red-100 text-red-500 font-semibold py-2 rounded-md hover:bg-red-200 transition"
          >
            Logout
          </button>
        </div>

        {/* New Task Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              document.getElementById("new-task-input")?.focus(); // optionally trigger form
            }}
            className="w-full bg-purple-500 text-white font-bold py-2 rounded-full shadow-md hover:bg-purple-600 transition"
          >
            + New task
          </button>
        </div>
      </div>
    </div>
  );
}