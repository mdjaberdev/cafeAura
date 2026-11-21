"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { initializeCart } from "./features/cart/cartSlice";

const CART_STORAGE_KEY = "cafeaura_cart_v1";

export default function ReduxProvider({ children }) {
  const isHydrated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || isHydrated.current) return;
    isHydrated.current = true;

    // 1. Rehydrate cart from localStorage safely after mount
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          store.dispatch(initializeCart(parsed));
        }
      }
    } catch (err) {
      console.warn("Could not read cart from localStorage:", err);
    }

    // 2. Subscribe to store changes to keep localStorage in sync
    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();
        window.localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(state.cart.items)
        );
      } catch (err) {
        console.warn("Could not save cart to localStorage:", err);
      }
    });

    // 3. Sync state across multiple browser tabs
    const handleStorageChange = (e) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            store.dispatch(initializeCart(parsed));
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
