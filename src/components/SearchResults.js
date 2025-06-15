import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState({ articles: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
        setResults(response.data);
      } catch (err) {
        setError('An error occurred while fetching the search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>

      <div className="results-container">
        <div className="articles-results">
          <h2>Articles</h2>
          {results.articles.length > 0 ? (
            <ul>
              {results.articles.map((article) => (
                <li key={article.article_id}>
                  <h3>
                    <Link to={`/article/${article.article_id}`}>{article.name}</Link>
                  </h3>
                  
                  <div dangerouslySetInnerHTML={{ __html: article.description || 'No description available.' }} />
                  <p><strong>Categories:</strong> {article.category_ids.join(', ')}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No articles found.</p>
          )}
        </div>

        <div className="categories-results">
          <h2>Categories</h2>
          {results.categories.length > 0 ? (
            <ul>
              {results.categories.map((category) => (
                <li key={category.category_id}>
                  <h3>
                    <Link to={`/category/${category.category_id}`}>{category.name}</Link>
                  </h3>
                  <p>{category.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;