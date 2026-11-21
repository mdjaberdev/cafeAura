"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { initializeCart } from "./features/cart/cartSlice";
import { initializeWishlist } from "./features/wishlist/wishlistSlice";

const CART_STORAGE_KEY = "cafeaura_cart_v1";
const WISHLIST_STORAGE_KEY = "cafeaura_wishlist_v1";

export default function ReduxProvider({ children }) {
  const isHydrated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || isHydrated.current) return;
    isHydrated.current = true;

    // 1. Rehydrate cart from localStorage safely after mount
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          store.dispatch(initializeCart(parsedCart));
        }
      }
    } catch (err) {
      console.warn("Could not read cart from localStorage:", err);
    }

    // 2. Rehydrate wishlist from localStorage safely after mount
    try {
      const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        const parsedWishlist = JSON.parse(storedWishlist);
        if (Array.isArray(parsedWishlist) && parsedWishlist.length > 0) {
          store.dispatch(initializeWishlist(parsedWishlist));
        }
      }
    } catch (err) {
      console.warn("Could not read wishlist from localStorage:", err);
    }

    // 3. Subscribe to store changes to keep localStorage in sync
    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();
        // Persist cart
        window.localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(state.cart.items)
        );
        // Persist wishlist
        window.localStorage.setItem(
          WISHLIST_STORAGE_KEY,
          JSON.stringify(state.wishlist.items)
        );
      } catch (err) {
        console.warn("Could not save to localStorage:", err);
      }
    });

    // 4. Sync state across multiple browser tabs
    const handleStorageChange = (e) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            store.dispatch(initializeCart(parsed));
          }
        } catch {}
      } else if (e.key === WISHLIST_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            store.dispatch(initializeWishlist(parsed));
          }
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
