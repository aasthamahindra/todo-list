import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: ''});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = async e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/login', form);
            login(res.data.user, res.data.token);
            navigate('/todos');
        } catch (e) {
            alert('Login failed');
        }
    };

    return (
        <div className='auth-page'>
            <form className='auth-card' onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                <input name='email' type='email' placeholder='Email' onChange={handleChange} required />
                <input name='password' type='password' placeholder='Password' onChange={handleChange} required />
                <button type='submit'>LOGIN</button>
            </form>
        </div>
    );
}