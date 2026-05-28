import React from 'react';
import ProductReviewForm from './review-form';

export default function ProductPage () {
  return (
    <div className="flex flex-col items-center">
    <h2>Write a Review</h2>
      <ProductReviewForm />
    </div>
  );
};
