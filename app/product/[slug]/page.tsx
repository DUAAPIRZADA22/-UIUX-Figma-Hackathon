import React from "react";
import { client } from "../../../sanity/lib/client";
import Link from "next/link";
import SingleProduct from "../../components/SingleProduct";
import RelatedProducts from "../../components/RelatedProducts";
import { MdProductionQuantityLimits } from "react-icons/md";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;

  // Query to fetch the single product details
  const query = `*[_type == "product" && slug.current == $slug][0]{
    image, name, price, salesPrice, description, tags, sizes, slug
  }`;
  const product = await client.fetch(query, { slug });

  // Query to fetch related products
  const relatedProductsQuery = `*[_type == "product" && slug.current != $slug]{
    image, name, price, salesPrice, description, tags, sizes, slug
  }`;
  const products = await client.fetch(relatedProductsQuery, { slug });
  const displayedProducts = products.slice(0, 5);

  return (
    <div className="max-w-7xl m-auto xl:px-0 px-5 mt-24">
      <SingleProduct product={product} />
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-5">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((relatedProduct: any) => (
            <RelatedProducts key={relatedProduct.slug} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
