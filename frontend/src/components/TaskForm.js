import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

export default function TaskForm({ onAdd }) {
    const [form, setForm] = useState({ title: '', description: '' });
    const { token } = useAuth();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        try {
            await axios.post('http://localhost:3000/api/tasks', form, {
                headers: { Authorization: `Bearer ${token}`},
            });
            setForm({ title: '', description: '' });
            onAdd();
        } catch (err) {
            alert('Error adding task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input id="new-task-input" name="title" placeholder="Task title..." value={form.title} onChange={handleChange} required/>
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <button type="submit">Add Task</button>
        </form>
    );
}