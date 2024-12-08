'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';


const products = [
  {
    id: 1,
    name: 'The Popular Suede Sofa',
    image: '/Large.png',
    price: 980,
    width: 630, 
    height: 375,
  },
  {
    id: 2,
    name: 'The Dandy Chair',
    image: '/home.png',
    price: 250,
    width: 305,
    height: 375,
  },
  {
    id: 3,
    name: 'The Dandy Chair',
    image: '/pr2.png',
    price: 250,
    width: 305,
    height: 375,
  },
];

const Product = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/productlisting');
  };

  return (
    <>
      <section>
        <div className="px-8 py-12 text-[#2A254B] mt-12">
        <div className="text-darkPrimary font-extrabold text-[30px] font-clash-display mt-[80px] ml-[70px]">
          Our Popular Products
          </div> 

          <div className="flex flex-col md:flex-row gap-8 mt-8">
            {products.map((product) => (
              <div
                key={product.id}
                className='transition-transform hover:scale-105'
              >
                <Image
                  src={product.image}
                  height={product.height}
                  width={product.width}
                  alt={product.name}
                  className="w-full h-[80%] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="mt-4 text-[#2A254B]">
                  <p className="py-2 text-[20px] font-satoshi font-bold">{product.name}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-10 flex justify-center items-center">
            <button
              className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] hover:shadow-lg transition-shadow"
              onClick={handleNavigation}
            >
              View Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;






