import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyOrders from "./MyOrders";
import { UpdateUserForm } from "../features/users/UpdateUserForm";

const Customer = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditAddresses, setShowEditAddresses] = useState(false);

  const user = useSelector((state) => state.login.user);
  console.log(user)
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Customer!</h1>
      <p>You're logged in.</p>
      <h2>Your Account</h2>
      
      <nav>
        <button onClick={() => setShowOrders(!showOrders)}>Orders</button> | 
        <button onClick={() => setShowEditProfile(!showEditProfile)}>Edit Profile</button> | 
        <button onClick={() => setShowEditAddresses(!showEditAddresses)}>Edit Addresses</button>
      </nav>
      
      {showOrders && <MyOrders />}
      {showEditProfile && user && <UpdateUserForm user={user} setShowEditForm={setShowEditProfile} />} 
      {showEditAddresses && user && <UpdateUserForm user={user} setShowEditForm={setShowEditAddresses} />}
    </div>
  );
};

export default Customer;