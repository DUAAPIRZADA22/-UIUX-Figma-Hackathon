"use client";
import React, { useState } from "react";
import { useCart } from "../context/CardContext"; 
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image"; 

const Page = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const [isCheckout, setIsCheckout] = useState(false); // Toggle for showing checkout form

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const handleQuantityChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 1) return; // Minimum quantity is 1
    dispatch({ type: "UPDATE_QUANTITY", id, quantity: value });
  };

  const handleCheckoutClick = () => {
    setIsCheckout(true); // Show checkout form when user clicks on the checkout button
  };

  const handleBackToCart = () => {
    setIsCheckout(false); // Go back to cart
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mb-10 px-6 sm:px-10">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        {state.cart.length === 0 ? (
          <p className="text-xl">Your cart is empty!</p>
        ) : (
          <>
            {!isCheckout ? (
              // Cart Page
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
                      {state.cart.map((item, index) => (
                        <tr key={item._id || index}> 
                          <td className="px-4 py-6">
                            <div className="flex gap-4 items-center">
                              <Image
                                src={item.image ? urlFor(item.image).width(100).height(100).url() : '/cart2.png'}
                                alt={item.name}
                                width={150}
                                height={150}
                                className="w-[150px] h-[150px] object-cover"
                              />
                              <div>
                                <h3 className="font-bold text-2xl">{item.name}</h3>
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
                  <button
                    onClick={handleCheckoutClick}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Go to Checkout
                  </button>
                </div>
              </>
            ) : (
              // Checkout Form
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-lg mb-2">Billing Address</label>
                    <input
                      type="text"
                      placeholder="Enter billing address"
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg mb-2">Shipping Address</label>
                    <input
                      type="text"
                      placeholder="Enter shipping address"
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg mb-2">Payment Information</label>
                    <input
                      type="text"
                      placeholder="Enter payment info (Mock)"
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleBackToCart}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 ml-4"
                    >
                      Submit Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;






