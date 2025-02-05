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
    calculateTotals: (state) => {
      state.totalAmount = state.cart
        .filter((item) => item.selected) // Chỉ tính tổng tiền sản phẩm đã chọn
        .reduce((total, item) => total + item.price * item.cartQuantity, 0);
      state.cartQuantity = state.cart.reduce(
        (total, item) => total + item.cartQuantity,
        0
      );
    },
    addToCart: (state, action) => {
      const itemsIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemsIndex >= 0) {
        state.cart[itemsIndex].cartQuantity += 1;
      } else {
        const items = {
          ...action.payload,
          cartQuantity: 1,
          selected: false, // Khởi tạo mặc định
        };
        state.cart.push(items);
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    delToCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      cartSlice.caseReducers.calculateTotals(state);
    },
    descreaseCart: (state, action) => {
      const itemsIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemsIndex >= 0) {
        if (state.cart[itemsIndex].cartQuantity > 1) {
          state.cart[itemsIndex].cartQuantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    increaseCart: (state, action) => {
      const itemsIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemsIndex >= 0) {
        state.cart[itemsIndex].cartQuantity += 1;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    toggleSelect: (state, action) => {
      console.log("Payload:", action.payload); // Log payload
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      console.log("Item Index:", itemIndex); // Log kết quả tìm kiếm
      if (itemIndex >= 0) {
        state.cart[itemIndex].selected = action.payload.selected;
        console.log("Full Cart State:", JSON.stringify(state.cart, null, 2));
      } else {
        console.error("Item not found in cart with _id:", action.payload._id);
      }
    },
  },
});

export const {
  addToCart,
  delToCart,
  increaseCart,
  descreaseCart,
  toggleSelect,
} = cartSlice.actions;

export default cartSlice.reducer;
