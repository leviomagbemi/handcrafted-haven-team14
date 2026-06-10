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

  // Update categories query param
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newCats = [...activeCategories];
    if (newCats.includes(category)) {
      newCats = newCats.filter((c) => c !== category);
    } else {
      newCats.push(category);
    }

    if (newCats.length > 0) {
      params.set("categories", newCats.join(","));
    } else {
      params.delete("categories");
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
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-700">
          Category
        </h2>
        <div className="flex flex-col gap-3">
          {categoriesList.map((cat) => {
            const isChecked = activeCategories.includes(cat);
            return (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryChange(cat)}
                  className="h-4.5 w-4.5 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                />
                <span className="font-sans text-sm text-gray-700 group-hover:text-primary transition-colors">
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-700">
          Price Range
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <label htmlFor="min-price" className="sr-only">Minimum Price</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-sans text-sm">
              $
            </span>
            <input
              id="min-price"
              type="number"
              placeholder="Min"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-full pl-7 pr-3 py-2 rounded-md border border-gray-200 font-sans text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <span className="text-gray-400 font-sans text-sm">-</span>
          <div className="relative flex-grow">
            <label htmlFor="max-price" className="sr-only">Maximum Price</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-sans text-sm">
              $
            </span>
            <input
              id="max-price"
              type="number"
              placeholder="Max"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-full pl-7 pr-3 py-2 rounded-md border border-gray-200 font-sans text-sm text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col gap-4">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-700">
          Rating
        </h2>
        <div className="flex flex-col gap-3">
          {/* 5 Stars Option */}
          <button
            onClick={() => handleRatingChange("5")}
            className="flex items-center gap-2 cursor-pointer text-left w-full group"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-amber-400" />
              ))}
            </div>
            <span className={`font-sans text-sm transition-colors ${activeRating === "5" ? "text-primary font-semibold" : "text-gray-600 group-hover:text-primary"}`}>
              5 Stars Only
            </span>
          </button>

          {/* 4 Stars & Up Option */}
          <button
            onClick={() => handleRatingChange("4")}
            className="flex items-center gap-2 cursor-pointer text-left w-full group"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(4)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-amber-400" />
              ))}
              <StarIconOutline className="h-4 w-4 text-gray-300" />
            </div>
            <span className={`font-sans text-sm transition-colors ${activeRating === "4" ? "text-primary font-semibold" : "text-gray-600 group-hover:text-primary"}`}>
              4 Stars & Up
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
