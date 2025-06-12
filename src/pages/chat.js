import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    try {
      const res = await axios.post('/api/ask', { question: input });
      setResponse(res.data.answer);
    } catch (err) {
      setResponse('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50' }}>Smart Inventory AI Assistant</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>
        Type your inventory-related question below and get instant AI help!
      </p>

      <textarea
        rows="4"
        style={{ width: '60%', padding: '10px', fontSize: '1rem', marginTop: '20px' }}
        placeholder="Ask the AI here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />

      <button
        onClick={handleAsk}
        style={{
          marginTop: '20px',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '10px 20px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Ask
      </button>

      {response && (
        <div
          style={{
            marginTop: '30px',
            backgroundColor: '#f4f4f4',
            padding: '20px',
            borderRadius: '8px',
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'left'
          }}
        >
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
