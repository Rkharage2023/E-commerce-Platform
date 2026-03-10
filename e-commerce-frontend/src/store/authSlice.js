import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwtToken") || null,
  user: null, // User details fetched after login
  isAuthenticated: !!localStorage.getItem("jwtToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // Token is already stored in localStorage in LoginForm
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwtToken");
      // Optionally clear other state slices if needed
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => !!state.auth.token;
export default authSlice.reducer;
