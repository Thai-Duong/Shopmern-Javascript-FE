import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.productList = [...action.payload.data];
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
