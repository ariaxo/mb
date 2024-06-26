import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [alias, setAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }

    if (!alias.trim()) {
      setError('Alias cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/messages', { alias, message: newMessage });
      setNewMessage('');
      setAlias('');
      setSuccess('Message posted successfully');
      fetchMessages();
    } catch (error) {
      setError('Error posting message');
      console.error('Error posting message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Message Board
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="1rem">
            <TextField
              label="Alias"
              variant="outlined"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              fullWidth
            />
            <TextField
              label="Message"
              variant="outlined"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
              {loading ? <CircularProgress size={24} /> : 'Post Message'}
            </Button>
          </Box>
        </form>
        {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}
        {success && <Alert severity="success" style={{ marginTop: '1rem' }}>{success}</Alert>}
      </Paper>
      <Box>
        {messages.map((msg, index) => (
          <Paper key={index} style={{ padding: '1rem', marginBottom: '1rem' }}>
            <Typography variant="subtitle1"><strong>{msg.alias}:</strong></Typography>
            <Typography variant="body1">{msg.message}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default MessageBoard;


