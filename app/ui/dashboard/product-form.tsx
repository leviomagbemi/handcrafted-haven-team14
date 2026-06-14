"use client";

import { ArtisanList } from "@/app/lib/definitions";
import Link from "next/link";
import Button from "@/app/ui/button";
import { createProduct } from "../../lib/actions";
import { useFormState } from "react-dom";

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
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-tan p-4 md:p-6 text-darkBrown">
        {/* Artisan */}
        <div className="mb-4">
          <label htmlFor="artisan_id" className="mb-2 block text-2xl font-medium">
            Choose Artist
          </label>
          <div className="relative">
            <select
              id="artisan_id"
              name="artisan_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-xl outline-2 placeholder:text-darkBrown"
              defaultValue=""
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
            <div id="artisan-error" aria-live="polite" aria-atomic="true">
              {state.errors?.artisan_id &&
                state.errors.artisan_id.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-2xl font-medium">
            Product Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-xl outline-2 placeholder:text-darkBrown"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-2xl font-medium">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            placeholder="Enter price"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-xl outline-2 placeholder:text-darkBrown"
            aria-describedby="price-error"
          />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-2xl font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-xl outline-2 placeholder:text-darkBrown"
            defaultValue=""
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
          <div id="category-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-2xl font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-xl outline-2 placeholder:text-darkBrown min-h-[120px]"
            aria-describedby="description-error"
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-2xl font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="text"
            placeholder="/arts/textile-dream.png"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-xl outline-2 placeholder:text-darkBrown"
            aria-describedby="image-error"
          />
          <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url &&
              state.errors.image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Status */}
        <fieldset className="mb-6">
          <legend className="mb-2 block text-2xl font-medium">Status</legend>
          <div className="rounded-md border border-gray-200 bg-white px-4 py-3">
            <div className="flex gap-6 justify-center">
              <div className="flex items-center">
                <input
                  id="available"
                  name="status"
                  type="radio"
                  value="available"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="available"
                  className="ml-2 cursor-pointer text-xl text-gray-700"
                >
                  Available
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="unavailable"
                  name="status"
                  type="radio"
                  value="unavailable"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="unavailable"
                  className="ml-2 cursor-pointer text-xl text-gray-700"
                >
                  Unavailable
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-evenly gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-green px-6 py-2 text-xl text-tan transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" className="bg-[#3a5244] hover:bg-[#2b4235] text-white">Create Product</Button>
      </div>
    </form>
  );
};