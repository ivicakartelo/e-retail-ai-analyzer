import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MyOrders.css';

const MyOrders = () => {
  const user = useSelector((state) => state.login.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders?user_id=${user.user_id}`);
        console.log(response)
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        console.log(data)
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <p>Please log in to view your orders.</p>;
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                <th>Articles</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>${order.total_amount}</td>
                  <td>
                    <ul>
                      {order.items.map((article, index) => (
                        <li key={index}>
                          {article.name} (x{article.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;