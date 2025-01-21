"use client";
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from "react";

// Product Interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  wishlist: Product[];
}

type WishlistAction =
  | { type: "ADD_TO_WISHLIST"; product: Product }
  | { type: "REMOVE_FROM_WISHLIST"; id: string }
  | { type: "CLEAR_WISHLIST" };

interface WishlistContextValue {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.wishlist.find((item) => item.id === action.product.id)) return state;
      return { ...state, wishlist: [...state.wishlist, action.product] };
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.id) };
    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { wishlist: [] });

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    dispatch({ type: "CLEAR_WISHLIST" });
    savedWishlist.forEach((product: Product) =>
      dispatch({ type: "ADD_TO_WISHLIST", product })
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
