import { configureStore } from '@reduxjs/toolkit';
import cartsReducer from '../features/cartSlice';
import productReducer from '../features/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartsReducer,
    product: productReducer,
  },
});
