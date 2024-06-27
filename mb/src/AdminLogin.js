import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, TextField, Container, CssBaseline, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';

const AdminLogin = ({ setAdminToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/login', { username, password });
            setAdminToken(response.data.token);
            alert('Login successful');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    const formStyle = {
        backgroundColor: '#f0e6f7', // ����ɫ����
        padding: '20px',
        borderRadius: '8px', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
        width: '100vw', // ��ȵ����ӿڿ��
        maxWidth: '100%', // ����Ȳ�����������
        boxSizing: 'border-box', // ȷ�� padding ����Ӱ���ȼ���
        margin: '0 auto', // ������ʾ
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <Typography style={{ marginTop: '16px' }}>Admin Login</Typography>
            <TextField type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <Button type="submit">Login</Button>
        </form>
    );
};

export default AdminLogin;
