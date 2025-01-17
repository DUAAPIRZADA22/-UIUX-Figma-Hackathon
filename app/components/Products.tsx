import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { urlFor } from "@/sanity/lib/image";

const Product = async () => {
  const query = `*[_type == "product"]{image, name, price, salesPrice, description, tags, sizes, slug}`;
  const products = await client.fetch(query);

  return (
    <>
      <section>
        <div className="px-8 py-12 text-[#2A254B] mt-12">
          <div className="text-darkPrimary font-extrabold text-[30px] font-clash-display mt-[80px] ml-[70px]">
            Our Popular Products
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-8">
            {products.map((product: ProductsCard, index: number) => (
              <div
                key={index}
                className="transition-transform hover:scale-105"
              >
                <Link href={`/product/${product.slug.current}`}>
                  <Image
                    src={urlFor(product.image).url()}
                    height={product.height || 300}
                    width={product.width || 600}
                    alt={product.name}
                    className="w-full h-[80%] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </Link>

                <div className="mt-4 text-[#2A254B]">
                  <p className="py-2 text-[20px] font-satoshi font-bold">{product.name}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-10 flex justify-center items-center">
            <button className="bg-gray-200 py-4 px-6 rounded-[5px] text-[#2A254B] hover:shadow-lg transition-shadow">
              View Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;





