// src/features/departmentCategories/departmentCategoriesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch categories by department ID
export const fetchCategoriesByDepartment = createAsyncThunk(
    'departmentCategories/fetchCategoriesByDepartment',
    async (departmentId) => {
        const response = await axios.get(`http://localhost:5000/departments/${departmentId}/categories`);
        return response.data.categories;
    }
);

const departmentCategoriesSlice = createSlice({
    name: 'departmentCategories',
    initialState: {
        categories: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesByDepartment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoriesByDepartment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesByDepartment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default departmentCategoriesSlice.reducer;