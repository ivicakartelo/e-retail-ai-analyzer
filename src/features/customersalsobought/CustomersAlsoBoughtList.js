import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomersAlsoBought } from './CustomersAlsoBoughtSlice';
import { Link } from 'react-router-dom';
import './CustomersAlsoBoughtList.css';

const CustomersAlsoBoughtList = ({ articleId }) => {
  const dispatch = useDispatch();

  const { articles: relatedArticles, status, error } = useSelector(
    (state) => state.customersAlsoBought
  );

  useEffect(() => {
    if (articleId) {
      dispatch(fetchCustomersAlsoBought(articleId));
    }
  }, [dispatch, articleId]);

  if (status === 'loading') return <div className="related-loading">Loading recommendations...</div>;
  if (status === 'failed') return <div className="related-error">Error: {error}</div>;
  if (!relatedArticles || relatedArticles.length === 0) return null;

  return (
    <div className="related-articles">
      <h3>Customers who bought this also bought</h3>
      <div className="related-list">
        {relatedArticles.map((article) => (
          <Link to={`/article/${article.article_id}`} key={article.article_id} className="related-item">
            <img
              src={
                article.image_1
                  ? `http://localhost:5000/assets/images/${article.image_1}`
                  : '/assets/images/placeholder.jpg'
              }
              alt={article.name}
              className="related-image"
            />
            <div className="related-info">
              <p className="related-name">{article.name}</p>
              <p className="related-price">${Number(article.price).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomersAlsoBoughtList;