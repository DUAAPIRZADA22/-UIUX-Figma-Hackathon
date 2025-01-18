// app/products/page.tsx
"use client";
import { client } from '../../sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { urlFor } from "../../sanity/lib/image";

interface ProductsCard {
  _id: string;
  name: string;
  height: number;
  width: number;
  salesPrice: string;
  price: number;
  image: any;
  slug: {
    current: string | null;
  };
}

const Page = () => {
  const [allProducts, setAllProducts] = useState<ProductsCard[]>([]);

  const fetchAllProducts = async () => {
    const query = `*[_type == "product"]{
      _id,
      name,
      height,
      width,
      salesPrice,
      price,
      image,
      slug
    }`;
    const products = await client.fetch(query);
    setAllProducts(products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <section>
      <div className="px-8 py-12 text-[#2A254B] mt-12">
        <div className="text-darkPrimary font-extrabold text-[30px] font-clash-display mt-[80px] ml-[70px]">
          All Products
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {allProducts.map((product, index) => (
            <div
              key={index}
              className="transition-transform hover:scale-105 flex flex-col items-center"
            >
              <Link href={`/product/${product.slug.current}`}>
                <Image
                  src={product.image ? urlFor(product.image).url() : '/placeholder.png'}
                  height={product.height || 300}
                  width={product.width || 600}
                  alt={product.name}
                  className="w-full h-[80%] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </Link>
              <div className="mt-4 text-[#2A254B] text-center">
                <p className="py-2 text-[20px] font-satoshi font-bold">{product.name}</p>
                <p className="text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;

