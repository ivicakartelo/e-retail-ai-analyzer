import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch related articles
export const fetchCustomersAlsoBought = createAsyncThunk(
  'customersAlsoBought/fetch',
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/article/${articleId}/related`);
      if (!response.ok) {
        throw new Error('Failed to fetch related articles');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const customersAlsoBoughtSlice = createSlice({
  name: 'customersAlsoBought',
  initialState: {
    articles: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomersAlsoBought.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomersAlsoBought.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchCustomersAlsoBought.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default customersAlsoBoughtSlice.reducer;