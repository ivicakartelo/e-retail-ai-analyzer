import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesByCategory } from './categoryArticlesSlice';
import { addToBasket } from '../basket/basketSlice';
import './CategoryArticles.css';

const CategoryArticles = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector(state => state.categoryArticles.category);
  const articles = useSelector(state => state.categoryArticles.articles);
  const status = useSelector(state => state.categoryArticles.status);
  const error = useSelector(state => state.categoryArticles.error);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchArticlesByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  const handleAddToBasket = (article) => {
    if (!article?.article_id) {
      console.error('Invalid article object:', article);
      return;
    }
    dispatch(addToBasket(article));
    navigate('/basket');
  };

  if (status === 'loading') return <p className="loading">Loading articles...</p>;
  if (status === 'failed') return <p className="error">Failed to load articles: {error}</p>;
  if (!articles.length) return <p className="empty">No articles found in this category.</p>;

  return (
    <div className="category-articles-wrapper">
      {/* <h2>Category: {category ? category.name : categoryId}</h2> */}
      <div className="category-articles-grid">
        {articles.map(article => (
          <div key={article.article_id} className="article-card">
            <Link to={`/article/${article.article_id}`} className="article-title-link">
              <h3>{article.name}</h3>
            </Link>

            <div className="article-image-wrapper">
              <img
                src={article.image_1 ? `http://localhost:5000/assets/images/${article.image_1}` : '/assets/images/placeholder.jpg'}
                alt={article.name}
                className="image-1"
                loading="lazy"
              />
              {article.image_2 && (
                <img
                  src={`http://localhost:5000/assets/images/${article.image_2}`}
                  alt={`${article.name} alternate`}
                  className="image-2"
                  loading="lazy"
                />
              )}
            </div>
            <p className="article-price">
              <strong>Price: </strong>
              {article.price ? `$${Number(article.price).toFixed(2)}` : 'Price not available'}
            </p>

            <button
              className="add-to-basket"
              onClick={() => handleAddToBasket(article)}
              aria-label={`Add ${article.name} to basket`}
            >
              Add to Basket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryArticles;