import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function RegisterPage() {
    const [form, setForm] = useState({ username: '', email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = async e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/register', form);
            navigate('/login');
        } catch (e) {
            alert('Registeration failed');
        }
    };

    return (
        <div className='auth-page'>
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <input name='username' placeholder='Username' onChange={handleChange} required />
                <input name='email' type='email' placeholder='Email' onChange={handleChange} required />
                <input name='password' type='password' placeholder='Password' onChange={handleChange} required />
                <button type='submit'>SIGN UP</button>
            </form>
        </div>
    );
}