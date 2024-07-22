import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import moment from 'moment';
import './Chat.css';

const GET_MESSAGES = gql`
  {
    messages {
      id
      content
      user {
        email
      }
      createdAt
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation AddMessage($content: String!, $userId: ID!) {
    addMessage(content: $content, userId: $userId) {
      id
      content
      user {
        email
      }
      createdAt
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      phone
    }
  }
`;

const Chat = () => {
  const [content, setContent] = useState('');
  const userId = localStorage.getItem('userId');
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES);
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {
    variables: { id: userId }
  });
  const [addMessage] = useMutation(ADD_MESSAGE);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);
    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('User not authenticated');
      return;
    }
    try {
      await addMessage({ variables: { content, userId } });
      setContent('');
      refetch();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading || userLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading messages: {error.message}</p>;
  if (userError) return <p>Error loading user data: {userError.message}</p>;

  return (
    <div className="chat-container">
      <div className="sidebar">
        {userData && (
          <div className="user-info">
            <h3>User Info</h3>
            <p><strong>Email:</strong> {userData.user.email}</p>
            <p><strong>Phone:</strong> {userData.user.phone}</p>
          </div>
        )}
      </div>
      <div className="chat">
        <div className="messages">
          {data.messages.slice().reverse().map((message) => (
            <div key={message.id} className="message">
              <p><strong>{message.user.email}</strong>: {message.content}</p>
              <p className="timestamp">{moment(parseInt(message.createdAt)).format('LLL')}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
