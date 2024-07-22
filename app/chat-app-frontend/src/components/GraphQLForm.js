import React, { useState } from 'react';
import axios from 'axios';
import './GraphQLForm.css';

const GraphQLForm = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:4000/graphql', {
        query: query
      });
      setResponse(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div className="graphql-form-container">
      <h2>GraphQL Query Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your GraphQL query here"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div className="response">
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default GraphQLForm;
