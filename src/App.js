import React, { useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DepartmentsList } from './features/departments/DepartmentsList';
import DepartmentDetails from './features/departments/DepartmentDetails';
import Header from './components/Header';
import { fetchDepartments } from './features/departments/departmentsSlice';
import { fetchCategoriesByDepartment } from './features/categories/departmentCategoriesSlice';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  const { departmentId, categoryId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.departments.departments);
  const departmentsStatus = useSelector((state) => state.departments.status);

  const categories = useSelector((state) => state.departmentCategories.categories);
  const categoriesStatus = useSelector((state) => state.departmentCategories.status);

  useEffect(() => {
    if (departmentsStatus === 'idle') {
      dispatch(fetchDepartments());
    }
  }, [departmentsStatus, dispatch]);

  useEffect(() => {
    if (departmentId && categoriesStatus === 'idle') {
      dispatch(fetchCategoriesByDepartment(departmentId));
    }
  }, [departmentId, dispatch, categoriesStatus]);

  const department = departments.find(
    (d) => String(d.department_id) === String(departmentId)
  );

  const category = categories.find(
    (c) => String(c.category_id) === String(categoryId)
  );

  const isArticlePage = /^\/article\/\d+$/.test(location.pathname);
  const isHomePage = location.pathname === '/';
  const isDepartmentPage = departmentId && !categoryId;
  const isCategoryPage = departmentId && categoryId;

  const getBannerFilename = (name) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const departmentBannerName = department
    ? getBannerFilename(department.name)
    : null;

  const categoryBannerName = category
    ? getBannerFilename(category.category_name)
    : null;

  const departmentBannerPath = departmentBannerName
    ? `/assets/e_retail_public/catalog/${departmentBannerName}-banner.png`
    : null;

  const categoryBannerPath = categoryBannerName
    ? `/assets/e_retail_public/catalog/${categoryBannerName}-banner.png`
    : null;

  const fallbackBanner = `/assets/e_retail_public/catalog/default-banner.png`;

  return (
    <div className="app-layout">
      <Header />

      <nav className="departments-nav">
        <DepartmentsList />
      </nav>

      {!isArticlePage && (
        <>
          {isHomePage && (
            <div className="home-banner">
              <img
                src="/assets/e_retail_public/catalog/homepage-banner.png"
                alt="Welcome Store Banner"
                onError={(e) => { e.target.src = fallbackBanner; }}
                className="home-banner-image"
              />
            </div>
          )}

          {/* Department Page */}
          {isDepartmentPage && department && (
            <>
              <div className="department-banner" style={{ backgroundImage: `url(${departmentBannerPath})` }}>
                <div className="department-banner-title">
                  Department: {department.name}
                </div>
              </div>
              <div className="department-details-bar">
                <DepartmentDetails departmentId={departmentId} />
              </div>
            </>
          )}

          {isDepartmentPage && !department && departmentsStatus === 'succeeded' && (
            <div className="department-banner">
              <p>Department not found.</p>
            </div>
          )}

          {/* Category Page */}
          {isCategoryPage && category && (
            <>
              <div className="category-banner" style={{ backgroundImage: `url(${categoryBannerPath})` }}>
                <div className="category-banner-title">
                  Category: {category.category_name}
                </div>
              </div>
              <div className="department-details-bar">
                <DepartmentDetails departmentId={departmentId} />
              </div>
            </>
          )}

          {isCategoryPage && !category && categoriesStatus === 'succeeded' && (
            <div className="category-banner">
              <p>Category not found.</p>
            </div>
          )}
        </>
      )}

      <div className="content-wrapper">
        <main className="content full-width">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;