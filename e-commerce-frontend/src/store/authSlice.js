import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwtToken") || null,
  // Use "user" key consistently — Navbar and all components read from "user"
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("jwtToken", action.payload.token);
      // Store under "user" — consistent with Navbar.jsx
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => !!state.auth.token;
export default authSlice.reducer;
