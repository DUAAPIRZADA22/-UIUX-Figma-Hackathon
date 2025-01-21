"use client";

import { client } from "../../sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { urlFor } from "../../sanity/lib/image";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai"; // Wishlist icon
import { useCart } from "../context/CardContext";
import Link from "next/link";
import { Toast } from "../components/Toast";

interface ProductsCard {
  _id: string;
  name: string;
  price: number;
  image: any;
  description: string;
  slug: {
    current: string | null;
  };
}

const Page = () => {
  const [allProducts, setAllProducts] = useState<ProductsCard[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0); // Total number of products
  const { dispatch } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [productsPerPage, setProductsPerPage] = useState<number>(6); // Products per page
  const [wishlist, setWishlist] = useState<string[]>([]); // Wishlist state

  // Fetch all products with pagination
  const fetchAllProducts = async () => {
    const query = `*[_type == "product"]{
      _id,
      name,
      price,
      image,
      description,
      slug
    }`;
    const totalCountQuery = `count(*[_type == "product"])`; // Query to get the total number of products
    const totalProductsCount = await client.fetch(totalCountQuery);
    const products = await client.fetch(query);

    setTotalProducts(totalProductsCount);
    setAllProducts(products);
  };

  useEffect(() => {
    fetchAllProducts();
    // Load wishlist from localStorage if available
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, [currentPage]);

  const handleAddToCart = (product: ProductsCard) => {
    dispatch({
      type: "ADD_TO_CART",
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        description: product.description,
      },
    });

    setToastMessage(`${product.name} added to cart!`);
    setToastType("success");
    setShowToast(true);
    console.log(`${product.name} added to cart successfully!`);
  };

  // Handle adding/removing products from wishlist
  const handleWishlist = (productId: string, productName: string) => {
    let updatedWishlist = [...wishlist];
    let message = "";

    if (updatedWishlist.includes(productId)) {
      updatedWishlist = updatedWishlist.filter((id) => id !== productId); // Remove from wishlist
      message = `${productName} removed from wishlist!`;
      setToastType("info"); // Toast type for removal
    } else {
      updatedWishlist.push(productId); // Add to wishlist
      message = `${productName} added to wishlist!`;
      setToastType("success"); // Toast type for addition
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to localStorage

    // Show toast message
    setToastMessage(message);
    setShowToast(true);
  };

  // Logic for Pagination
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <section>
      <div className="px-8 py-12 text-[#2A254B] mt-6">
        <div className="text-darkPrimary font-extrabold text-[30px] font-clash-display mt-[80px] ml-[70px]">
          Our Popular Products
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
          {currentProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col items-center p-4"
            >
              <Link href={`/product/${product.slug.current}`}>
                <Image
                  src={
                    product.image
                      ? urlFor(product.image)
                          .width(250)
                          .height(250)
                          .quality(80)
                          .url()
                      : "/placeholder.png"
                  }
                  height={250}
                  width={250}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                />
              </Link>

              <div className="mt-4 text-[#2A254B] text-center">
                <p className="py-2 text-[18px] font-satoshi font-bold">
                  {product.name}
                </p>
                <p className="text-lg text-darkPrimary">${product.price}</p>

                <div className="flex items-center justify-center gap-4 mt-4">
                  {/* Cart Icon */}
                  <FaShoppingCart
                    onClick={() => handleAddToCart(product)}
                    className="text-[24px] hover:text-darkPrimary transition-colors cursor-pointer"
                  />

                  {/* Wishlist Icon */}
                  <AiOutlineHeart
                    onClick={() => handleWishlist(product._id, product.name)}
                    className={`text-[24px] cursor-pointer transition-colors ${
                      wishlist.includes(product._id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-darkPrimary text-white rounded-l-lg hover:bg-opacity-80"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-darkPrimary text-white"
                  : "bg-white text-darkPrimary"
              } hover:bg-darkPrimary hover:text-white transition-all`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-darkPrimary text-white rounded-r-lg hover:bg-opacity-80"
          >
            Next
          </button>
        </div>
      </div>

      {showToast && toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </section>
  );
};

export default Page;













