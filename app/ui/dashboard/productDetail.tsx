// app/ui/dashboard/productDetail.tsx

import { getProductDetail, getItemReviews } from "@/app/lib/data";
import ProductDetailClient from "./productDetailClient";

interface ProductDetailProps {
  id: string;
}

export default async function ProductDetail({ id }: ProductDetailProps) {
  const product = await getProductDetail(id);
  const reviews = await getItemReviews(id);

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-2xl font-bold text-brown">Product not found.</p>
      </div>
    );
  }

  return (
    <ProductDetailClient product={product} reviews={reviews} />
  );
}
