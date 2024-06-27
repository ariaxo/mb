// src/App.js
import React, { useState} from 'react';
import './App.css';
import MessageBoard from './MessageBoard';
import AdminLogin from './AdminLogin';
import { Button } from '@mui/material';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

  return (
    <div className="App">
          <MessageBoard />
          
    </div>
  );
}

export default App;

