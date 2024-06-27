const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const secretKey = '12345';

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mann0216',
    database: 'message_board'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('No token provided.');

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token.');
        req.userId = decoded.id;
        next();
    });
}

// Admin login
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Replace this with a secure method of fetching admin details
    const adminUsername = 'admin';
    const adminPasswordHash = bcrypt.hashSync('admin', 8);

    if (username === adminUsername && bcrypt.compareSync(password, adminPasswordHash)) {
        const token = jwt.sign({ id: adminUsername }, secretKey, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Delete message
app.delete('/messages/:id', verifyToken, (req, res) => {
    const messageId = req.params.id;

    db.query('DELETE FROM messages WHERE id = ?', [messageId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Message deleted successfully' });
    });
});

// Existing routes
app.get('/messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/messages', (req, res) => {
    const { alias, message } = req.body;

    db.query('INSERT INTO messages (alias, message) VALUES (?, ?)', [alias, message], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
