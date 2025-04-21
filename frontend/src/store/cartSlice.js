import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://e-commerce-wcli.onrender.com/api';
const SESSION_ID = 'test-session'; // In production, use a proper session management system

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { 'session-id': SESSION_ID }
    });
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }) => {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { productId, quantity },
      { headers: { 'session-id': SESSION_ID } }
    );
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId) => {
    await axios.delete(`${API_URL}/cart/remove/${productId}`, {
      headers: { 'session-id': SESSION_ID }
    });
    return productId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Ensure each item has product data
        state.items = action.payload.map(item => ({
          ...item,
          product: item.product || {}
        }));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // Ensure product data is preserved
        state.items = action.payload.map(item => ({
          ...item,
          product: item.product || {}
        }));
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.productId !== action.payload);
      });
  },
});

export default cartSlice.reducer;
