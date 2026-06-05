'use client';

// app/ui/dashboard/productDetailClient.tsx

import Image from "next/image";
import moment from "moment";

import Button from "@/app/ui/button";
import { formatCurrency } from "@/app/lib/utils";
import { useCart } from "@/app/lib/cartContext";

interface Product {
  id: string;
  title: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
  status: string;
}

interface Review {
  id: string;
  name: string;
  rate: number;
  date: string;
  text: string;
}

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
}

export default function ProductDetailClient({
  product,
  reviews,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      artisan_name: product.name,
    });

    alert(`${product.title} added to cart!`);
  };

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
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold">Artist:</span>{" "}
              {product.name}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {product.status}
            </p>
          </div>

          <div className="mt-4">
            <Button onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="flex flex-col">
        <h2 className="text-brown text-5xl mt-6 mb-6">
          Reviews
        </h2>

        <div className="flex flex-col gap-6 text-2xl">
          {reviews.length === 0 && (
            <h4>Be the first to leave a review!</h4>
          )}

          {reviews.map((review) => (
            <div
              className="flex flex-col border-b pb-4"
              key={review.id}
            >
              <div className="flex flex-row justify-between">
                <p className="text-3xl font-semibold">
                  {review.name}
                </p>
                <p>Rating: {review.rate} Stars</p>
              </div>

              <div className="text-xl text-gray-500">
                {moment(review.date).format("MM/DD/YYYY")}
              </div>

              <p className="text-brown text-xl mt-2">
                {review.text}
              </p>
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
