import React, { useState } from 'react';
import MyOrders from "./MyOrders";

const Dashboard = () => {
  const [showOrders, setShowOrders] = useState(false);

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      <p>You're logged in.</p>
      
      <nav>
        <ul>
          <li><button onClick={() => setShowOrders(!showOrders)}>My Orders</button></li>
          <li><button>Profile</button></li>
          <li><button>Settings</button></li>
        </ul>
      </nav>
      
      {showOrders && <MyOrders />}
    </div>
  );
};

export default Dashboard;