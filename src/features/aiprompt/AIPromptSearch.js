import React, { useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Local component, only used in AIPromptSearch
const ExportToExcel = ({ prompt }) => {
  const handleExport = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/ai-excel',
        { userPrompt: prompt },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'articles.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to export Excel file');
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
    >
      📥 Export Excel
    </button>
  );
};

const AIPromptSearch = () => {
  const [prompt, setPrompt] = useState('');
  const [articles, setArticles] = useState([]);
  const [sql, setSQL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAIArticles = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/articles/ai', {
        userPrompt: prompt,
      });

      setSQL(response.data.sql);

      const results = response.data.results.map(item => {
        if ('quarter' in item && (
          'total_sales' in item || 'total_amount' in item || 'sum' in item
        )) {
          const total = parseFloat(item.total_sales ?? item.total_amount ?? item.sum ?? 0);
          return {
            ...item,
            total_per_quarter: isNaN(total) ? 0 : total,
          };
        }
        return item;
      });

      setArticles(results);
      console.log('Fetched articles:', results);
    } catch (err) {
      setError('AI query failed. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isArticleResult = articles.length > 0 && articles[0]?.article_id && articles[0]?.name;
  const isQuarterSummary = articles.length > 0 &&
    articles.every(item => 'quarter' in item && 'total_per_quarter' in item);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="max-w-5xl w-full p-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">🔍 AI-Powered Query Explorer</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Sum total_amount by quarter in 2025"
            className="flex-1 border px-4 py-2 rounded shadow"
          />
          <button
            onClick={fetchAIArticles}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Ask AI
          </button>

          <ExportToExcel prompt={prompt} />
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {sql && (
          <div className="mb-4 p-3 bg-gray-100 rounded text-sm font-mono">
            <strong>Generated SQL:</strong>
            <pre>{sql}</pre>
          </div>
        )}

        {articles.length > 0 && (
          <>
            {isArticleResult ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles.map((article) => (
                  <div key={article.article_id} className="border p-4 rounded shadow-sm bg-white">
                    <img
                      className="w-full h-40 object-cover rounded mb-2"
                      src={
                        article.image_1
                          ? `http://localhost:5000/assets/images/${article.image_1}`
                          : '/assets/images/placeholder.jpg'
                      }
                      alt={article.name || 'placeholder'}
                      loading="lazy"
                    />
                    <h2 className="font-bold text-lg mb-2">{article.name}</h2>
                    <p className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: article.description }} />
                    <p className="text-green-600 font-semibold">${article.price}</p>
                  </div>
                ))}
              </div>
            ) : isQuarterSummary ? (
              <>
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">📊 Orders by Quarter (2025)</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={articles}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                      <Bar dataKey="total_per_quarter" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="overflow-x-auto mt-6">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100">Quarter</th>
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100">Total Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((row, i) => (
                        <tr key={i}>
                          <td className="border border-gray-300 px-4 py-2">{row.quarter}</td>
                          <td className="border border-gray-300 px-4 py-2">${row.total_per_quarter.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      {Object.keys(articles[0]).map((col) => (
                        <th key={col} className="border border-gray-300 px-4 py-2 bg-gray-100">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((row, i) => (
                      <tr key={i}>
                        {Object.keys(row).map((col) => (
                          <td key={col} className="border border-gray-300 px-4 py-2">
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AIPromptSearch;