"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ArtisansFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("query") || "");
  const activeCraftType = searchParams.get("craftType") || "All Crafts";

  const craftTypesList = ["All Crafts", "Ceramics", "Woodworking", "Textiles", "Jewelry"];

  // Handle craft type selection
  const handleCraftTypeClick = (craft: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("craftType", craft);
    params.set("page", "1"); // Reset pagination
    router.push(`${pathname}?${params.toString()}`);
  };

  // Debounced search query update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchInput) {
        params.set("query", searchInput);
      } else {
        params.delete("query");
      }
      params.set("page", "1"); // Reset pagination
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync state if URL is updated externally
  useEffect(() => {
    setSearchInput(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 w-full py-4 border-b border-gray-100 font-sans">
      
      {/* Search Input */}
      <div className="relative w-full lg:max-w-md">
        <input
          type="text"
          placeholder="Search by artisan or studio name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="peer block w-full rounded-full border border-gray-200 py-[10px] pl-11 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-gray-900 transition-colors" />
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 w-full lg:w-auto shrink-0">
        {craftTypesList.map((craft) => {
          const isActive = activeCraftType === craft;
          return (
            <button
              key={craft}
              onClick={() => handleCraftTypeClick(craft)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all active:scale-[0.97] cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {craft}
            </button>
          );
        })}
      </div>

    </div>
  );
}
