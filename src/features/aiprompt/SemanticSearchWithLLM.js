// src/features/aiprompt/SemanticSearchWithLLM.js
import React, { useState } from 'react';

const SemanticSearchWithLLM = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('http://localhost:5000/semantic-search-with-llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Semantic + LLM error:', err);
      setError('Failed to run semantic + LLM search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Semantic Search + LLM (RAG)</h2>
      
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-3"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Search with LLM'}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {results && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <h3 className="font-semibold mb-2">Final Answer from LLM:</h3>
          <p className="mb-4">{results.answer}</p>

          <h4 className="font-semibold">Context Used:</h4>
          <ul className="list-disc list-inside text-xs">
            {results.contextUsed.map((item) => (
              <li key={item.id}>
                <strong>{item.text}</strong> (score: {item.score.toFixed(3)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SemanticSearchWithLLM;