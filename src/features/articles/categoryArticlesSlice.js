import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticlesByCategory = createAsyncThunk(
  'categoryArticles/fetchArticlesByCategory',
  async (categoryId) => {
    const response = await axios.get(`http://localhost:5000/categories/${categoryId}/articles`);
    // Response shape: { category, articles }
    return response.data;
  }
);

const categoryArticlesSlice = createSlice({
  name: 'categoryArticles',
  initialState: {
    category: null,
    articles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
        state.articles = action.payload.articles;
      })
      .addCase(fetchArticlesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoryArticlesSlice.reducer;