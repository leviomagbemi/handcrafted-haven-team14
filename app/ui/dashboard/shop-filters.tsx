"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

export default function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Categories
  const categoriesList = ["Ceramics", "Textiles", "Jewelry", "Woodwork"];
  const activeCategories = searchParams.get("categories")?.split(",") || [];

  // Price
  const [minPriceInput, setMinPriceInput] = useState(searchParams.get("minPrice") || "");
  const [maxPriceInput, setMaxPriceInput] = useState(searchParams.get("maxPrice") || "");

  // Rating
  const activeRating = searchParams.get("rating") || "";

  // Update categories query param (as single selection radio)
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isCurrent = activeCategories.includes(category);

    if (isCurrent) {
      params.delete("categories");
    } else {
      params.set("categories", category);
    }
    params.set("page", "1"); // Reset pagination on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  // Update rating query param
  const handleRatingChange = (ratingVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeRating === ratingVal) {
      params.delete("rating");
    } else {
      params.set("rating", ratingVal);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Debounce and sync price range changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (minPriceInput) {
        params.set("minPrice", minPriceInput);
      } else {
        params.delete("minPrice");
      }

      if (maxPriceInput) {
        params.set("maxPrice", maxPriceInput);
      } else {
        params.delete("maxPrice");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [minPriceInput, maxPriceInput]);

  // Sync inputs with URL changes (e.g. on "Clear all")
  useEffect(() => {
    setMinPriceInput(searchParams.get("minPrice") || "");
    setMaxPriceInput(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-8 text-left">
      {/* Category Filter */}
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-8">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500">
          Category
        </h2>
        <div className="flex flex-col gap-3.5">
          {categoriesList.map((cat) => {
            const isChecked = activeCategories.includes(cat);
            return (
              <label key={cat} className="!flex items-center gap-3.5 !mb-0 !font-normal cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={isChecked}
                  onClick={(e) => {
                    // Toggle off if clicking the already selected category
                    if (isChecked) {
                      e.preventDefault();
                      handleCategoryChange(cat);
                    }
                  }}
                  onChange={() => {
                    if (!isChecked) {
                      handleCategoryChange(cat);
                    }
                  }}
                  className="peer sr-only"
                />
                <div
                  className={`h-[18px] w-[18px] rounded-full flex items-center justify-center transition-all duration-150
                    peer-focus-visible:ring-2 peer-focus-visible:ring-slate-950 peer-focus-visible:ring-offset-1
                    ${isChecked 
                      ? "border-2 border-slate-950 bg-white" 
                      : "border border-slate-300 bg-white group-hover:border-slate-400"
                    }`}
                >
                  {isChecked && (
                    <div className="h-2 w-2 rounded-full bg-slate-950" />
                  )}
                </div>
                <span className="font-sans text-sm text-slate-700 group-hover:text-slate-950 transition-colors">
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-8">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500">
          Price Range
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-grow">
            <label htmlFor="min-price" className="sr-only">Minimum Price</label>
            <input
              id="min-price"
              type="number"
              placeholder="$ Min"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white font-sans text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-0 transition-colors shadow-none"
            />
          </div>
          <span className="text-slate-400 font-sans text-sm">-</span>
          <div className="relative flex-grow">
            <label htmlFor="max-price" className="sr-only">Maximum Price</label>
            <input
              id="max-price"
              type="number"
              placeholder="$ Max"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white font-sans text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-0 transition-colors shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col gap-5">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500">
          Rating
        </h2>
        <div className="flex flex-col gap-3.5">
          {/* 5 Stars Option */}
          <button
            onClick={() => handleRatingChange("5")}
            className="flex items-center gap-3 cursor-pointer text-left w-full group"
          >
            <div className="flex items-center justify-center relative">
               <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${activeRating === "5" ? "border-primary" : "border-gray-300 group-hover:border-primary"}`}>
                 <div className={`h-2.5 w-2.5 rounded-full bg-primary transition-opacity ${activeRating === "5" ? "opacity-100" : "opacity-0"}`} />
               </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <span className={`font-sans text-sm transition-colors ${activeRating === "5" ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>
                5 Stars Only
              </span>
            </div>
          </button>

          {/* 4 Stars & Up Option */}
          <button
            onClick={() => handleRatingChange("4")}
            className="flex items-center gap-3 cursor-pointer text-left w-full group"
          >
             <div className="flex items-center justify-center relative">
               <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${activeRating === "4" ? "border-primary" : "border-gray-300 group-hover:border-primary"}`}>
                 <div className={`h-2.5 w-2.5 rounded-full bg-primary transition-opacity ${activeRating === "4" ? "opacity-100" : "opacity-0"}`} />
               </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 text-amber-400" />
                ))}
                <StarIconOutline className="h-4 w-4 text-amber-400 opacity-50" />
              </div>
              <span className={`font-sans text-sm transition-colors ${activeRating === "4" ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>
                4 Stars & Up
              </span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
