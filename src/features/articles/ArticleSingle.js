import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from './articleSingleSlice';
import { addToBasket } from '../basket/basketSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentsList from '../comments/CommentsList';
import CustomersAlsoBoughtList from '../customersalsobought/CustomersAlsoBoughtList';
import './ArticleSingle.css';

const ArticleSingle = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const article = useSelector(state => state.articleSingle.article);
  const status = useSelector(state => state.articleSingle.status);
  const error = useSelector(state => state.articleSingle.error);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  const handleAddToBasket = () => {
    if (article) {
      dispatch(addToBasket(article));
      navigate('/basket');
    }
  };

  if (status === 'loading') return <div className="loading">Loading...</div>;
  if (status === 'failed') return <div className="error">Error: {error}</div>;
  if (!article) return <div className="error">No article found.</div>;

  return (
    <div className="article-single">
      <div className="article-top">
        <div className="images-wrapper">
          <div className="article-image-wrapper">
            <img
              src={article.image_1 ? `http://localhost:5000/assets/images/${article.image_1}` : '/assets/images/placeholder.jpg'}
              alt={article.name || 'Article'}
              className="image-1"
              loading="lazy"
            />
            <img
              src={article.image_2 ? `http://localhost:5000/assets/images/${article.image_2}` : '/assets/images/placeholder.jpg'}
              alt={article.name ? `${article.name} alternate` : 'Article alternate'}
              className="image-2"
              loading="lazy"
            />
          </div>
        </div>

        <div className="text-content">
          <h2>{article.name || 'No Title'}</h2>
          <div dangerouslySetInnerHTML={{ __html: article.description || 'No description available.' }} />
          <p><strong>Price:</strong> {article.price ? `$${Number(article.price).toFixed(2)}` : 'Price not available'}</p>
          <button className="add-to-basket" onClick={handleAddToBasket}>Add to Basket</button>
          <Link to="/" className="back-to-home">Back to Home</Link>
        </div>
      </div>

      <div className="article-block comments-section">
        <h3>Comments</h3>
        <CommentsList articleId={articleId} />
      </div>

      <div className="article-block recommendations-section">
        <h3>Customers Also Bought</h3>
        <CustomersAlsoBoughtList articleId={articleId} />
      </div>
    </div>
  );
};

export default ArticleSingle;