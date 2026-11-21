import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const getItemKey = (item) => {
  if (item.cartItemId) return item.cartItemId;
  if (item.size || item.grind) {
    return `${item.id}-${item.size || "default"}-${item.grind || "default"}`;
  }
  return item.id;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add product to cart. If product already exists in cart, increments its quantity.
     */
    addToCart: (state, action) => {
      const payload = action.payload;
      if (!payload || !payload.id) return;

      const key = getItemKey(payload);
      const existingItem = state.items.find(
        (item) => getItemKey(item) === key || item.id === payload.id
      );

      const qtyToAdd =
        typeof payload.quantity === "number" && payload.quantity > 0
          ? payload.quantity
          : 1;

      const price =
        typeof payload.price === "number"
          ? payload.price
          : typeof payload.priceCents === "number"
          ? payload.priceCents / 100
          : parseFloat(payload.price) || 0;

      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        state.items.push({
          id: payload.id,
          cartItemId: key,
          name: payload.name || "Artisanal Coffee",
          price: Number(price.toFixed(2)),
          image: payload.image || "/images/products/latte-supreme.webp",
          category: payload.category || "Specialty Coffee",
          description: payload.description || payload.notes || "",
          origin: payload.origin || "",
          roast: payload.roast || "",
          size: payload.size || "Standard (250g)",
          grind: payload.grind || "Whole Bean",
          quantity: qtyToAdd,
        });
      }
    },

    /**
     * Remove product from cart by id or cartItemId
     */
    removeFromCart: (state, action) => {
      const targetId =
        typeof action.payload === "object"
          ? action.payload.cartItemId || action.payload.id
          : action.payload;

      state.items = state.items.filter(
        (item) => item.cartItemId !== targetId && item.id !== targetId
      );
    },

    /**
     * Increase product quantity by 1
     */
    increaseQuantity: (state, action) => {
      const targetId =
        typeof action.payload === "object"
          ? action.payload.cartItemId || action.payload.id
          : action.payload;

      const item = state.items.find(
        (i) => i.cartItemId === targetId || i.id === targetId
      );
      if (item) {
        item.quantity += 1;
      }
    },

    /**
     * Decrease product quantity by 1.
     * If quantity reaches 0, removes the item from the cart.
     */
    decreaseQuantity: (state, action) => {
      const targetId =
        typeof action.payload === "object"
          ? action.payload.cartItemId || action.payload.id
          : action.payload;

      const itemIndex = state.items.findIndex(
        (i) => i.cartItemId === targetId || i.id === targetId
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    /**
     * Update product quantity to an explicit number
     */
    updateQuantity: (state, action) => {
      const { id, cartItemId, quantity } = action.payload || {};
      const targetId = cartItemId || id;
      const numQty = parseInt(quantity, 10);

      const itemIndex = state.items.findIndex(
        (i) => i.cartItemId === targetId || i.id === targetId
      );

      if (itemIndex !== -1) {
        if (numQty > 0) {
          state.items[itemIndex].quantity = numQty;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    /**
     * Clear the entire cart
     */
    clearCart: (state) => {
      state.items = [];
    },

    /**
     * Initialize/Rehydrate cart from storage
     */
    initializeCart: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
        }));
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
  initializeCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (subtotal, item) =>
      subtotal + (Number(item.price) || 0) * (item.quantity || 0),
    0
  );

export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id || item.cartItemId === id);

export default cartSlice.reducer;
