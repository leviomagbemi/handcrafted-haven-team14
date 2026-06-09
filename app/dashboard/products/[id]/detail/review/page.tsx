import React from 'react';
import ProductReviewForm from './review-form';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className="flex flex-col items-center py-12 px-4 max-w-lg mx-auto">
      <h2 className="font-serif text-3xl font-bold text-primary mb-6">Write a Review</h2>
      <ProductReviewForm itemId={id} />
    </div>
  );
}
