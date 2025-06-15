import { configureStore } from '@reduxjs/toolkit';
import departmentsReducer from '../features/departments/departmentsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import articlesReducer from '../features/articles/articlesSlice';
import departmentCategoriesReducer from '../features/categories/departmentCategoriesSlice'; 
import categoryArticlesReducer from '../features/articles/categoryArticlesSlice';
import articleSingleReducer from '../features/articles/articleSingleSlice';
import basketReducer from '../features/basket/basketSlice';
import loginReducer from '../components/loginSlice'; // KEEP EXISTING
import commentsReducer from '../features/comments/commentsSlice'; // ADD THIS
import customersAlsoBoughtReducer from '../features/customersalsobought/CustomersAlsoBoughtSlice';
import departmentArticlesReducer from '../features/articles/departmentArticlesSlice';

const store = configureStore({
  reducer: {
    departments: departmentsReducer,
    categories: categoriesReducer,
    articles: articlesReducer,
    departmentCategories: departmentCategoriesReducer,
    categoryArticles: categoryArticlesReducer,
    articleSingle: articleSingleReducer,
    basket: basketReducer,
    login: loginReducer,
    comments: commentsReducer,
    customersAlsoBought: customersAlsoBoughtReducer,
    departmentArticles: departmentArticlesReducer,
  }
});

export default store;