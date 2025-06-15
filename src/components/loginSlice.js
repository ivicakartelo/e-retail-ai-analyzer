// loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', credentials);     
      console.log(response.data)
      return response.data; // Assuming response contains user details in token
    } 
    catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Function to validate the token (e.g., decode it or check expiration)
const isValidToken = (token) => {
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    console.log(decoded)
    const expiration = decoded.exp * 1000; // Convert expiration to milliseconds
    return expiration > Date.now(); // Check if token is still valid
  } catch (error) {
    return false;
  }
};

// Function to extract user details from a valid token
const extractUserFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    console.log(decoded)
  return {user_id: decoded.user_id || null, 
          name: decoded.name || null, 
          email: decoded.email || null, 
          role: decoded.role || null,
          delivery_name: decoded.delivery_name || null,
          delivery_street: decoded.delivery_street || null,
          delivery_city: decoded.delivery_city || null,
          delivery_state: decoded.delivery_state || null,
          delivery_country: decoded.delivery_country || null,
          delivery_zip_code: decoded.delivery_zip_code || null,
          billing_name: decoded.billing_name || null,
          billing_street: decoded.billing_street || null,
          billing_city: decoded.billing_city || null,
          billing_state: decoded.billing_state || null,
          billing_country: decoded.billing_country || null,
          billing_zip_code: decoded.billing_zip_code || null,
        }; 
  } catch (error) {
    return null;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

  // Retrieve token from localStorage if available
const persistedToken = sessionStorage.getItem('token');

// Check if the token is valid and extract user info
if (persistedToken && isValidToken(persistedToken)) {
  const user = extractUserFromToken(persistedToken);
  initialState.isAuthenticated = true;
  initialState.token = persistedToken;
  initialState.user = user;
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;

      // Remove token from localStorage
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = extractUserFromToken(action.payload.token); // Extract user from token
        console.log(state.user)
        state.token = action.payload.token; // Save token globally
        console.log(action.payload.token)
        state.error = null;

        // Save token to localStorage
        sessionStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload; // Use the error message from the rejected action
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;