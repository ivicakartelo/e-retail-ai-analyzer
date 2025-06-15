import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchArticlesByDepartment } from './departmentArticlesSlice';
import { addToBasket } from '../basket/basketSlice'; // Import addToBasket
import './DepartmentArticlesList.css';

const DepartmentArticlesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departmentId } = useParams();

  const articles = useSelector((state) => state.departmentArticles.articles);
  const status = useSelector((state) => state.departmentArticles.status);
  const error = useSelector((state) => state.departmentArticles.error);

  useEffect(() => {
    if (departmentId) {
      dispatch(fetchArticlesByDepartment(departmentId));
    }
  }, [departmentId, dispatch]);

  const handleAddToBasket = (article) => {
    if (!article.article_id) return; // simple guard
    dispatch(addToBasket(article));
    navigate('/basket');
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="articles-grid">
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <div key={article.article_id} className="article-card">
            <div className="article-image-wrapper">
              <img
                src={article.image_1 ? `http://localhost:5000/assets/images/${article.image_1}` : '/assets/images/placeholder.jpg'}
                alt={article.name || 'Article'}
                className="image-1"
                loading="lazy"
              />
              {article.image_2 && (
                <img
                  src={`http://localhost:5000/assets/images/${article.image_2}`}
                  alt={`${article.name} alternate view`}
                  className="image-2"
                  loading="lazy"
                />
              )}
            </div>
            <div className="article-info">
              <h3>
                <Link to={`/article/${article.article_id}`}>{article.name}</Link>
              </h3>
              <div dangerouslySetInnerHTML={{ __html: article.description || 'No description available.' }} />
              <p className="article-price">
                {article.price ? `${parseFloat(article.price).toFixed(2)} €` : 'Price not available'}
              </p>
              <button className="add-to-cart-btn" onClick={() => handleAddToBasket(article)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DepartmentArticlesList;