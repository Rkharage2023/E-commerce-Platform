import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array of { product: {...}, quantity: number }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === newItem._id,
      );

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({ product: newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.product._id !== productIdToRemove,
      );
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === productId,
      );

      if (itemIndex > -1) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

export default cartSlice.reducer;
