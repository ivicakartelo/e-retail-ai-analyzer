import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
});

// Add a new user
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  try {
    const response = await axios.post(API_URL, newUser);
    return { user_id: response.data.user_id, ...newUser };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add user');
  }
});

// Delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { id };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
});

// Update a user
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
  try {
    const { user_id, ...data } = updatedUser;
    await axios.put(`${API_URL}/${user_id}`, data);
    return updatedUser;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.user_id !== action.payload.id);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const existingUserIndex = state.users.findIndex((user) => user.user_id === updatedUser.user_id);
        if (existingUserIndex !== -1) {
          state.users[existingUserIndex] = updatedUser;
        }
      });
  },
});

export default usersSlice.reducer;