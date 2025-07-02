import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

export default function TodoPage() {
    const [tasks, setTasks] = useState([]);
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

    return (
        <div>
            <h2>Your Todo List</h2>
            <button onClick={logout}>Logout</button>
            <TaskForm onAdd={fetchTasks}/>
            {tasks.map(task => (
                <TaskItem key={task._id} task={task} onChange={fetchTasks} />
            ))}
        </div>
    );
}