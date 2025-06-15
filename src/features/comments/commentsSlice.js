// src/features/comments/commentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/article/${articleId}/comments`);
      console.log(response.data)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ articleId, text, userId, rating = null }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/article/${articleId}/comments`,
        { text, userId, rating },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Comment submission response:', response.data);
      return response.data.comment;
      
    } catch (err) {
      console.error('Comment submission failed:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data || 'Failed to post comment');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  }
});

export default commentsSlice.reducer;