import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './usersSlice';
import { useNavigate } from 'react-router-dom';
import './AddUserForm.css';

export const AddUserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State management with a single object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    
    // Delivery Address
    delivery_name: '',
    delivery_street: '',
    delivery_city: '',
    delivery_state: '',
    delivery_country: '',
    delivery_zip_code: '',

    // Billing Address
    billing_name: '',
    billing_street: '',
    billing_city: '',
    billing_state: '',
    billing_country: '',
    billing_zip_code: '',
  });

  // Check if all fields are filled
  const canSave = Object.values(formData).every(Boolean);

  // Generic change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await dispatch(addUser(formData));
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer',
      delivery_name: '',
      delivery_street: '',
      delivery_city: '',
      delivery_state: '',
      delivery_country: '',
      delivery_zip_code: '',
      billing_name: '',
      billing_street: '',
      billing_city: '',
      billing_state: '',
      billing_country: '',
      billing_zip_code: '',
    });
  };

  // Handle cancel action
  const handleCancel = useCallback(() => {
    resetForm();
    navigate('/');
  }, [navigate]);

  return (
    <div className="registration-form-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* User Information */}
        {['name', 'email', 'password'].map((field) => (
          <div key={field}>
            <label>{field.replace('_', ' ').toUpperCase()}</label>
            <input name={field} value={formData[field]} onChange={handleChange} />
          </div>
        ))}

        {/* Delivery Address Fields */}
        <h3>Delivery Address</h3>
        {['delivery_name', 'delivery_street', 'delivery_city', 'delivery_state', 'delivery_country', 'delivery_zip_code'].map((field) => (
          <div key={field}>
            <label>{field.replace('delivery_', '').replace('_', ' ').toUpperCase()}</label>
            <input name={field} value={formData[field]} onChange={handleChange} />
          </div>
        ))}

        {/* Billing Address Fields */}
        <h3>Billing Address</h3>
        {['billing_name', 'billing_street', 'billing_city', 'billing_state', 'billing_country', 'billing_zip_code'].map((field) => (
          <div key={field}>
            <label>{field.replace('billing_', '').replace('_', ' ').toUpperCase()}</label>
            <input name={field} value={formData[field]} onChange={handleChange} />
          </div>
        ))}

        {/* Role Selection */}
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" disabled={!canSave}>Save</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};