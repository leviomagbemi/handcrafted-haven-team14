"use client";

import React, { useState } from "react";
import { ArtisanList } from "@/app/lib/definitions";
import Link from "next/link";
import { createProduct } from "../../lib/actions";
import { useFormState } from "react-dom";
import { useAuth } from "@/app/lib/authContext";
import { PhotoIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";

const categories = [
  { id: "decor", name: "Home Decor" },
  { id: "accessories", name: "Accessories" },
  { id: "art", name: "Art" },
  { id: "textiles", name: "Textiles" },
];

export default function AddProductForm({
  artisans,
}: {
  artisans: ArtisanList[];
}) {
  const { user } = useAuth();
  const isArtisan = user && user.role === 'artisan';
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);

  // Dynamic state for live preview
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("available");
  const [artisanId, setArtisanId] = useState(isArtisan ? user.id : "");

  // Determine selected artisan's name for preview
  const selectedArtisanName = isArtisan
    ? user.name
    : (artisans.find((a) => a.id === artisanId)?.name || "Selected Artisan");

  const getInitials = (name?: string) => {
    if (!name) return "HH";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getCategoryStyles = (cat: string) => {
    const c = cat.toLowerCase();
    if (c === "art" || c === "arts") return "bg-[#fdf4e9] text-[#b45309]"; // Ceramics
    if (c === "textiles") return "bg-[#ecfdf5] text-[#047857]"; // Textiles
    if (c === "accessories") return "bg-[#fdf2f8] text-[#be185d]"; // Jewelry
    if (c === "decor") return "bg-[#f5f5f4] text-[#57534e]"; // Woodwork
    return "bg-gray-100 text-gray-500";
  };

  const displayCategoryName = (cat: string) => {
    const c = cat.toLowerCase();
    if (c === "art" || c === "arts") return "CERAMICS";
    if (c === "textiles") return "TEXTILES";
    if (c === "accessories") return "JEWELRY";
    if (c === "decor") return "WOODWORK";
    return cat.toUpperCase() || "CATEGORY";
  };

  const inputClass = (field: string) =>
    `block w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white outline-none transition-all duration-200 ${
      state.errors?.[field as keyof typeof state.errors]
        ? "border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 bg-gray-50/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Form Section */}
      <div className="lg:col-span-2">
        <form action={dispatch} className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 md:p-8 flex flex-col gap-6">
          {state.message && (
            <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
              <span className="shrink-0 mt-0.5">⚠</span>
              <span>{state.message}</span>
            </div>
          )}

          {/* Artisan selection */}
          {isArtisan ? (
            <div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                Artist
              </span>
              <div className="flex items-center gap-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 font-medium select-none">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif text-xs font-bold shrink-0">
                  {getInitials(user.name)}
                </div>
                <span>{user.name} (You)</span>
              </div>
              <input type="hidden" name="artisan_id" value={user.id} />
            </div>
          ) : (
            <div>
              <label htmlFor="artisan_id" className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                Choose Artist
              </label>
              <div className="relative">
                <select
                  id="artisan_id"
                  name="artisan_id"
                  className={inputClass("artisan_id")}
                  value={artisanId}
                  onChange={(e) => setArtisanId(e.target.value)}
                  aria-describedby="artisan-error"
                >
                  <option value="" disabled>
                    Select an artist
                  </option>
                  {artisans.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
                {state.errors?.artisan_id && (
                  <p id="artisan-error" role="alert" className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                    ✕ {state.errors.artisan_id[0]}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Product Title */}
          <div>
            <label htmlFor="title" className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
              Product Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Handwoven Cotton Throw Pillow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass("title")}
              aria-describedby="title-error"
            />
            {state.errors?.title && (
              <p id="title-error" role="alert" className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                ✕ {state.errors.title[0]}
              </p>
            )}
          </div>

          {/* Price & Category (Two columns on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label htmlFor="price" className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold select-none">$</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`${inputClass("price")} pl-8`}
                  aria-describedby="price-error"
                />
              </div>
              {state.errors?.price && (
                <p id="price-error" role="alert" className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                  ✕ {state.errors.price[0]}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass("category")}
                aria-describedby="category-error"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {state.errors?.category && (
                <p id="category-error" role="alert" className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                  ✕ {state.errors.category[0]}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Tell the story behind this item, the materials used, and details of craftsmanship..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass("description")} min-h-[140px] resize-y`}
              aria-describedby="description-error"
            />
            {state.errors?.description && (
              <p id="description-error" role="alert" className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                ✕ {state.errors.description[0]}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image_url" className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
              Image URL
            </label>
            <input
              id="image_url"
              name="image_url"
              type="text"
              placeholder="e.g. /arts/textile-dream.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass("image_url")}
              aria-describedby="image-error"
            />
            {state.errors?.image_url && (
              <p id="image-error" role="alert" className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                ✕ {state.errors.image_url[0]}
              </p>
            )}
          </div>

          {/* Status */}
          <fieldset>
            <legend className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
              Availability Status
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Available Option */}
              <label
                htmlFor="status-available"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                  status === "available"
                    ? "border-primary bg-primary/[0.04] text-primary font-medium"
                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                }`}
              >
                <input
                  id="status-available"
                  name="status"
                  type="radio"
                  value="available"
                  checked={status === "available"}
                  onChange={() => setStatus("available")}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-primary focus:ring-primary focus:ring-2"
                />
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold">Available for Sale</span>
                  <span className="text-xxs text-gray-500 mt-0.5">Product will be active and purchasable in the shop.</span>
                </span>
              </label>

              {/* Unavailable Option */}
              <label
                htmlFor="status-unavailable"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                  status === "unavailable"
                    ? "border-[#94492d] bg-[#94492d]/[0.04] text-[#94492d] font-medium"
                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                }`}
              >
                <input
                  id="status-unavailable"
                  name="status"
                  type="radio"
                  value="unavailable"
                  checked={status === "unavailable"}
                  onChange={() => setStatus("unavailable")}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-primary focus:ring-primary focus:ring-2"
                />
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold">Unavailable</span>
                  <span className="text-xxs text-gray-500 mt-0.5">Draft status. Hidden from browse results.</span>
                </span>
              </label>
            </div>
            {state.errors?.status && (
              <p role="alert" className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
                ✕ {state.errors.status[0]}
              </p>
            )}
          </fieldset>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6 mt-2">
            <Link
              href="/dashboard/account"
              className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center items-center px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/95 active:scale-[0.98] transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview Column */}
      <div className="lg:col-span-1 lg:sticky lg:top-24 flex flex-col gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 self-start mb-4">
            <SparklesIcon className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-sm font-bold text-gray-800 uppercase tracking-wider">Live Card Preview</h3>
          </div>

          {/* Product Grid Card Replica */}
          <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative w-full select-none pointer-events-none">
            {/* Heart Favorite Button */}
            <div className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>

            {/* Image Box */}
            <div className="relative aspect-square w-full bg-stone-100 overflow-hidden border-b border-gray-100 flex items-center justify-center">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt=""
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a8a29e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'/%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-stone-400">
                  <PhotoIcon className="h-10 w-10 text-stone-300 mb-2" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-stone-500">Image Preview</span>
                  <span className="text-[9px] mt-1 text-stone-400">Enter a URL to preview</span>
                </div>
              )}

              {/* Category Tag Overlay */}
              <span className={`absolute bottom-4 left-4 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider ${getCategoryStyles(category)}`}>
                {displayCategoryName(category)}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col justify-between flex-grow gap-4 text-left">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-serif text-base font-bold text-gray-900 line-clamp-2 leading-snug">
                  {title || "Untitled Product"}
                </h3>
                <span className="font-sans text-base font-bold text-gray-900 shrink-0">
                  {price && !isNaN(Number(price)) ? `$${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0.00"}
                </span>
              </div>
            </div>

            {/* Footer with Artisan Info */}
            <div className="px-5 pb-5 flex justify-between items-center mt-auto border-t border-gray-100 pt-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center border border-gray-200 font-serif text-xs font-bold text-gray-700 shadow-sm shrink-0">
                  {getInitials(selectedArtisanName)}
                </div>
                <span className="font-sans text-xs font-semibold text-gray-600 line-clamp-1">
                  {selectedArtisanName}
                </span>
              </div>

              <div className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                <PlusIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Informative Tip */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 text-stone-600 text-xs flex flex-col gap-2">
          <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            💡 Style Tips
          </h4>
          <p className="leading-relaxed">
            Choose high-quality photos with natural lighting. Short, evocative descriptions detailing your creative process build stronger connections with potential buyers.
          </p>
        </div>
      </div>
    </div>
  );
}