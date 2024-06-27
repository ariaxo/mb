// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProviderWrapper } from './ThemeContext';

ReactDOM.render(
    <ThemeProviderWrapper>
        <App />
    </ThemeProviderWrapper>,
    document.getElementById('root')
);

