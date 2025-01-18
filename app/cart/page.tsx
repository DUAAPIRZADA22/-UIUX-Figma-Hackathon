"use client";

import Image from "next/image";
import React from "react";
import { useCart } from "../context/CardContext";

const CartPage = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const handleQuantityChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 1) return; // Minimum quantity is 1
    dispatch({ type: "UPDATE_QUANTITY", id, quantity: value });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mb-10 px-6 sm:px-10">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        {state.cart.length === 0 ? (
          <p className="text-xl">Your cart is empty!</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse mb-8">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2">Product</th>
                    <th className="text-left px-4 py-2">Quantity</th>
                    <th className="text-left px-4 py-2">Total</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.cart.map((item) => (
                    <tr key={item._id}>
                      <td className="px-4 py-6">
                        <div className="flex gap-4 items-center">
                          <Image
                            src="/cart2.png"
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-[80px] h-[80px] object-cover"
                          />
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-gray-500">£{item.price}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity || 1}
                          onChange={(e) => handleQuantityChange(item._id, e)}
                          className="w-16 border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-4 py-2">£{(item.price * (item.quantity || 1)).toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right">
              <h2 className="text-xl font-bold">Subtotal: £{totalPrice.toFixed(2)}</h2>
              <p className="text-gray-500 text-sm mb-4">Taxes and shipping calculated at checkout</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Go to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;

