import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesByDepartment } from '../categories/departmentCategoriesSlice';
import './DepartmentDetails.css';

const DepartmentDetails = () => {
  console.log('DepartmentDetails render');
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.departmentCategories.categories);
  const status = useSelector((state) => state.departmentCategories.status);

  useEffect(() => {
    dispatch(fetchCategoriesByDepartment(departmentId));
  }, [departmentId, dispatch]);

  return (
    <div className="department-details-container">
      {status === 'loading' && <p>Loading categories...</p>}
      {status === 'failed' && <p>Failed to load categories.</p>}
      {status === 'succeeded' && (
        categories.map((category) => (
          <div key={category.category_id} className="department-detail-item">
            <Link to={`/department/${departmentId}/category/${category.category_id}`}>
              {category.category_name}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default DepartmentDetails;