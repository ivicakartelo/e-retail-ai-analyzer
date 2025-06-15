import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { ArticlesList } from './features/articles/ArticlesList';
import CategoryArticles from './features/articles/CategoryArticles';
import ArticleSingle from './features/articles/ArticleSingle';
import Basket from './features/basket/Basket';
import SearchResults from './components/SearchResults';
import { AddUserForm } from './features/users/AddUserForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Customer from './components/Customer';
// Stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentPage from './features/payment/PaymentPage';
import ThankYouPage from './features/payment/ThankYouPage';
import { Recommendations } from './features/aiprompt/Recommendations'; // Import the Recommendations component
import Gemini25Thinking from './features/aiprompt/Gemini25Thinking';
import AIPromptSearch from './features/aiprompt/AIPromptSearch';
import DepartmentArticlesList from './features/articles/DepartmentArticlesList';
import './index.css';

const stripePromise = loadStripe('pk_test_51Nsp8pGVpnEZZ9cgc7w8adY5cH1sgLWAhWVxaUmOin7csuXbWZIa0tNIvuQZiIXOJr9oEv6wzZ0cstyVeCX1DK5k00MqzLKQx8');

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<ArticlesList />} />
                    <Route path="department/:departmentId" element={<DepartmentArticlesList />} />
                    <Route path="department/:departmentId/category/:categoryId" element={<CategoryArticles />} />
                    <Route path="department/:departmentId/category/:categoryId/article/:articleId" element={<ArticleSingle />} />
                    <Route path="article/:articleId" element={<ArticleSingle />} />
                    <Route path="category/:categoryId" element={<CategoryArticles />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/registration" element={<AddUserForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute requiredRole="admin"><Dashboard /></PrivateRoute>} />
                    <Route path="/customer" element={<PrivateRoute requiredRole="customer"><Customer /></PrivateRoute>} />
                    
                    {/* Stripe Payment Route (Wrap Only Payment Page in Elements) */}
                    <Route 
                        path="/payment/:orderId" 
                        element={
                            <Elements stripe={stripePromise}>
                                <PaymentPage />
                            </Elements>
                        } 
                    />
                    <Route path="/thank-you" element={<ThankYouPage />} />

                    {/* Add the Recommendations route */}
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/thinking" element={<Gemini25Thinking />} />
                    <Route path="/agenticai" element={<AIPromptSearch />} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);