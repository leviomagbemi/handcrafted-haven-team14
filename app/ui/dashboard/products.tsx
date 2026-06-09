"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Item } from "@/app/lib/definitions";
import { useCart } from "@/app/lib/cartContext";

export default function ProductGrid({ items }: { items: Item[] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Helper to get initials of the artisan
  const getInitials = (name?: string) => {
    if (!name) return "HH";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Helper to format price in cents to dollars without trailing .00 if integer
  const formatPrice = (price: number) => {
    const dollars = price / 100;
    return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
  };

  // Helper to get category tag styles based on DB category
  const getCategoryStyles = (cat: string) => {
    const c = cat.toLowerCase();
    if (c === "art" || c === "arts") {
      return "bg-[#fdf4e9] text-[#b45309]"; // Ceramics / Arts (warm amber/peach)
    }
    if (c === "textiles") {
      return "bg-[#ecfdf5] text-[#047857]"; // Textiles (mint green)
    }
    if (c === "accessories") {
      return "bg-[#fdf2f8] text-[#be185d]"; // Jewelry / Accessories (soft pink)
    }
    return "bg-[#f5f5f4] text-[#78716c]"; // Woodwork / Decor / default (stone gray)
  };

  // Helper to map DB category names to UI displayed names
  const displayCategoryName = (cat: string) => {
    const c = cat.toLowerCase();
    if (c === "art" || c === "arts") return "CERAMICS";
    if (c === "textiles") return "TEXTILES";
    if (c === "accessories") return "JEWELRY";
    if (c === "decor") return "WOODWORK";
    return cat.toUpperCase();
  };

  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-20">
        <p className="font-sans text-lg text-gray-500">No products found matching your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => {
        const isFav = isInWishlist(item.id);
        const displayCat = displayCategoryName(item.category);
        const catStyle = getCategoryStyles(item.category);

        return (
          <div
            key={item.id}
            className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Heart Favorite Button */}
            <button
              onClick={() => toggleWishlist({
                id: item.id,
                title: item.title,
                price: item.price,
                image_url: item.image_url,
                artisan_name: item.artisan_name
              })}
              className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-gray-600 transition-all hover:scale-110 active:scale-90"
              aria-label="Favorite"
            >
              {isFav ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIconOutline className="h-5 w-5 hover:text-red-500 transition-colors" />
              )}
            </button>

            {/* Product Image Area */}
            <Link
              href={`/dashboard/products/${item.id}/detail`}
              className="relative aspect-square w-full bg-stone-100 overflow-hidden border-b border-gray-100"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />

              {/* Category Tag Overlay */}
              <span
                className={`absolute bottom-4 left-4 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider ${catStyle}`}
              >
                {displayCat}
              </span>
            </Link>

            {/* Product Information Details */}
            <div className="p-5 flex flex-col justify-between flex-grow gap-4 text-left">
              <div className="flex justify-between items-start gap-4">
                <Link href={`/dashboard/products/${item.id}/detail`} className="flex-grow">
                  <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </Link>
                <span className="font-sans text-lg font-bold text-gray-900 shrink-0">
                  {formatPrice(item.price)}
                </span>
              </div>

              {/* Artisan Profile & Add to Cart Footer */}
              <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center border border-gray-200 font-serif text-[10px] font-bold text-gray-700 shadow-sm shrink-0">
                    {getInitials(item.artisan_name)}
                  </div>
                  <span className="font-sans text-xs font-semibold text-gray-600 line-clamp-1">
                    {item.artisan_name || "Unknown Artisan"}
                  </span>
                </div>

                <button
                  onClick={() => addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image_url: item.image_url,
                    artisan_name: item.artisan_name
                  })}
                  className="h-9 w-9 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center text-gray-600 transition-all active:scale-95"
                  aria-label="Add to cart"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
