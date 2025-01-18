import React from "react";
import { client } from "../../../sanity/lib/client";
import Link from "next/link";
import SingleProduct from "../../components/SingleProduct"; 
import RelatedProducts from "../../components/RelatedProducts"; 
import { MdProductionQuantityLimits } from "react-icons/md";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params; 
  const query = `*[_type == "product" && slug.current == "${slug}"]{
    image, name, price, salesPrice, description, tags, sizes, slug
  }[0]`;
  const product = await client.fetch(query);
  
  const relatedProductsQuery = `*[_type == "product" && slug.current != "${slug}"]{
    image, name, price, salesPrice, description, tags, sizes, slug
  }`;
  const products = await client.fetch(relatedProductsQuery);

  const displayedProducts = products.slice(0, 5);
  

  return (
    <div className="max-w-7xl m-auto xl:px-0 px-5 mt-24">
      <SingleProduct product={product} />
      </div>
  );
};

export default page;