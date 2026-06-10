import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ArtistGrid from "@/app/ui/dashboard/artisans";
import ArtisansFilters from "@/app/ui/dashboard/artisans-filters";
import { fetchFilteredArtisans } from "@/app/lib/data";
import { ArrowRightIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ProductsSkeleton } from "@/app/ui/skeletons";

// Header Hero Image
import potterHands from "@/public/images/sarah_jenkins_hands.png";

export const metadata: Metadata = {
  title: "Meet Our Artisans | Handcrafted Haven",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    craftType?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const craftType = resolvedSearchParams?.craftType || "All Crafts";

  // Fetch filtered list from DB
  const artisans = await fetchFilteredArtisans({ query, craftType });

  const suspenseKey = `${query}-${craftType}`;

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-16 font-sans">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 bg-[#efeeec]/30 rounded-2xl p-8 lg:p-12" aria-labelledby="hero-title">
        {/* Left Content Column */}
        <div className="flex flex-col items-start text-left gap-6 lg:w-1/2">
          <span className="inline-block bg-[#fdf2f8] text-[#be185d] font-sans text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
            Makers Collective
          </span>
          <h1 id="hero-title" className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#3a5244] leading-[1.15]">
            Meet Our <span className="font-serif italic font-normal text-gray-500">Artisans</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            A curated directory of master makers committed to heritage techniques and sustainable craft. From sun-drenched pottery studios to family-run textile mills, discover the hands behind your favorite pieces.
          </p>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3a5244] hover:bg-[#2b4235] text-white font-semibold rounded-md transition-all active:scale-[0.98] shadow-sm text-sm">
            Explore Stories
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Right Photo Column with Verified Card */}
        <div className="relative lg:w-1/2 w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
          <Image
            src={potterHands}
            alt="Potter hands shaping a spinning wet clay vase on a pottery wheel"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover"
          />

          {/* Floating Verified Card */}
          <div className="absolute bottom-6 left-6 right-6 lg:left-8 lg:bottom-8 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 flex items-start gap-3 text-left max-w-sm">
            <div className="h-8 w-8 rounded-full bg-[#3a5244]/10 text-[#3a5244] flex items-center justify-center border border-[#3a5244]/20 shrink-0">
              <CheckBadgeIcon className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-800">Artisan Verified</span>
              <p className="text-[11px] text-gray-500 italic leading-snug">
                &ldquo;We know the materials and the makers behind every piece we create.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="flex flex-col gap-6" aria-label="Search and Filter Artisans">
        <ArtisansFilters />

        {/* Artisan Grid Loader */}
        <Suspense key={suspenseKey} fallback={<ProductsSkeleton />}>
          <ArtistGrid artisans={artisans} />
        </Suspense>
      </section>

      {/* 3. DISCOVER MORE BUTTON */}
      <div className="flex justify-center -mt-4">
        <button className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#3a5244] px-6 py-3 rounded-md text-xs font-bold text-gray-600 hover:text-[#3a5244] transition-all active:scale-95 cursor-pointer bg-white">
          <ArrowPathIcon className="h-4 w-4" />
          Discover More Artisans
        </button>
      </div>

      {/* 4. ARE YOU A MAKER? CTA BANNER */}
      <section className="bg-[#3a5244] rounded-2xl py-16 px-8 text-center flex flex-col items-center gap-6 text-white" aria-labelledby="cta-title">
        <h2 id="cta-title" className="font-serif text-3xl font-bold tracking-tight !text-white">
          Are you a maker?
        </h2>
        <p className="font-sans text-sm text-white/80 max-w-xl leading-relaxed">
          Join our community of independent artisans and reach a global audience who values the story behind every piece.
        </p>
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          <Link
            href="/dashboard/registration"
            className="px-6 py-3 bg-[#a65b32] hover:bg-[#8e4c29] text-white text-xs font-bold rounded-md shadow-md transition-all active:scale-95 uppercase tracking-wide"
          >
            Apply to Join
          </Link>
          <Link
            href="/dashboard/artisans"
            className="px-6 py-3 border border-white/60 hover:bg-white/10 text-white text-xs font-bold rounded-md transition-all active:scale-95 uppercase tracking-wide"
          >
            Learn More
          </Link>
        </div>
      </section>

    </div>
  );
}