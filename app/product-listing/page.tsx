"use client";
import React, { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import Brand from "../components/Brand";
import Join from "../components/Join";
import Image from "next/image";

const recommendedItems = [
  { id: 1, image: "/home.png", name: "The Dandy Chair", price: "£250" },
  { id: 2, image: "/photo1.png", name: "Rustic Vase Set", price: "£155" },
  { id: 3, image: "/photo3.png", name: "The Silky Vase", price: "£125" },
  { id: 4, image: "/photo2.png", name: "The Lucy Lamp", price: "£399" },
];

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center mb-20 mt-[-100px]">
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <Image
              src="/img.png"
              alt="chair image"
              width={721}
              height={759}
              className="object-contain max-w-full sm:w-[90%] md:w-[80%]"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-start md:ml-12 mt-10">
            <h1 className="font-extrabold text-blue-950 text-[32px] sm:text-[40px] text-center md:text-left border-b-2 border-gray-300">
              The Dandy Chair
            </h1>
            <h2 className="text-[24px] sm:text-[26px] text-center md:text-left mt-4">
              £250
            </h2>

            <h3 className="font-clash-display text-[20px] sm:text-[22px] text-darkPrimary mt-6">
              Description
            </h3>
            <p className="font-satoshi text-[14px] sm:text-[16px] text-darkPrimary mt-4">
              A timeless design, with premium material features as one of our
              most popular and iconic pieces. The Dandy chair is perfect for any
              stylish living space with beech legs and lambskin leather
              upholstery.
            </p>
            <ul className="text-darkPrimary mt-4 list-disc pl-6 text-[14px] sm:text-[16px]">
              <li>Premium material</li>
              <li>Handmade upholstery</li>
              <li>Quality timeless classic</li>
            </ul>

            <h3 className="font-clash-display text-darkPrimary text-[20px] sm:text-[22px] mt-4 mb-4">
              Dimensions
            </h3>
            <table className="w-full sm:w-[260px] mt-4 border text-left text-[13px] sm:text-[15px]">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Height</th>
                  <th className="py-3">Width</th>
                  <th className="py-3">Depth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3">110cm</td>
                  <td className="py-3">75cm</td>
                  <td className="py-3">50cm</td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col sm:flex-row items-center mt-6 gap-6">
              <div className="flex items-center gap-6 text-xl font-bold">
                <button className="text-gray-500 hover:text-black">-</button>
                <span className="text-black">1</span>
                <button className="text-gray-500 hover:text-black">+</button>
              </div>
              <button className="font-satoshi w-[160px] h-[60px] text-white bg-darkPrimary rounded-md hover:bg-darkPrimary-light">
                Add to cart
              </button>
            </div>
          </div>
        </div>

    
        <div className="mt-10 mb-10">
          <h1 className="font-clash-display text-[28px] sm:text-[32px] text-darkPrimary mb-6 text-left">
            You might also like
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedItems.map((item) => (
              <div key={item.id} className="text-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={305}
                  height={375}
                  className="object-cover mx-auto mb-4"
                />
                <h3 className="text-[18px] sm:text-[20px] font-bold text-darkPrimary">
                  {item.name}
                </h3>
                <p className="text-[16px] sm:text-[18px] text-gray-700">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[170px] h-[56px] bg-gray-100 text-darkPrimary flex items-center justify-center mx-auto mb-8">
        <button className="w-full h-full text-center font-satoshi text-sm">
          View Collection
        </button>
      </div>

      <Brand />
      <Join />
    </div>
  );
};

export default Page;























;






