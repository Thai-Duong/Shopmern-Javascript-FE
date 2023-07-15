import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemsIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemsIndex >= 0) {
        state.cart[itemsIndex].cartQuantity += 1;
      } else {
        const items = { ...action.payload, cartQuantity: 1 };
        state.cart.push(items);
      }
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.cartQuantity),
        0
      );
    },
    delToCart: (state, action) => {
      const itemsIndex = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = itemsIndex;
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.cartQuantity),
        0
      );
    },
    descreaseCart: (state, action) => {
      const itemsIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cart[itemsIndex].cartQuantity >= 1) {
        state.cart[itemsIndex].cartQuantity -= 1;
      } else if (state.cart[itemsIndex].cartQuantity < 1) {
        const itemsIndex = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
        state.cart = itemsIndex;
      }
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.cartQuantity),
        0
      );
    },
    increaseCart: (state, action) => {
      const itemsIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cart[itemsIndex].cartQuantity >= 1) {
        state.cart[itemsIndex].cartQuantity += 1;
      }
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.cartQuantity),
        0
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.cartQuantity),
        0
      );
    },
  },
});

export const { addToCart, delToCart, clearCart, increaseCart, descreaseCart } =
  cartSlice.actions;

export default cartSlice.reducer;
