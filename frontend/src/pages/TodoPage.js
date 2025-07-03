import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

export default function TodoPage() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc');
    const {token, logout} = useAuth();

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:3000/tasks', {
            headers: { Authorization: `Bearer ${token}`}
        });
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    });

    const filteredTasks = tasks.filter((task) => {
        if(filter === 'completed') return task.completed;
        if(filter === 'pending') return !task.completed;
        return true;
    }).sort((a, b) => {
        if (sortOrder === 'asc') return new Date(a.createdAt) - new Date(b.createdAt);
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div>
            <h2>Your Todo List</h2>
            <button onClick={logout}>Logout</button>
            <TaskForm onAdd={fetchTasks}/>

            <div style={{ marginTop: '1rem' }}>
                <label>Filter: </label>
                <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value='all'>All</option>
                    <option value='completed'>Completed</option>
                    <option value='pending'>Pending</option>
                </select>

                <label style={{ marginLeft: '1rem' }}>Sort: </label>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value='desc'>Newest First</option>
                    <option value='asc'>Oldest First</option>
                </select>
            </div>
            {filteredTasks.length ? (
                filteredTasks.map((task) => (
                    <TaskItem key={task._id} task={task} onChange={fetchTasks} />
                ))
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    );
}