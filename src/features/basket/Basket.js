import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket, removeArticle, clearBasket, checkoutBasket } from './basketSlice';
import OrderSummary from './OrderSummary';
import './Basket.css';
import { Link } from 'react-router-dom'; // For navigation

const BasketItem = ({ article, onIncrement, onDecrement, onRemove }) => (
  <tr>
    <td>{article.name}</td>
    <td>${Number(article.price).toFixed(2)}</td>
    <td>
      <div className="quantity-control">
        <button onClick={() => onDecrement(article.article_id)}>-</button>
        <span>{article.quantity}</span>
        <button onClick={() => onIncrement(article)}>+</button>
      </div>
    </td>
    <td>${(article.price * article.quantity).toFixed(2)}</td>
    <td>
      <button className="basket-remove-button" onClick={() => onRemove(article.article_id)}>
        Remove
      </button>
    </td>
  </tr>
);

const BasketList = ({ articles, onIncrement, onDecrement, onRemove, onClear, onCheckout, isUserLoggedIn }) => (
  <div>
    {articles.length === 0 ? (
      <p>Your basket is empty.</p>
    ) : (
      <>
        <table className="basket-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <BasketItem
                key={article.article_id}
                article={article}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
        <div className="basket-actions">
          <p>
            <strong>
              Total Amount: ${articles.reduce((total, article) => total + article.price * article.quantity, 0).toFixed(2)}
            </strong>
          </p>
          <button className="basket-clear-button" onClick={onClear}>
            Clear Basket
          </button>
          <button 
            className={`basket-checkout-button ${!isUserLoggedIn ? 'disabled' : ''}`} 
            onClick={onCheckout} 
            disabled={!isUserLoggedIn}
          >
            Checkout
          </button>
          {!isUserLoggedIn && <p className="checkout-disabled-text">Please log in to proceed to checkout.</p>}
        </div>
      </>
    )}
  </div>
);

const Basket = () => {
  const basketArticles = useSelector((state) => state.basket.articles);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  const handleIncrement = (article) => dispatch(addToBasket(article));
  const handleDecrement = (articleId) => dispatch(removeArticle({ article_id: articleId, decrementOnly: true }));
  const handleRemove = (articleId) => dispatch(removeArticle({ article_id: articleId }));
  const handleClear = () => window.confirm('Clear the basket?') && dispatch(clearBasket());

  const handleCheckout = async () => {
    if (basketArticles.length === 0) {
      alert('Your basket is empty.');
      return;
    }
    const orderData = {
      user_id: user.user_id,
      articles: basketArticles.map(({ article_id, name, price, quantity }) => ({ article_id, name, price, quantity })),
      total_amount: basketArticles.reduce((total, article) => total + article.price * article.quantity, 0).toFixed(2),
    };

    try {
      const data = await dispatch(checkoutBasket(orderData)).unwrap();
      setOrder({ ...orderData, order_id: data.order_id });
      dispatch(clearBasket());
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="basket">
      {order ? (
        <div>
          <OrderSummary order={order} onClose={() => setOrder(null)} />
          {/* Link to payment page for Stripe */}
          <div>
            <p>Your order has been placed successfully!
                The invoice will be in your Downloads folder if you press the "Download Invoice" button.
                You can pay immediately by card using Stripe.</p>
            <Link to={`/payment/${order.order_id}`} className="pay-with-stripe-button">
              Pay with Stripe
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2>Your Basket</h2>
          <BasketList
            articles={basketArticles}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            onClear={handleClear}
            onCheckout={handleCheckout}
            isUserLoggedIn={!!user}
          />
        </>
      )}
    </div>
  );
};

export default Basket;