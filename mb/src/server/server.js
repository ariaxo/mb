const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

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

app.use(cors());
app.use(bodyParser.json());

app.get('/messages', (req, res) => {
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/messages', (req, res) => {
  const { alias, message } = req.body;
  db.query('INSERT INTO messages (alias, message) VALUES (?, ?)', [alias, message], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Message added');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
