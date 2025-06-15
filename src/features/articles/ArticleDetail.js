// src/components/ArticleDetail.js

import React from 'react';
import { articles } from '../../data'; // Import the dummy data

const ArticleDetail = ({ id }) => {
  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleDetail;