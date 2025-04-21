import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
const HomePage = () => {
  const [drafts, setDrafts] = useState({});
  const navigate = useNavigate();

  const generateRandomSlug = () => {
    const words = ['pink', 'city', 'draft', 'note', 'idea', 'brainstorm', 'article', 'quick'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return `${randomWord}-${Math.floor(Math.random() * 1000)}`;
  };
  useEffect(() => {
    const saved = localStorage.getItem('allAnswers');
    if (saved) {
      setDrafts(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (url) => {
    const confirm = window.confirm('Are you sure you want to delete this draft?');
    if (!confirm) return;

    const updated = { ...drafts };
    delete updated[url];

    localStorage.setItem('allAnswers', JSON.stringify(updated));
    setDrafts(updated);
  };

  const goToDraft = (url) => {
    // Redirect to the original draft URL
    window.location.href = url;
    // OR if using react-router routes for these pages:
    // const path = new URL(url).pathname;
    // navigate(path);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>📜 All Saved Drafts</h2>
      <button
  onClick={() => {
    const draftId = nanoid();
    const slug=generateRandomSlug()

    navigate(`/${draftId}/${slug}`);
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
  ➕ Create New Draft
</button>
      {Object.keys(drafts).length === 0 ? (
        
        <>
        <p>No drafts saved.</p>
      


</>
      ) : (
        <ul>
          {Object.entries(drafts).map(([url, answer]) => (
            <li key={url} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <strong>URL:</strong> <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => goToDraft(url)}>{url}</span>
              <br />
              <strong>Answer:</strong> <div>{answer}</div>
              <button onClick={() => handleDelete(url)} style={{ marginTop: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
