import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HeartIcon, 
  PlusIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

// IMAGE IMPORTS FOR THE EXACT SECTIONS
import heroBg from "../public/images/artisanal_haven_hero.png";

// ARTISAN PORTRAITS
import elenaPortrait from "../public/images/elena_rostova_artisan.png";
import marcusPortrait from "../public/images/marcus_thorne_hands.png";
import sarahPortrait from "../public/images/sarah_jenkins_hands.png";

// PRODUCT IMAGES
import mugProduct from "../public/images/hand_thrown_ceramic_vase.png";
import blanketProduct from "../public/images/artisan_woven_wool_blanket.png";
import boardProduct from "../public/images/hand_carved_walnut_serving_board.png";
import ringProduct from "../public/images/raw_stone_signet_ring.png";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24 bg-background text-on-surface">
      
      {/* 1. HERO SECTION (Full-height backdropped support local artistry block) */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
        {/* Background Image with warm overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Warm artisanal ceramic studio filled with handcrafted pottery wares"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-85"
          />
          {/* Subtle nature-inspired gradients for editorial feeling */}
          <div className="absolute inset-0 bg-[#faf9f7]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center flex flex-col items-center gap-6">
          <h1 id="hero-title" className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-primary leading-[1.15] drop-shadow-sm">
            Support Local Artistry
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Discover unique, handcrafted pieces made with passion and purpose. Bring the warmth of authentic craftsmanship into your everyday life.
          </p>
          <div className="mt-4">
            <Link
              href="/dashboard/categories"
              className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-semibold rounded-full text-white bg-[#3a5244] hover:bg-[#2f4236] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md font-sans focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTISANS SECTION (Exactly matching the 3 columns in the image) */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-12" aria-labelledby="artisans-title">
        <div className="flex justify-between items-end border-b border-outline-variant/60 pb-6">
          <div className="flex flex-col gap-2 text-left">
            <h2 id="artisans-title" className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Featured Artisans
            </h2>
            <p className="font-sans text-sm text-on-surface-variant">
              Meet the hands behind the craft.
            </p>
          </div>
          <Link 
            href="/dashboard/artisans" 
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors font-sans focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            View all artisans
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Artisan 1: Elena Rostova */}
          <div className="flex flex-col bg-white border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
            <div className="relative aspect-[4/3] w-full bg-beige/35 overflow-hidden">
              <Image
                src={elenaPortrait}
                alt="Elena Rostova artisan weaver portrait"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#efeeec] flex items-center justify-center border border-outline-variant/60 font-serif text-xs font-bold text-primary shadow-sm">
                  HH
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">Elena Rostova</h3>
              </div>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed italic">
                &ldquo;Working with natural fibers connects me to the earth. Every piece I weave tells a story of patience and respect for traditional techniques passed down through generations.&rdquo;
              </p>
            </div>
          </div>

          {/* Artisan 2: Marcus Thorne */}
          <div className="flex flex-col bg-white border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
            <div className="relative aspect-[4/3] w-full bg-beige/35 overflow-hidden">
              <Image
                src={marcusPortrait}
                alt="Marcus Thorne wood sculptor hands carving"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#efeeec] flex items-center justify-center border border-outline-variant/60 font-serif text-xs font-bold text-primary shadow-sm">
                  HH
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">Marcus Thorne</h3>
              </div>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed italic">
                &ldquo;I source all my timber locally, ensuring that each fallen tree finds a second life as functional art. The grain dictates the final form of every bowl and board.&rdquo;
              </p>
            </div>
          </div>

          {/* Artisan 3: Sarah Jenkins */}
          <div className="flex flex-col bg-white border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
            <div className="relative aspect-[4/3] w-full bg-beige/35 overflow-hidden">
              <Image
                src={sarahPortrait}
                alt="Sarah Jenkins clay ceramist hands shaping"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#efeeec] flex items-center justify-center border border-outline-variant/60 font-serif text-xs font-bold text-primary shadow-sm">
                  HH
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">Sarah Jenkins</h3>
              </div>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed italic">
                &ldquo;Ceramics is a dialogue between intention and the unpredictable nature of fire. I embrace the perfect imperfections that make each glazed mug truly one-of-a-kind.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TRENDING NOW SECTION (Precisely matching the 4 grid product cards in the image) */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12" aria-labelledby="trending-title">
        <div className="text-center">
          <h2 id="trending-title" className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Trending Now
          </h2>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6" role="group" aria-label="Filter products by category">
            <button className="bg-[#efeeec] px-5 py-2 rounded-full font-sans text-xs font-semibold text-on-surface transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-pressed="true">
              All
            </button>
            <button className="bg-transparent px-5 py-2 rounded-full font-sans text-xs font-semibold text-on-surface-variant border border-outline-variant/60 hover:border-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-pressed="false">
              Ceramics
            </button>
            <button className="bg-transparent px-5 py-2 rounded-full font-sans text-xs font-semibold text-on-surface-variant border border-outline-variant/60 hover:border-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-pressed="false">
              Textiles
            </button>
            <button className="bg-transparent px-5 py-2 rounded-full font-sans text-xs font-semibold text-on-surface-variant border border-outline-variant/60 hover:border-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-pressed="false">
              Woodwork
            </button>
          </div>
        </div>

        {/* 4 Columns Products Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Speckled Sage Morning Mug */}
          <div className="group flex flex-col bg-white border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
            <button className="absolute top-4 right-4 z-10 h-8 w-8 min-h-0 min-w-0 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-on-surface/60 hover:text-secondary transition-all hover:scale-105 active:scale-95" aria-label="Favorite">
              <HeartIcon className="h-5 w-5" />
            </button>
            <div className="relative aspect-square w-full bg-[#efeeec]/35 overflow-hidden border-b border-outline-variant/40">
              <Image
                src={mugProduct}
                alt="Speckled Sage Morning Mug by Sarah Jenkins"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow gap-2 text-left relative">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[11px] font-semibold text-on-surface/50">Sarah Jenkins</span>
                <h3 className="font-serif text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                  Speckled Sage Morning Mug
                </h3>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-sans text-sm font-bold text-on-surface">$42.00</span>
                <button className="h-8 w-8 rounded-lg border border-outline-variant/75 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center text-primary/70 transition-all active:scale-95" aria-label="Add to cart">
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Earth Tone Linen Throw */}
          <div className="group flex flex-col bg-white border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
            <button className="absolute top-4 right-4 z-10 h-8 w-8 min-h-0 min-w-0 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-on-surface/60 hover:text-secondary transition-all hover:scale-105 active:scale-95" aria-label="Favorite">
              <HeartIcon className="h-5 w-5" />
            </button>
            <div className="relative aspect-square w-full bg-[#efeeec]/35 overflow-hidden border-b border-outline-variant/40">
              <Image
                src={blanketProduct}
                alt="Earth Tone Linen Throw by Elena Rostova"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow gap-2 text-left relative">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[11px] font-semibold text-on-surface/50">Elena Rostova</span>
                <h3 className="font-serif text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                  Earth Tone Linen Throw
                </h3>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-sans text-sm font-bold text-on-surface">$125.00</span>
                <button className="h-8 w-8 rounded-lg border border-outline-variant/75 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center text-primary/70 transition-all active:scale-95" aria-label="Add to cart">
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Walnut Artisan Board */}
          <div className="group flex flex-col bg-white border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
            <button className="absolute top-4 right-4 z-10 h-8 w-8 min-h-0 min-w-0 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-on-surface/60 hover:text-secondary transition-all hover:scale-105 active:scale-95" aria-label="Favorite">
              <HeartIcon className="h-5 w-5" />
            </button>
            <div className="relative aspect-square w-full bg-[#efeeec]/35 overflow-hidden border-b border-outline-variant/40">
              <Image
                src={boardProduct}
                alt="Walnut Artisan Board by Marcus Thorne"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow gap-2 text-left relative">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[11px] font-semibold text-on-surface/50">Marcus Thorne</span>
                <h3 className="font-serif text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                  Walnut Artisan Board
                </h3>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-sans text-sm font-bold text-on-surface">$85.00</span>
                <button className="h-8 w-8 rounded-lg border border-outline-variant/75 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center text-primary/70 transition-all active:scale-95" aria-label="Add to cart">
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Raw Stone Signet Ring */}
          <div className="group flex flex-col bg-white border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
            <button className="absolute top-4 right-4 z-10 h-8 w-8 min-h-0 min-w-0 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-on-surface/60 hover:text-secondary transition-all hover:scale-105 active:scale-95" aria-label="Favorite">
              <HeartIcon className="h-5 w-5" />
            </button>
            <div className="relative aspect-square w-full bg-[#efeeec]/35 overflow-hidden border-b border-outline-variant/40">
              <Image
                src={ringProduct}
                alt="Raw Stone Signet Ring by Luna Silverworks"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow gap-2 text-left relative">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[11px] font-semibold text-on-surface/50">Luna Silverworks</span>
                <h3 className="font-serif text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                  Raw Stone Signet Ring
                </h3>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-sans text-sm font-bold text-on-surface">$110.00</span>
                <button className="h-8 w-8 rounded-lg border border-outline-variant/75 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center text-primary/70 transition-all active:scale-95" aria-label="Add to cart">
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Explore All Button */}
        <div className="mt-4">
          <Link
            href="/dashboard/categories"
            className="inline-flex items-center justify-center px-10 py-3.5 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-sans text-xs font-semibold tracking-wider rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] uppercase"
          >
            Explore All Products
          </Link>
        </div>
      </section>

      {/* 4. VALUE PILLARS SECTION (Leaf/Shield, UserGroup, Check/Badge rounded icons) */}
      <section className="border-t border-outline-variant/50 bg-[#efeeec]/30 py-24" aria-label="Why Shop With Us">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
              {/* Eco Leaf Icon */}
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19c-3.866 0-7-3.134-7-7 0-3.866 3.134-7 7-7m0 14c3.866 0 7-3.134 7-7 0-3.866-3.134-7-7-7m0 14v-4m0-10C8.5 5 5 8.5 5 12c0 1.5.5 3 1.5 4.5m5.5-11c3.5 0 7 3.5 7 7c0 1.5-.5 3-1.5 4.5" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">Sustainable Practices</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-xs">
              Our artisans prioritize ethically sourced materials and low-impact creation processes to protect our planet.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
              <UserGroupIcon className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">Community First</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-xs">
              By shopping here, you directly support independent creators and help preserve traditional crafting skills.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
              <ShieldCheckIcon className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">Heirloom Quality</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-xs">
              We curate items designed not just for a season, but to be cherished and passed down through generations.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
