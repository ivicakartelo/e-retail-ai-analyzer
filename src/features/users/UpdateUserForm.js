import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from './usersSlice';
import { logout } from '../../components/loginSlice'; // Import the logout action
import './UpdateUserForm.css';

export const UpdateUserForm = ({ user, setShowEditForm }) => {
  const [formData, setFormData] = useState({ ...user });
  const dispatch = useDispatch();
  const canSave = Boolean(formData.name) && Boolean(formData.email);

  useEffect(() => {
    // When the user prop updates, reset formData
    setFormData({ ...user });
  }, [user]); // Ensures form updates with new user data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSaveChangesClicked = async () => {
    if (canSave) {
      await dispatch(updateUser({ user_id: user.user_id, ...formData }));

      // Show alert and log out
      alert('Your data has been updated. You will now be logged out. Please log in again to see the changes.');
      dispatch(logout());
      //dispatch(logoutUser()); // This should clear auth state and redirect to login

      setShowEditForm(false);
    }
  };

  return (
    <form>
      <label>Name</label>
      <input name="name" value={formData.name} onChange={handleChange} />

      <label>Email</label>
      <input name="email" value={formData.email} onChange={handleChange} />

      <label>Role</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <h3>Delivery Address</h3>
      <label>Name</label>
      <input name="delivery_name" value={formData.delivery_name} onChange={handleChange} />
      <label>Street</label>
      <input name="delivery_street" value={formData.delivery_street} onChange={handleChange} />
      <label>City</label>
      <input name="delivery_city" value={formData.delivery_city} onChange={handleChange} />
      <label>State</label>
      <input name="delivery_state" value={formData.delivery_state} onChange={handleChange} />
      <label>Country</label>
      <input name="delivery_country" value={formData.delivery_country} onChange={handleChange} />
      <label>Zip Code</label>
      <input name="delivery_zip_code" value={formData.delivery_zip_code} onChange={handleChange} />

      <h3>Billing Address</h3>
      <label>Name</label>
      <input name="billing_name" value={formData.billing_name} onChange={handleChange} />
      <label>Street</label>
      <input name="billing_street" value={formData.billing_street} onChange={handleChange} />
      <label>City</label>
      <input name="billing_city" value={formData.billing_city} onChange={handleChange} />
      <label>State</label>
      <input name="billing_state" value={formData.billing_state} onChange={handleChange} />
      <label>Country</label>
      <input name="billing_country" value={formData.billing_country} onChange={handleChange} />
      <label>Zip Code</label>
      <input name="billing_zip_code" value={formData.billing_zip_code} onChange={handleChange} />

      <button type="button" onClick={onSaveChangesClicked} disabled={!canSave}>
        Save Changes
      </button>
    </form>
  );
};