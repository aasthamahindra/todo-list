import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function TaskItem({ task, onChange }) {
    const { token } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ title: task.title, description: task.description });

    const toggleComplete = async () => {
        await axios.put(`http://localhost:3000/tasks/${task._id}`, {
            completed: !task.completed
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        onChange();
    };

    const deleteTask = async () => {
        await axios.delete(`http://localhost:3000/tasks/${task._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        onChange();
    };

    const saveEdit = async () => {
        await axios.put(`http://localhost:3000/tasks/${task._id}`, editForm, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setIsEditing(false);
        onChange();
    };

    return (
        <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            {isEditing ? (
                <>
                    <input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                    <input
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                    </h3>
                    <p>{task.description}</p>
                    <button onClick={toggleComplete}>
                        {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={deleteTask}>Delete</button>
                </>
            )}

        </div>
    );
}