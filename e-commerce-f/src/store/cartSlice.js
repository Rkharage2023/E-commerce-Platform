import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(
        (i) => i.product._id === action.payload._id,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.product._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.product._id === action.payload.productId,
      );
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
export default cartSlice.reducer;
