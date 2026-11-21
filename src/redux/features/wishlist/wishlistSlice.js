import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    /**
     * Add a product to the wishlist if not already present.
     */
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!product || !product.id) return;

      const exists = state.items.some((item) => item.id === product.id);
      if (!exists) {
        state.items.push({
          id: product.id,
          name: product.name || "Artisanal Coffee",
          price:
            typeof product.price === "number"
              ? product.price
              : typeof product.priceCents === "number"
              ? product.priceCents / 100
              : parseFloat(product.price) || 0,
          image: product.image || "/images/products/latte-supreme.webp",
          category: product.category || "Specialty Coffee",
          description: product.description || product.notes || "",
          origin: product.origin || "",
          roast: product.roast || "",
          roastLevel: product.roastLevel || 3,
          rating: product.rating || 4.8,
          reviews: product.reviews || 95,
          badge: product.badge || "",
          notes: Array.isArray(product.notes) ? product.notes : [],
          addedAt: new Date().toISOString(),
        });
      }
    },

    /**
     * Remove a product from the wishlist by its ID.
     */
    removeFromWishlist: (state, action) => {
      const id =
        typeof action.payload === "object"
          ? action.payload.id
          : action.payload;

      state.items = state.items.filter((item) => item.id !== id);
    },

    /**
     * Toggle product wishlist status (adds if not wishlisted, removes if already wishlisted).
     */
    toggleWishlist: (state, action) => {
      const product = action.payload;
      if (!product || !product.id) return;

      const index = state.items.findIndex((item) => item.id === product.id);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push({
          id: product.id,
          name: product.name || "Artisanal Coffee",
          price:
            typeof product.price === "number"
              ? product.price
              : typeof product.priceCents === "number"
              ? product.priceCents / 100
              : parseFloat(product.price) || 0,
          image: product.image || "/images/products/latte-supreme.webp",
          category: product.category || "Specialty Coffee",
          description: product.description || product.notes || "",
          origin: product.origin || "",
          roast: product.roast || "",
          roastLevel: product.roastLevel || 3,
          rating: product.rating || 4.8,
          reviews: product.reviews || 95,
          badge: product.badge || "",
          notes: Array.isArray(product.notes) ? product.notes : [],
          addedAt: new Date().toISOString(),
        });
      }
    },

    /**
     * Clear the entire wishlist.
     */
    clearWishlist: (state) => {
      state.items = [];
    },

    /**
     * Initialize/Rehydrate wishlist from localStorage.
     */
    initializeWishlist: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload.filter((item) => item && item.id);
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  initializeWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;

export const selectWishlistTotalItems = (state) =>
  state.wishlist.items ? state.wishlist.items.length : 0;

export const selectIsInWishlist = (id) => (state) =>
  Boolean(state.wishlist.items?.some((item) => item.id === id));

export default wishlistSlice.reducer;
