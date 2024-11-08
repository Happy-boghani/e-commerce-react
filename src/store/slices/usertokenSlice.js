import { createSlice } from "@reduxjs/toolkit";

const usertokenSlice = createSlice({
  name: "user",
  initialState: { isAuthenticated: false, userData: null },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    }
  }
});

export default usertokenSlice.reducer;
export const { login, logout } = usertokenSlice.actions;
