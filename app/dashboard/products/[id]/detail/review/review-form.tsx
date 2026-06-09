"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/authContext";
import { submitReview } from "@/app/lib/actions";
import Link from "next/link";

interface ProductReviewFormProps {
  itemId: string;
}

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({ itemId }) => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="bg-white border border-outline-variant/60 rounded-2xl p-8 text-center shadow-md w-full max-w-md">
        <div className="text-4xl mb-4">🔐</div>
        <h3 className="font-serif text-xl font-bold text-primary mb-2">Sign in to write a review</h3>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Only registered and signed in members can share reviews of products.
        </p>
        <Link
          href="/dashboard/login"
          className="inline-flex w-full items-center justify-center px-5 py-3 bg-[#a65b32] hover:bg-[#8e4c29] text-white text-xs font-bold rounded-lg transition-all active:scale-95 shadow-sm"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (rating === 0) {
      errs.rating = "Please select a rating of at least 1 star.";
    }
    if (!comment.trim()) {
      errs.comment = "Please write a comment.";
    } else if (comment.trim().length > 1000) {
      errs.comment = "Your review comment cannot exceed 1000 characters.";
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setValidationErrors({});

    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await submitReview({
        userId: user.id,
        itemId: itemId,
        rate: rating,
        text: comment,
      });

      if (res.error) {
        setError(res.error);
        return;
      }

      router.push(`/dashboard/products/${itemId}/detail`);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-outline-variant/60 rounded-2xl p-6 sm:p-8 shadow-md w-full max-w-md flex flex-col gap-5 text-left"
    >
      {error && (
        <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
          <span className="shrink-0 mt-0.5">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Star Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Rating
        </label>
        <div className="flex items-center gap-1.5 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRating(star);
                if (validationErrors.rating) setValidationErrors(prev => ({ ...prev, rating: "" }));
              }}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl transition-colors focus:outline-none"
              aria-label={`Rate ${star} Stars`}
            >
              <span className={star <= (hoverRating || rating) ? 'text-[#a65b32]' : 'text-gray-300'}>
                ★
              </span>
            </button>
          ))}
        </div>
        {validationErrors.rating && (
          <p role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1">
            <span aria-hidden="true">✕</span> {validationErrors.rating}
          </p>
        )}
      </div>

      {/* Review Comment */}
      <div className="flex flex-col gap-2">
        <label htmlFor="comment" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Your Review
        </label>
        <textarea
          id="comment"
          rows={5}
          value={comment}
          maxLength={1000}
          onChange={(e) => {
            setComment(e.target.value);
            if (validationErrors.comment) setValidationErrors(prev => ({ ...prev, comment: "" }));
          }}
          placeholder="What did you think of the quality, craft, and finish? Write your honest review here..."
          className={`block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none ${
            validationErrors.comment
              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white'
          }`}
        />
        <div className="flex justify-between items-center text-[10px] mt-0.5">
          {validationErrors.comment ? (
            <p role="alert" className="text-red-600 font-medium flex items-center gap-1">
              <span aria-hidden="true">✕</span> {validationErrors.comment}
            </p>
          ) : (
            <span />
          )}
          <span className={`font-semibold shrink-0 ml-auto ${comment.length > 950 ? 'text-amber-600' : 'text-gray-400'}`}>
            {comment.length} / 1000 characters
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <Link
          href={`/dashboard/products/${itemId}/detail`}
          className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-sm text-center tracking-wide transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 bg-[#a65b32] hover:bg-[#8e4c29] active:scale-[0.98] text-white font-bold rounded-lg text-sm tracking-wide shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit Review"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductReviewForm;
