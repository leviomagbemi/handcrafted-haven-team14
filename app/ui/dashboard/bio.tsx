// app/ui/dashboard/bio.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  getSingleArtisan,
  fetchArtistItems,
} from "@/app/lib/data";

interface ArtistDetailProps {
  id: string;
}

export default async function ArtistDetail({
  id,
}: ArtistDetailProps) {
  // Fetch artisan information
  const details = await getSingleArtisan(id);

  // Fetch artisan products
  const items = await fetchArtistItems(id);

  // If artisan does not exist
  if (!details) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center font-sans">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          Artisan not found
        </h1>
        <p className="text-gray-500 mb-8">The maker you are looking for does not exist or has been removed.</p>
        <Link
          href="/dashboard/artisans"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#3a5244] hover:bg-[#2b4235] text-white font-semibold rounded-md transition-all active:scale-95 text-sm"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Directory
        </Link>
      </div>
    );
  }

  // Format currency helper
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-16 font-sans text-left">
      
      {/* 1. BACK BUTTON */}
      <div className="flex justify-start">
        <Link
          href="/dashboard/artisans"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-wider group"
        >
          <ArrowLeftIcon className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </Link>
      </div>

      {/* 2. ARTISAN PROFILE CARD (2 Columns on large screens) */}
      <section className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 bg-[#efeeec]/30 rounded-2xl p-8 lg:p-12 border border-gray-100">
        
        {/* Profile Image Column */}
        <div className="relative w-full lg:w-[380px] aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden shadow-md shrink-0 bg-stone-100">
          <Image
            src={details.image_url || '/images/default-artisan.jpg'}
            alt={`${details.name} portrait`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover"
          />
          {/* Verified Badge */}
          <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <CheckBadgeIcon className="h-3.5 w-3.5" />
            Verified Artisan
          </span>
        </div>

        {/* Profile Text Details Column */}
        <div className="flex flex-col justify-between items-start text-left flex-grow gap-6 lg:py-2">
          <div className="flex flex-col gap-4 w-full">
            {/* Craft category label pill */}
            <span className="inline-block self-start text-xs font-bold tracking-widest text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full">
              {details.craft_type ? details.craft_type.toUpperCase() : "ARTISAN"}
            </span>

            {/* Name and Studio */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              {details.name}
            </h1>
            
            {details.studio_name && (
              <p className="font-serif italic font-normal text-gray-500 text-lg sm:text-xl -mt-2">
                Owner of {details.studio_name}
              </p>
            )}

            {/* Premium Divider */}
            <div className="h-px bg-gray-200 w-24 my-2" />

            {/* Story/Biography */}
            <div className="relative pl-6 py-2 border-l-2 border-primary/20">
              <span className="absolute left-0 top-0 text-3xl font-serif text-primary/30 leading-none">&ldquo;</span>
              <p className="text-gray-600 text-base leading-relaxed italic pr-2 font-sans">
                {details.story || "Dedicated to preserving traditional crafting methods and creating timeless pieces of functional beauty."}
              </p>
            </div>
          </div>

          {/* Action Link to their catalog section */}
          <div className="mt-4 w-full">
            <Link
              href={`/dashboard/categories?query=${encodeURIComponent(details.name)}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#3a5244] hover:bg-[#2b4235] text-white text-xs font-semibold rounded-md shadow-sm transition-colors active:scale-95 uppercase tracking-wider"
            >
              Shop All Creations
            </Link>
          </div>
        </div>

      </section>

      {/* 3. ARTISAN CREATIONS GRID SECTION */}
      <section className="flex flex-col gap-8">
        <div className="border-b border-gray-200 pb-4 flex justify-between items-end">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Artist Creations
          </h2>
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            {items.length} {items.length === 1 ? "Item" : "Items"} Available
          </span>
        </div>

        {items.length === 0 ? (
          <div className="w-full text-center py-12 bg-white border border-gray-100 rounded-xl">
            <p className="text-gray-500 text-sm">No creations are currently available in the shop from this artist.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/products/${item.id}/detail`}
                className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden bg-stone-50 border-b border-gray-100">
                  <Image
                    src={item.image_url || "/images/blank-box.png"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {item.status && item.status !== "available" && (
                    <span className="absolute top-3 right-3 bg-gray-950/85 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Product Metadata Info */}
                <div className="p-5 flex flex-col gap-2 flex-grow text-left">
                  <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">
                    {item.category || "CREATION"}
                  </span>
                  
                  <h3 className="font-serif font-bold text-gray-900 text-lg group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-gray-700 mt-auto pt-2">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}