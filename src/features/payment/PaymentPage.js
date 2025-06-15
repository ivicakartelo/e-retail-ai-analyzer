import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './PaymentPage.css';


const PaymentPage = () => {
  const { orderId } = useParams();  
  const [totalAmount, setTotalAmount] = useState(0); 
  const [cardholderName, setCardholderName] = useState("");  
  const [loading, setLoading] = useState(false); // 🔹 New loading state
  
  const stripe = useStripe();
  const elements = useElements();
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderAmount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${orderId}`);
        setTotalAmount(Number(response.data.total_amount));
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    if (orderId) {
      fetchOrderAmount();
    }
  }, [orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || totalAmount === 0) 
      return;

    setLoading(true); // 🔹 Show loading animation

    try {
      const { data } = await axios.post('http://localhost:5000/create-payment-intent', {
        total_amount: totalAmount * 100,  
        order_id: orderId,
      });

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: cardholderName },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          await axios.post('http://localhost:5000/payment-success', {
            paymentIntentId: result.paymentIntent.id,
            order_id: orderId,
          });

          //alert('Payment successful! Thank you for your purchase.');
          navigate('/thank-you');
        }
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false); // 🔹 Hide loading animation
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3>Complete Your Payment</h3>

      <div className="form-row">
        <label htmlFor="cardholder-name">Cardholder Name</label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Cardholder Name"
          required
        />
      </div>

      <div className="form-row">
        <label>Card Number</label>
        <CardNumberElement className="card-element" />
      </div>

      <div className="form-row">
        <label>Expiration Date</label>
        <CardExpiryElement className="card-element" />
      </div>

      <div className="form-row">
        <label>CVC</label>
        <CardCvcElement className="card-element" />
      </div>

      {/* Loading Animation */}
      {loading && <div className="loading-spinner"></div>} {/* 🔹 Add this */}

      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>

      <button type="button" onClick={() => navigate(-1)} className="cancel-button">
        Close
      </button>
    </form>
  );
};

export default PaymentPage;