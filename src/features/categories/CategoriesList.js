// src/features/categories/CategoriesList.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from './categoriesSlice';
import { Link, useParams } from 'react-router-dom';

const CategoryExcerpt = ({ category, departmentId }) => (
  <div className="category-card">
    <h3>
      <Link to={`/category/${category.category_id}`}>
        {category.name}
      </Link>
    </h3>
  </div>
);

export const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);
  const { departmentId } = useParams(); // Get departmentId from params

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <h2>Loading categories...</h2>;
  } else if (status === 'succeeded') {
    content = categories.map((category) => (
      <CategoryExcerpt key={category.category_id} category={category} departmentId={departmentId} />
    ));
  } else if (status === 'failed') {
    content = <div>Error: {error}</div>;
  }

  return (
    <section>
      <h2>Categories for Department {departmentId}</h2>
      <div>{content}</div>
    </section>
  );
};