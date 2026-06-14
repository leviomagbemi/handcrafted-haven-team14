"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ShopHeader({ itemsCount }: { itemsCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategories = searchParams.get("categories")?.split(",") || [];
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const activeRating = searchParams.get("rating") || "";
  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "best-selling";

  // Check if any filters are active
  const hasFilters =
    activeCategories.length > 0 || minPrice || maxPrice || activeRating || query;

  // Handle Sort selection
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Helper to remove a single filter tag
  const removeCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const newCats = activeCategories.filter((c) => c !== cat);
    if (newCats.length > 0) {
      params.set("categories", newCats.join(","));
    } else {
      params.delete("categories");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const removePriceRange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const removeRating = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("rating");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const removeSearchQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full border-b border-gray-100 pb-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 font-sans text-xs text-gray-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-medium">Shop</span>
      </div>

      {/* Header Title and Sort Dropdown Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-xl">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary">
            Shop All Handcrafted
          </h1>
          <p className="font-sans text-sm text-gray-500 leading-relaxed">
            Discover unique, artisanal pieces curated with care. Every item tells a story of craftsmanship and dedication.
          </p>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0 font-sans text-sm">
          <label htmlFor="sort-select" className="text-gray-700">Sort by:</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 pr-8 font-semibold text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer hover:border-gray-300 transition-colors"
          >
            <option value="best-selling">Best Selling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Categories Pills */}
          {activeCategories.map((cat) => (
            <div
              key={cat}
              className="flex items-center gap-1.5 bg-[#f5f5f4] hover:bg-stone-200 text-stone-700 font-sans text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              onClick={() => removeCategory(cat)}
            >
              <span>{cat}</span>
              <XMarkIcon className="h-3.5 w-3.5 text-stone-500" />
            </div>
          ))}

          {/* Search Query Pill */}
          {query && (
            <div
              className="flex items-center gap-1.5 bg-[#f5f5f4] hover:bg-stone-200 text-stone-700 font-sans text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              onClick={removeSearchQuery}
            >
              <span>Search: "{query}"</span>
              <XMarkIcon className="h-3.5 w-3.5 text-stone-500" />
            </div>
          )}

          {/* Price Range Pill */}
          {(minPrice || maxPrice) && (
            <div
              className="flex items-center gap-1.5 bg-[#f5f5f4] hover:bg-stone-200 text-stone-700 font-sans text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              onClick={removePriceRange}
            >
              <span>
                Price: {minPrice ? `$${minPrice}` : "$0"} - {maxPrice ? `$${maxPrice}` : "∞"}
              </span>
              <XMarkIcon className="h-3.5 w-3.5 text-stone-500" />
            </div>
          )}

          {/* Rating Pill */}
          {activeRating && (
            <div
              className="flex items-center gap-1.5 bg-[#f5f5f4] hover:bg-stone-200 text-stone-700 font-sans text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              onClick={removeRating}
            >
              <span>Rating: {activeRating === "5" ? "5 Stars" : "4+ Stars"}</span>
              <XMarkIcon className="h-3.5 w-3.5 text-stone-500" />
            </div>
          )}

          {/* Clear All Link */}
          <button
            onClick={clearAllFilters}
            className="font-sans text-xs font-bold text-gray-500 hover:text-primary transition-colors underline cursor-pointer ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

// Inline fallback Link to avoid routing bundle issues in layout components
function Link({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
