// app/ui/dashboard/productDetail.tsx

import Image from "next/image";
import React from "react";
import moment from "moment";

import Button from "@/app/ui/button";
import {
  getProductDetail,
  getItemReviews,
} from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";

interface ProductDetailProps {
  id: string;
}

export default async function ProductDetail({
  id,
}: ProductDetailProps) {
  const product = await getProductDetail(id);
  const reviews = await getItemReviews(id);

  console.log("=== PRODUCT DEBUG ===");
  console.log("Requested ID:", id);
  console.log("Product:", product);
  console.log("====================");

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-2xl font-bold text-brown">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1">
          <Image
            priority
            src={product.image_url}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg object-cover md:h-[600px] md:w-[700px]"
          />
        </div>

        {/* Product Information */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-5xl text-brown font-bold">
            {product.title}
          </h1>

          <div className="flex flex-row justify-between items-center">
            <h3 className="text-2xl text-brown">
              {product.name}
            </h3>
            <p className="text-lg text-gray-600">
              Status: {product.status}
            </p>
          </div>

          <p className="text-3xl font-semibold text-gray-700">
            {formatCurrency(product.price)}
          </p>

          <p className="text-lg text-gray-600">
            {product.description}
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Artist:</span> {product.name}</p>
            <p><span className="font-semibold">Status:</span> {product.status}</p>
          </div>

          <div className="mt-4">
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="flex flex-col">
        <h2 className="text-brown text-5xl mt-6 mb-6">Reviews</h2>

        <div className="flex flex-col gap-6 text-2xl">
          {reviews.length === 0 && <h4>Be the first to leave a review!</h4>}

          {reviews.map((review) => (
            <div className="flex flex-col border-b pb-4" key={review.id}>
              <div className="flex flex-row justify-between">
                <p className="text-3xl font-semibold">{review.name}</p>
                <p>Rating: {review.rate} Stars</p>
              </div>
              <div className="text-xl text-gray-500">
                {moment(review.date).format("MM/DD/YYYY")}
              </div>
              <p className="text-brown text-xl mt-2">{review.text}</p>
            </div>
          ))}
        </div>

        <a
          href={`/dashboard/products/${product.id}/detail/review`}
          className="mt-6"
        >
          <Button>Review this Item</Button>
        </a>
      </div>
    </div>
  );
}