"use client";

import { ArtisanList } from "@/app/lib/definitions";
import Link from "next/link";
import Button from "@/app/ui/button";
import { createProduct } from "../../lib/actions";
import { useFormState } from "react-dom";

const category = [
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
  console.log(dispatch);
  return (
    <form action={dispatch}>
      <div className=" rounded-md bg-tan p-4 md:p-6 text-darkBrown">
        {/* Artisan Name */}
        <div className="mb-4">
          <label htmlFor="artist" className="mb-2 block text-2xl">
            Choose Artist
          </label>
          <div className="relative">
            <select
              id="artisan_id"
              name="artisan_id"
              className="peer block w-full cursor-pointer rounded-md border  border-gray-200 py-2 pl-10 text-xl outline-2 placeholder:text-darkBrown"
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
            Enter a Product Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                placeholder="Enter Title"
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
          </div>
        </div>
        {/* Price */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-2xl font-medium">
            Enter a Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step=".01"
                placeholder="Enter Price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-xl outline-2 placeholder:text-darkBrown"
                aria-describedby="price-error"
              />
            </div>
          </div>
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
        <label htmlFor="artist" className="mb-2 block text-2xl">
          Choose a Category
        </label>
        <div className="mb-4">
          <select
            id="category"
            name="category"
            className="peer block w-full cursor-pointer rounded-md border  border-gray-200 py-2 pl-10 text-xl outline-2 placeholder:text-darkBrown"
            defaultValue=""
            aria-describedby="category-error"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
          <label htmlFor="title" className="mb-2 block text-2xl font-medium">
            Enter a Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Enter item description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-xl outline-2 placeholder:text-darkBrown"
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
          </div>
        </div>
        {/* Image */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-2xl font-medium">
            Enter a URL for the image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image_url"
                name="image_url"
                type="string"
                placeholder="Enter url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-xl outline-2 placeholder:text-darkBrown"
                aria-describedby="image-error"
              />
            </div>
            <div id="image-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/*  Status */}
        <fieldset>
          <legend className="mb-2 block text-2xl font-medium">
            Set the status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4 justify-evenly">
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
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-tan bg-opacity-50 px-3 py-1.5 text-xl  text-gray-600"
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
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-tan bg-opacity-50 px-3 py-1.5 text-xl  text-gray-600"
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
          className="flex h-10 items-center rounded-lg bg-green px-6  py-2 text-xl text-tan transition-colors self-center hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}
