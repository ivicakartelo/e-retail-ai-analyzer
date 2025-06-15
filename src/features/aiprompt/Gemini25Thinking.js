import React, { useState } from 'react';

function Gemini25Thinking() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.reply || '<p>No response</p>');
    } catch (err) {
      setResponse('<p>Error getting response</p>');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>🛍️ Gemini 2.5 Product Advisor</h2>

      <textarea
        rows={4}
        style={{ width: '100%', padding: 10 }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you're looking for (e.g., gift for dad who likes hiking)..."
      />

      <br />
      <button onClick={handleGenerate} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'Thinking...' : 'Ask Gemini'}
      </button>

      <div style={{ marginTop: 30 }}>
        <strong>Response:</strong>
        <div
          style={{ marginTop: 10, background: '#f9f9f9', padding: 20, borderRadius: 8 }}
          dangerouslySetInnerHTML={{ __html: response }}
        />
      </div>
    </div>
  );
}

export default Gemini25Thinking;