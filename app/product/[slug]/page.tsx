import React from "react";
import { client } from "../../../sanity/lib/client";
import SingleProduct from "../../components/SingleProduct";
import RelatedProducts from "../../components/RelatedProducts";

// Define product type
interface Product {
  image: string;
  _id: string;
  name: string;
  price: number;
  salesPrice?: number;
  description: string;
  tags: string[];
  sizes?: string[];
  slug: {
    current: string;
  };
}

// Static Paths generation
export async function getStaticPaths() {
  // Fetch all slugs from Sanity to pre-render product pages
  const slugsQuery = `*[_type == "product"]{ "slug": slug.current }`;
  const slugs = await client.fetch(slugsQuery);

  // Generate paths for each product slug
  const paths = slugs.map((slug: { slug: string }) => ({
    params: { slug: slug.slug },
  }));

  // Return paths and set fallback to 'blocking' for SSR (for missing pages)
  return {
    paths,
    fallback: 'blocking', // Blocking ensures page is rendered on request if not available during build
  };
}

// Fetch product data at build time
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Query for a specific product based on the slug
  const query = `*[_type == "product" && slug.current == $slug][0]{
    image, name, price, salesPrice, description, tags, sizes, slug
  }`;
  const product: Product = await client.fetch(query, { slug });

  // Query to fetch related products
  const relatedProductsQuery = `*[_type == "product" && slug.current != $slug]{
    image, name, price, salesPrice, description, tags, sizes, slug
  }`;
  const products: Product[] = await client.fetch(relatedProductsQuery, { slug });
  const displayedProducts = products.slice(0, 5); // Display first 5 related products

  return {
    props: {
      product,
      displayedProducts,
    },
    revalidate: 60, // Optional: Re-generate the page every 60 seconds
  };
}

const Page = ({ product, displayedProducts }: { product: Product, displayedProducts: Product[] }) => {
  return (
    <div className="max-w-7xl m-auto xl:px-0 px-5 mt-24">
      <SingleProduct product={product} />
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-5">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((relatedProduct) => (
            <RelatedProducts key={relatedProduct.slug.current} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;






