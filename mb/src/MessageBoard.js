import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/messages', { message: newMessage });
      setNewMessage('');
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
    <div>
      <h1>Message Board</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your message here..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Message'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBoard;
