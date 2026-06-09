"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ArtisanGrid } from "@/app/lib/definitions";

export default function ArtistGrid({ artisans }: { artisans: ArtisanGrid[] }) {
  
  // Helper to map DB craft types to uppercase UI display categories
  const displayCraftType = (craft?: string) => {
    if (!craft) return "ARTISAN";
    return craft.toUpperCase();
  };

  if (!artisans || artisans.length === 0) {
    return (
      <div className="w-full text-center py-20 font-sans">
        <p className="text-lg text-gray-500">No artisans found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mt-8 font-sans">
      {artisans.map((artist, index) => {
        const displayCategory = displayCraftType(artist.craft_type);

        return (
          <div
            key={artist.id}
            className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Top-Left Verified Badge (on first card/Elena Rossi as shown in mockup) */}
            {index === 0 && (
              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-primary text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                <CheckBadgeIcon className="h-3.5 w-3.5" />
                Artisan
              </span>
            )}

            {/* Artisan Portrait Area */}
            <Link
              href={`/dashboard/artisans/${artist.id}`}
              className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden border-b border-gray-100"
            >
              <Image
                src={artist.image_url}
                alt={`${artist.name} portrait`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </Link>

            {/* Artisan Details Body */}
            <div className="p-6 flex flex-col justify-between flex-grow gap-4 text-left">
              <div className="flex flex-col gap-2">
                {/* Category Label */}
                <span className="text-[10px] font-bold tracking-wider text-secondary uppercase">
                  {displayCategory}
                </span>

                {/* Name & Studio Title */}
                <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                  {artist.name} <span className="font-sans text-gray-300 font-normal">|</span> <span className="font-serif italic font-normal text-gray-600 text-base">{artist.studio_name || "Independent"}</span>
                </h3>

                {/* Biography Quote */}
                <p className="text-sm text-gray-500 leading-relaxed italic mt-2">
                  &ldquo;{artist.story || "Crafting unique pieces with care and dedication."}&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4 border-t border-gray-100 pt-4">
                <Link
                  href={`/dashboard/artisans/${artist.id}`}
                  className="text-xs font-bold text-gray-700 hover:text-primary underline transition-colors"
                >
                  View Profile
                </Link>

                <Link
                  href={`/dashboard/categories?query=${encodeURIComponent(artist.name)}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/95 text-white text-xs font-semibold rounded-md transition-colors active:scale-95 shadow-sm"
                >
                  View Shop
                </Link>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}