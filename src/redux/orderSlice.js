import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = [...action.payload.data];
      console.log(state.order);
    },
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
