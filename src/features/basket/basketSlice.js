import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to handle checkout
export const checkoutBasket = createAsyncThunk(
  'basket/checkoutBasket',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to place order');

      return data; // Return data (order confirmation, order_id, etc.)
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message if request fails
    }
  }
);

// Initial state
const initialState = {
  articles: [],        // List of articles in the basket
  orderStatus: 'idle',  // Status of the checkout (idle, loading, succeeded, failed)
  orderError: null,     // Error message if the checkout failed
};

// Basket slice
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Check if article already exists in the basket
      const existingItem = state.articles.find((item) => item.article_id === action.payload.article_id);
      if (existingItem) {
        // If exists, increment the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the new article to the basket with quantity 1
        state.articles.push({ ...action.payload, quantity: 1 });
      }
    },
    removeArticle: (state, action) => {
      const index = state.articles.findIndex((item) => item.article_id === action.payload.article_id);
      if (index !== -1) {
        // If decrement only is true, decrease quantity
        if (action.payload.decrementOnly) {
          state.articles[index].quantity -= 1;
          // If quantity reaches zero, remove item from basket
          if (state.articles[index].quantity <= 0) state.articles.splice(index, 1);
        } else {
          // If remove is true, remove the entire item from the basket
          state.articles.splice(index, 1);
        }
      }
    },
    clearBasket: (state) => {
      // Clear all articles from the basket
      state.articles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutBasket.pending, (state) => {
        // When checkout is in progress, set loading status
        state.orderStatus = 'loading';
        state.orderError = null;
      })
      .addCase(checkoutBasket.fulfilled, (state, action) => {
        // On successful checkout, set succeeded status and clear basket
        state.orderStatus = 'succeeded';
        state.articles = []; // Clear basket on success
      })
      .addCase(checkoutBasket.rejected, (state, action) => {
        // On checkout failure, set failed status and store error message
        state.orderStatus = 'failed';
        state.orderError = action.payload; // Store error message from the rejected thunk
      });
  },
});

// Export actions for dispatching in components
export const { addToBasket, removeArticle, clearBasket } = basketSlice.actions;

// Export reducer to be included in store
export default basketSlice.reducer;