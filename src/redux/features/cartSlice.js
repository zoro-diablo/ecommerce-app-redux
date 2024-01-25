import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  show: false,
  items: [],
  bag: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.show = true;
    },
    closeCart: (state) => {
      state.show = false;
    },
    addItem: (state, action) => {
      state.items = [action.payload];
    },
    addToBag: (state, action) => {
        const itemIndex = state.bag.findIndex(
          (item) => item.id === action.payload.id
        );
        if (itemIndex >= 0) {
          state.bag[itemIndex].quantity += 1;
          toast.success("Increased quantity of item in bag");
        } else {
          state.bag.push({ ...action.payload, quantity: 1 });
          toast.success("Added item to bag");
        }
      },
    removeFromBag: (state, action) => {
      const itemIndex = state.bag.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0) {
        state.bag[itemIndex].quantity -= 1;
        toast.error("Decreased quantity of item in bag");
        if (state.bag[itemIndex].quantity === 0) {
          state.bag = state.bag.filter((item) => item.id !== action.payload);
          toast.error("Removed item from bag");
        }
      }
    },
    subTotal: (state) => {
      state.bag.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    clearBag: (state) => {
      state.bag = [];
      toast.warn("Cart is empty");
    },
  },
});

export const { openCart, closeCart, addItem, addToBag, removeFromBag , subTotal , clearBag} =
  cartSlice.actions;
export default cartSlice.reducer;
