import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AnswerEditor = () => {
    const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('');

  const LOCAL_STORAGE_KEY = 'allAnswers'; // Master key
  const currentUrl = window.location.href;

  // Load answer for current URL
  useEffect(() => {
    const savedAll = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedAll) {
      const parsed = JSON.parse(savedAll);
      if (parsed[currentUrl]) {
        setAnswer(parsed[currentUrl]);
      }
    }
  }, [currentUrl]);

  const handleSave = () => {
    const savedAll = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = savedAll ? JSON.parse(savedAll) : {};

    parsed[currentUrl] = answer;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
    setStatus('Saved!');
    setTimeout(() => setStatus(''), 1500);
  };

  const handleDelete = () => {
    const savedAll = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedAll) return;

    const parsed = JSON.parse(savedAll);
    delete parsed[currentUrl];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
    setAnswer('');
    setStatus('Deleted!');
    setTimeout(() => setStatus(''), 1500);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Answer Editor (URL-based)</h2>
      <textarea
        rows="4"
        style={{ width: '100%', fontSize: '16px', padding: '10px' }}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleSave}>Save Answer</button>
        {answer && (
          <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
            Delete
          </button>
        )}
        
        <span style={{ marginLeft: '20px', color: 'green' }}>{status}</span>
        <>
        
    
              <button
          onClick={() => {
      
        
            navigate(`/`);
          }}
          style={{
            margin: '10px 0',
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
         Home
        </button>
        </>
      </div>
    </div>
  );
};

export default AnswerEditor;
