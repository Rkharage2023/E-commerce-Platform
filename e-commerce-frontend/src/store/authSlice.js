import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwtToken") || null,
  user: JSON.parse(localStorage.getItem("userInfo")) || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("jwtToken", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userInfo");
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => !!state.auth.token;
export default authSlice.reducer;