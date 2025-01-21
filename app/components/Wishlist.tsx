"use client";
import React from "react";
import { useWishlist } from "../context/WishlistContext"; 
import { urlFor } from "../../sanity/lib/image";// Import correctly

const Wishlist = () => {
  const { state, dispatch } = useWishlist();

  const handleRemoveFromWishlist = (id: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", id });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {state.wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.wishlist.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">£{product.price}</p>
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="bg-red-500 text-white py-1 px-3 rounded mt-4 hover:bg-red-600"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;


