import { Metadata } from "next";
import React from "react";
import { client } from "../../../sanity/lib/client";
import SingleProduct from "../../components/SingleProduct";
import RelatedProducts from "../../components/RelatedProducts";

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

// Define the correct PageProps type for Next.js
interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{ name, description }`,
    { slug: params.slug }
  );

  return {
    title: product?.name || "Product Details",
    description: product?.description || "Product description",
  };
}

// Page component
export default async function Page({ params }: PageProps) {
  const { slug } = params;

  try {
    // Fetch the product data
    const productQuery = `*[_type == "product" && slug.current == $slug][0]{
      image, name, price, salesPrice, description, tags, sizes, slug
    }`;
    const product: Product = await client.fetch(productQuery, { slug });

    if (!product) {
      throw new Error("Product not found");
    }

    // Fetch related products
    const relatedProductsQuery = `*[_type == "product" && slug.current != $slug][0...5]{
      image, name, price, salesPrice, description, tags, sizes, slug
    }`;
    const relatedProducts: Product[] = await client.fetch(relatedProductsQuery, {
      slug,
    });

    return (
      <div className="max-w-7xl m-auto xl:px-0 px-5 mt-24">
        <SingleProduct product={product} />
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-5">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <RelatedProducts
                key={relatedProduct.slug.current}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="max-w-7xl m-auto xl:px-0 px-5 mt-24">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>
      </div>
    );
  }
}