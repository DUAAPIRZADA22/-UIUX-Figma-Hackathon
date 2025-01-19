"use client";

import { client } from '../../sanity/lib/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { urlFor } from "../../sanity/lib/image";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CardContext";
import Link from 'next/link';

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
  const { dispatch } = useCart();

  const fetchAllProducts = async () => {
    const query = `*[_type == "product"]{
      _id,
      name,
      price,
      image,
      description,
      slug
    }`;
    const products = await client.fetch(query);
    console.log("Fetched Products:", products);
    setAllProducts(products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
  };

  return (
    <section>
      <div className="px-8 py-12 text-[#2A254B] mt-6">
        <div className="text-darkPrimary font-extrabold text-[30px] font-clash-display mt-[80px] ml-[70px]">
          Our Popular Products
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
          {allProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col items-center p-4"
            >
              <Link href={`/product/${product.slug.current}`}>
                <Image
                  src={product.image ? urlFor(product.image).width(250).height(250).quality(80).url() : '/placeholder.png'}
                  height={250}
                  width={250}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                />
              </Link>
              
              <div className="mt-4 text-[#2A254B] text-center">
                <p className="py-2 text-[18px] font-satoshi font-bold">{product.name}</p>
                <p className="text-lg text-darkPrimary">${product.price}</p>
                
                <div className="flex items-center justify-center gap-4 mt-4">
                  <FaShoppingCart
                    onClick={handleAddToCart}
                    className="text-[24px] hover:text-darkPrimary transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;








