// src/features/articles/articleSingleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch an article by articleId
export const fetchArticleById = createAsyncThunk(
    'articleSingle/fetchArticleById',
    async (articleId) => {
        console.log("fetchArticleById called with articleId:", articleId); // Log the articleId
        try {
            const response = await axios.get(`http://localhost:5000/article/${articleId}`);
            console.log("Response data:", response.data); // Log the fetched data
            return response.data;
        } catch (error) {
            console.error("Error fetching article:", error); // Log any errors
            return (error.response?.data || error.message);
        }
    }
);

const articleSingleSlice = createSlice({
    name: 'articleSingle',
    initialState: {
        article: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.article = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.article = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch article';
            });
    },
});

export const { resetStatus } = articleSingleSlice.actions; // Export the reset action
export default articleSingleSlice.reducer;