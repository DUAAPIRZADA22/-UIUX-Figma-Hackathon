"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CardContext";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import { AiOutlineClose } from "react-icons/ai";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: any;
  description: string;
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { dispatch } = useCart();

  // Wishlist ko localStorage se load karna
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);

  // Wishlist se item remove karna
  const handleRemoveFromWishlist = (itemId: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Cart mein item add karna
  const handleAddToCart = (item: WishlistItem) => {
    dispatch({
      type: "ADD_TO_CART",
      product: {
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        description: item.description,
      },
    });
  };

  return (
    <section>
      <div className="px-8 py-12 text-[#2A254B]">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col items-center p-4"
              >
                <Image
                  src={
                    item.image
                      ? urlFor(item.image).width(250).height(250).url()
                      : "/placeholder.png"
                  }
                  alt={item.name}
                  width={250}
                  height={250}
                  className="object-cover"
                />
                <div className="mt-4 text-center">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500">${item.price}</p>

                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                    <AiOutlineClose
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      size={24}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-center mt-12 text-gray-600">
            Your wishlist is empty!
          </p>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;

