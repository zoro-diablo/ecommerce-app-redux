import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const getCartProducts = createAsyncThunk(
  'cart/getCartItems',
  async (categoryId) => {
    const url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`;
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const selectProducts = (state) => state.product.data;

