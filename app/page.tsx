import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckBadgeIcon, 
  SparklesIcon, 
  HeartIcon, 
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

// CURATED STATIC IMAGES FOR THE LANDING PAGE
import heroImage from "/public/images/artisanal_haven_hero.png";
import vaseImage from "/public/images/hand_thrown_ceramic_vase.png";
import blanketImage from "/public/images/artisan_woven_wool_blanket.png";
import boardImage from "/public/images/hand_carved_walnut_serving_board.png";

// CATEGORIES IMAGES (ALREADY PRESENT IN PROJECT)
import decorCat from "/public/images/homedecor.png";
import textilesCat from "/public/images/textiles.png";
import artCat from "/public/images/art.png";
import accessoriesCat from "/public/images/accessories.png";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24 bg-background text-on-surface">
      
      {/* 1. HERO SECTION (Editorial, sun-drenched, spacious) */}
      <section className="relative overflow-hidden bg-beige/45 py-20 lg:py-28" aria-labelledby="hero-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary tracking-wider uppercase font-sans">
              <SparklesIcon className="h-4 w-4" />
              Verified Handcrafted Haven
            </div>
            <h1 id="hero-title" className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-on-surface leading-[1.1]">
              Human-Centric <br />
              <span className="text-primary italic font-normal font-serif">Artisanal Craft</span>
            </h1>
            <p className="font-sans text-lg sm:text-xl text-on-surface/85 leading-relaxed max-w-xl">
              Bridging the gap between raw, tactile artistry and refined home aesthetics. 
              We source and verify the finest pieces handmade by independent master artisans around the globe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/dashboard/categories"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-primary hover:bg-primary-container transition-colors shadow-md shadow-primary/10 font-sans"
              >
                Shop Collection
              </Link>
              <Link
                href="/dashboard/story"
                className="inline-flex items-center justify-center px-6 py-3 border border-outline hover:border-primary text-base font-semibold rounded-md text-on-surface hover:text-primary transition-colors font-sans"
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>

          {/* Hero Visual Image (Generated Editorial Masterpiece) */}
          <div className="lg:col-span-6">
            <div className="relative h-[400px] sm:h-[500px] w-full rounded-2xl overflow-hidden border border-outline-variant/60 shadow-2xl shadow-on-surface/5 group">
              <Image
                src={heroImage}
                alt="Beautiful curated handcrafted clay pottery and wool blanket styling"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. BRAND VALUES SECTION (Standard boutique features) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Our Philosophy">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-4 p-8 rounded-xl bg-white border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CheckBadgeIcon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">100% Authentic Handcraft</h3>
            <p className="font-sans text-sm text-on-surface/80 leading-relaxed">
              Every single product listed on our platform is verified as entirely handmade by independent artisans, rejecting mass manufacturing.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-8 rounded-xl bg-white border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">Sustainable Materials</h3>
            <p className="font-sans text-sm text-on-surface/80 leading-relaxed">
              We prioritize organic, sustainable, and locally sourced materials, ensuring low environmental impact and healthy home utility.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-8 rounded-xl bg-white border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HeartIcon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold">Intentional Softness</h3>
            <p className="font-sans text-sm text-on-surface/80 leading-relaxed">
              Celebrating unique characteristics and minor irregularities that define human craftsmanship, creating warmth in your physical spaces.
            </p>
          </div>

        </div>
      </section>

      {/* 3. BROWSE BY CATEGORY SECTION (Standard Next.js Link Structure) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12" aria-labelledby="category-title">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <h2 id="category-title" className="font-serif text-3xl sm:text-4xl font-bold">Browse by Category</h2>
          <p className="font-sans text-sm sm:text-base text-on-surface/80">
            Explore authentic wares organized by craft type. Every category houses unique artisan stories and creations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Decor Category Card */}
          <Link href="/dashboard/categories/Decor" className="group flex flex-col gap-4 text-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant bg-white">
              <Image
                src={decorCat}
                alt="Beautiful home decor handcrafted items"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1">
              Home Decor
              <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>

          {/* Textiles Category Card */}
          <Link href="/dashboard/categories/textiles" className="group flex flex-col gap-4 text-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant bg-white">
              <Image
                src={textilesCat}
                alt="Finely woven blankets and natural linen textiles"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1">
              Textiles
              <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>

          {/* Art Category Card */}
          <Link href="/dashboard/categories/art" className="group flex flex-col gap-4 text-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant bg-white">
              <Image
                src={artCat}
                alt="Art and framed prints handmade by independent illustrators"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1">
              Art & Prints
              <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>

          {/* Accessories Category Card */}
          <Link href="/dashboard/categories/accessories" className="group flex flex-col gap-4 text-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant bg-white">
              <Image
                src={accessoriesCat}
                alt="Artisanal personal and home decorative accessories"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1">
              Accessories
              <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION (High-end product showcase cards) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12" aria-labelledby="featured-title">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-outline-variant pb-6">
          <div className="flex flex-col gap-2">
            <h2 id="featured-title" className="font-serif text-3xl sm:text-4xl font-bold">Featured Creations</h2>
            <p className="font-sans text-sm sm:text-base text-on-surface/85 max-w-lg">
              Explore outstanding works representing exceptional design, texture, and organic craft.
            </p>
          </div>
          <Link 
            href="/dashboard/categories" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            Explore all products
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Vase */}
          <div className="group flex flex-col bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square w-full bg-beige/35 overflow-hidden">
              <Image
                src={vaseImage}
                alt="Hand-thrown sage green clay vase with natural organic waves"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <span className="font-sans text-xs font-semibold text-primary uppercase tracking-widest">Decor</span>
              <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                Hand-Thrown Sage Green Vase
              </h3>
              <p className="font-sans text-sm text-on-surface/80 leading-relaxed line-clamp-2">
                Meticulously spun from high-fire local red clay and dipped in our signature semi-matte sage glaze.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-sans text-lg font-bold">$85.00</span>
                <span className="text-xs font-bold text-secondary tracking-widest uppercase group-hover:text-primary transition-colors">
                  View Detail
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Blanket */}
          <div className="group flex flex-col bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square w-full bg-beige/35 overflow-hidden">
              <Image
                src={blanketImage}
                alt="Thick heavy handwoven wool blanket in warm terracotta and sand colored stripes"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <span className="font-sans text-xs font-semibold text-primary uppercase tracking-widest">Textiles</span>
              <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                Artisan Terracotta Wool Blanket
              </h3>
              <p className="font-sans text-sm text-on-surface/80 leading-relaxed line-clamp-2">
                Handwoven on traditional floor looms in pure local organic wool. Provides substantial warmth and weighted texture.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-sans text-lg font-bold">$120.00</span>
                <span className="text-xs font-bold text-secondary tracking-widest uppercase group-hover:text-primary transition-colors">
                  View Detail
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Woodboard */}
          <div className="group flex flex-col bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square w-full bg-beige/35 overflow-hidden">
              <Image
                src={boardImage}
                alt="Minimalist product photo of a solid walnut wood carving board with organic edges"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <span className="font-sans text-xs font-semibold text-primary uppercase tracking-widest">Accessories</span>
              <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                Hand-Carved Walnut Serving Board
              </h3>
              <p className="font-sans text-sm text-on-surface/80 leading-relaxed line-clamp-2">
                Naturally cured, single-slab solid walnut wood. Features soft organic sanded edges and deep, polished grain.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-sans text-lg font-bold">$65.00</span>
                <span className="text-xs font-bold text-secondary tracking-widest uppercase group-hover:text-primary transition-colors">
                  View Detail
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ARTISAN SPOTLIGHT SECTION (Elena Rossi story card) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="spotlight-title">
        <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-lg shadow-on-surface/5 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Spotlight Story */}
          <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col gap-6 justify-center text-left">
            <span className="font-sans text-xs font-semibold text-primary uppercase tracking-widest">
              Artisan Spotlight
            </span>
            <h2 id="spotlight-title" className="font-serif text-3xl sm:text-4xl font-bold">
              Elena Rossi
            </h2>
            <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-semibold text-secondary">
              Verified Seller
            </div>
            <blockquote className="font-serif text-lg sm:text-xl italic text-on-surface/90 leading-relaxed relative pl-4 border-l-2 border-primary">
              &ldquo;Every single bowl and vase I spin carries a part of my story, a conversation with the natural clay and a moment of patient craft.&rdquo;
            </blockquote>
            <p className="font-sans text-sm sm:text-base text-on-surface/80 leading-relaxed">
              Elena Rossi operates an independent ceramic studio nestled in the clay-rich hills of Tuscany. 
              With over fifteen years of traditional training, she combines classic throwing techniques with modern, mineral-rich soft sage green glazes exclusive to Handcrafted Haven.
            </p>
            <div className="mt-4">
              <Link 
                href="/dashboard/story" 
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-md text-white bg-primary hover:bg-primary-container transition-colors shadow-md shadow-primary/10"
              >
                Read Elena&apos;s Full Story
              </Link>
            </div>
          </div>

          {/* Spotlight Visual Image */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[500px]">
            <Image
              src={vaseImage}
              alt="Elena Rossi working with wet clay in her workshop studio"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
