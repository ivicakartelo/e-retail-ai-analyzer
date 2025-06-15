import React from 'react';
import { Link } from 'react-router-dom';

const ArticleContent = ({ article, onAddToBasket }) => {
  const price = article.price && !isNaN(article.price) 
    ? Number(article.price).toFixed(2) 
    : null;

  return (
    <div className="article-content">
      <div className="images-wrapper">
        <img
          src={article.image_1 
            ? `http://localhost:5000/assets/images/${article.image_1}` 
            : '/assets/images/placeholder.jpg'}
          alt={article.name}
          className="article-image"
        />
        <img
          src={article.image_2 
            ? `http://localhost:5000/assets/images/${article.image_2}` 
            : '/assets/images/placeholder.jpg'}
          alt={`${article.name} alternate`}
          className="article-image"
        />
      </div>

      <div className="text-content">
        <h2>{article.name}</h2>
        <p>{article.description}</p>
        <p>
          <strong>Price:</strong> {price ? `$${price}` : 'Price not available'}
        </p>
        <button className="add-to-basket" onClick={onAddToBasket}>
          Add to Basket
        </button>
        <Link to="/" className="back-to-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ArticleContent;