import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-white">
      <div className="mb-10 -mt-32 px-6 sm:px-10">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse mb-8">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Product</th>
                <th className="text-left px-4 py-2">Quantity</th>
                <th className="text-left px-4 py-2">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="px-4 py-6">
                  <div className="flex gap-4 flex-col md:flex-row">
                    <Image
                      src="/cart2.png"
                      alt="Product 1"
                      className="w-[109px] h-[134px] object-cover"
                    />
                    <div>
                      <h3 className="font-clash-display text-[20px] text-darkPrimary">Graystone Vase</h3>
                      <p className="font-satoshi text-[14px] text-Primary">
                        A timeless ceramic vase with <br /> a tri-color grey glaze.
                      </p>
                      <p className="font-clash-display text-[20px] text-darkPrimary">£85</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">£85</td>
              </tr>

              <tr>
                <td className="px-4 py-6">
                  <div className="flex gap-4 flex-col md:flex-row">
                    <Image
                      src="/cart1.png"
                      alt="Product 2"
                      className="w-[109px] h-[134px] object-cover"
                    />
                    <div>
                      <h3 className="font-clash-display text-[20px] text-darkPrimary">Basic White Vase</h3>
                      <p className="font-satoshi text-[14px] text-Primary">
                        Beautiful and simple this <br /> is one for the classics.
                      </p>
                      <p className="font-clash-display text-[20px] text-darkPrimary">£85</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">£85</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <h1 className="font-clash-display text-[20px] text-darkPrimary font-bold my-2">Subtotal £210</h1>
            <p className="font-satoshi text-[14px] text-darkPrimary">
              Taxes and shipping are calculated at checkout
            </p>
          </div>

          <button className="bg-darkPrimary font-satoshi font-bold text-[16px] text-white py-4 px-4 mb-6 rounded hover:bg-darkPrimary/80">
            Go to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;


