import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticlesByDepartment = createAsyncThunk(
  'departmentArticles/fetchArticlesByDepartment',
  async (departmentId) => {
    const response = await axios.get(`http://localhost:5000/api/departments/${departmentId}/articles`);
    console.log(response.data);
    return response.data;
  }
);

const departmentArticlesSlice = createSlice({
  name: 'departmentArticles',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticlesByDepartment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticlesByDepartment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
        console.log(state.articles);
      })
      .addCase(fetchArticlesByDepartment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default departmentArticlesSlice.reducer;