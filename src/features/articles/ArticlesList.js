import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles } from './articlesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { addToBasket } from '../basket/basketSlice';
import './ArticlesList.css';

const ArticleExcerpt = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToBasket = () => {
    if (!article.article_id) {
      console.error('Invalid article object:', article);
      return;
    }
    dispatch(addToBasket(article));
    navigate('/basket');
  };

  return (
    <div className="article-card">
      <div className="article-image-wrapper">
      <img
        className="image-1"
        src={article.image_1 ? `http://localhost:5000/assets/images/${article.image_1}` : '/assets/images/placeholder.jpg'}
        alt={article.name}
        loading="lazy"  // <--- added
      />
      <img
        className="image-2"
        src={article.image_2 ? `http://localhost:5000/assets/images/${article.image_2}` : '/assets/images/placeholder.jpg'}
        alt={article.name}
        loading="lazy"  // <--- added
      />
      </div>
      <div className="article-info">
        <h3>
          <Link to={`/article/${article.article_id}`}>{article.name}</Link>
        </h3>
        <p className="article-price">${Number(article.price).toFixed(2)}</p>
        <button className="add-to-basket" onClick={handleAddToBasket}>
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export const ArticlesList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const status = useSelector((state) => state.articles.status);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <h2>Loading articles...</h2>;
  } else if (status === 'succeeded') {
    content = (
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleExcerpt key={article.article_id} article={article} />
        ))}
      </div>
    );
  } else if (status === 'failed') {
    content = <div className="error-message">Error: {error}</div>;
  }

  return (
    <section className="articles-list">
      <h1>Articles</h1>
      {content}
    </section>
  );
};