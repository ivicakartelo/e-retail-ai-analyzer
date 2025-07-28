import React, { useState } from 'react';
import axios from 'axios';

const EmbeddingSearch = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/articles/embedding', { userPrompt: prompt });
      setResult(response.data);
    } catch (err) {
      setError('Failed to get embeddings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Gemini Embedding Model Case Study</h2>
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter text to embed"
        className="border px-3 py-2 rounded w-full mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Generate Embedding
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm font-mono">
          <p><strong>Message:</strong> {result.message}</p>
          <p><strong>Vector length:</strong> {result.vectorLength}</p>
          <p><strong>Vector preview:</strong> [{result.previewVector.join(', ')}]</p>
        </div>
      )}
    </div>
  );
};

export default EmbeddingSearch;