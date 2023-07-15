import { createSlice } from "@reduxjs/toolkit";
import { getProfile, setProfile } from "../utils/auth";

const initialState = {
  profile: getProfile(),
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.profile = action.payload.data;
      setProfile(state.profile);
    },
    logout: () => {
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.users = [...action.payload.data];
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
