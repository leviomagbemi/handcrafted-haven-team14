'use client';

// app/ui/dashboard/productDetailClient.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { 
  HeartIcon as HeartOutline, 
  ChevronDownIcon, 
  ChevronUpIcon,
  PlayIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

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
  artisan_image_url?: string;
  artisan_story?: string;
  artisan_studio_name?: string;
  artisan_craft_type?: string;
  artisan_id?: string;
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

const ARTISAN_LOCATIONS: Record<string, string> = {
  'Aisha Al-Farsi': 'Santa Fe, New Mexico',
  'Julian Vance': 'Austin, Texas',
  'Elena Rossi': 'Seattle, Washington',
  'Marcus Thorne': 'Asheville, North Carolina',
  'Clara Dupont': 'Portland, Oregon',
  'Oliver Schmidt': 'Brooklyn, New York',
};

export default function ProductDetailClient({
  product,
  reviews,
}: ProductDetailClientProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    story: true,
    materials: false,
    shipping: false,
  });
  const [galleryImages, setGalleryImages] = useState<string[]>([product.image_url]);

  useEffect(() => {
    setIsSaved(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  useEffect(() => {
    fetch(`/api/products/${product.id}/images`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product variations");
        return res.json();
      })
      .then((images) => {
        if (Array.isArray(images) && images.length > 0) {
          setGalleryImages(images);
        } else {
          setGalleryImages([product.image_url]);
        }
      })
      .catch((err) => {
        console.error("Error loading product variations:", err);
        setGalleryImages([product.image_url]);
      });
  }, [product.id, product.image_url]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [galleryImages]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      artisan_name: product.name,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveToggle = () => {
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      artisan_name: product.name,
    });
    setIsSaved(!isSaved);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate dynamic rating summary
  const reviewCount = reviews.length;
  const avgRating = reviewCount > 0 
    ? reviews.reduce((sum, r) => sum + r.rate, 0) / reviewCount 
    : 0;

  const renderStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-sm ${i <= roundedRating ? 'text-[#a65b32]' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };


  const location = ARTISAN_LOCATIONS[product.name] || 'Portland, Oregon';
  const artisanStudio = product.artisan_studio_name || `${product.name}'s Studio`;
  const artisanImage = product.artisan_image_url || '/images/default-artisan.jpg';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-5 py-4 shadow-xl text-sm font-semibold animate-fade-in">
          <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
          <span>{product.title} added to cart!</span>
        </div>
      )}

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-outline-variant bg-[#efeeec]/30 shadow-sm">
            <Image
              priority
              src={galleryImages[activeImageIndex] || product.image_url}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx 
                    ? 'border-[#a65b32] ring-2 ring-[#a65b32]/20' 
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`View angle ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
            
            {/* Video Placeholder Box */}
            <div className="relative aspect-square rounded-xl bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 cursor-not-allowed group">
              <PlayIcon className="h-7 w-7 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Accordions */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Category Pill & Rating */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <span className="inline-block bg-[#efeeec] text-[#5c5b57] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category || 'Craft'}
              </span>
              <div className="flex items-center gap-1">
                {renderStars(avgRating)}
                <span className="text-xs text-gray-500 font-semibold ml-1">
                  ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight mt-1">
              {product.title}
            </h1>
            
            <p className="font-sans text-2xl font-bold text-[#a65b32]">
              {formatCurrency(product.price)}
            </p>
          </div>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          {/* Artisan Card */}
          <div className="border border-outline-variant/60 rounded-2xl p-4 flex items-center justify-between bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-outline-variant/60 shrink-0 bg-neutral-100">
                <Image
                  src={artisanImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-primary text-sm leading-none">{artisanStudio}</h4>
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#e2f0d9] text-[#385723] text-[11px] font-extrabold shadow-sm shrink-0">
                    HH
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">{location}</p>
              </div>
            </div>
            {product.artisan_id && (
              <Link
                href={`/dashboard/artistBio/${product.artisan_id}`}
                className="text-xs font-bold text-[#a65b32] hover:text-[#8e4c29] transition-colors uppercase tracking-wider"
              >
                View Shop
              </Link>
            )}
          </div>

          {/* Call to Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-grow py-4 bg-[#a65b32] hover:bg-[#8e4c29] active:scale-[0.98] text-white font-bold rounded-xl text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
            
            <button
              onClick={handleSaveToggle}
              aria-label={isSaved ? "Remove from saved items" : "Save item"}
              className={`p-4 border rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center ${
                isSaved
                  ? 'border-[#a65b32] bg-[#a65b32]/5 text-[#a65b32]'
                  : 'border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700'
              }`}
            >
              {isSaved ? (
                <HeartSolid className="h-6 w-6 text-[#a65b32]" />
              ) : (
                <HeartOutline className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Accordion Blocks */}
          <div className="border-t border-gray-100 mt-4 text-left">
            
            {/* The Story */}
            <div className="border-b border-gray-100 py-4">
              <button
                onClick={() => toggleSection('story')}
                className="w-full flex items-center justify-between font-serif font-bold text-primary text-sm"
              >
                <span>The Story</span>
                {expandedSections.story ? (
                  <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedSections.story && (
                <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed text-gray-600 animate-slide-down">
                  {product.artisan_story || product.description}
                </p>
              )}
            </div>

            {/* Materials & Care */}
            <div className="border-b border-gray-100 py-4">
              <button
                onClick={() => toggleSection('materials')}
                className="w-full flex items-center justify-between font-serif font-bold text-primary text-sm"
              >
                <span>Materials & Care</span>
                {expandedSections.materials ? (
                  <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedSections.materials && (
                <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed text-gray-600 animate-slide-down">
                  Crafted using locally sourced raw materials and natural glazes. Handwash is highly recommended to preserve the unique finishes.
                </p>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="border-b border-gray-100 py-4">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between font-serif font-bold text-primary text-sm"
              >
                <span>Shipping & Returns</span>
                {expandedSections.shipping ? (
                  <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {expandedSections.shipping && (
                <p className="mt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed text-gray-600 animate-slide-down">
                  Every order is packed using sustainable, recycled padding. Ships in 2-4 business days. Returns are accepted on original state items.
                </p>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-100 mt-16 pt-10 text-left">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
            Customer Reviews
          </h2>
          {product.id && (
            <Link
              href={`/dashboard/products/${product.id}/detail/review`}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#3a5244] hover:bg-[#2b4235] text-white text-xs font-bold rounded-lg transition-all active:scale-95"
            >
              Write a Review
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {reviews.length === 0 ? (
            <div className="text-center py-8 bg-beige/5 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-sm text-gray-500">Be the first to share your thoughts about this craft!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  className="bg-white border border-outline-variant/60 rounded-2xl p-6 shadow-sm flex flex-col gap-2"
                  key={review.id}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-primary">
                      {review.name}
                    </p>
                    <div className="flex items-center">
                      {renderStars(review.rate)}
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 font-medium">
                    {moment(review.date).format("MMMM Do, YYYY")}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
