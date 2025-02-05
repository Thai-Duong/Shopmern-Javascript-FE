import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload.data;
    },
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
