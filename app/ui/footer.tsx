'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/hh-logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#efeeec] border-t border-outline-variant/60 text-on-surface py-12 mt-auto font-sans" role="contentinfo" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-gutter">
          
          {/* Brand Info (takes 2 columns on desktop) */}
          <div className="md:col-span-2 flex flex-col text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-[40px] w-[40px] rounded-full overflow-hidden border border-outline-variant/60 bg-white shrink-0">
                <Image
                  src={logo}
                  alt="Handcrafted Haven Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary italic hover:text-primary/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">
                Handcrafted Haven
              </Link>
            </div>
            
            <p className="text-sm text-on-surface/75 leading-relaxed max-w-sm mb-6">
              Connecting you with authentic makers. Every purchase supports an independent artisan.
            </p>
            
            <p className="text-xs text-on-surface/50 font-medium">
              &copy; 2026 Handcrafted Haven. All rights reserved.
            </p>
          </div>

          {/* Platform Column */}
          <nav className="flex flex-col text-left" aria-label="Platform navigation">
            <h2 className="text-sm font-semibold tracking-wider text-on-surface mb-4 uppercase">
              Platform
            </h2>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-on-surface/75">
              <li>
                <Link href="/dashboard/login" className="hover:text-secondary transition-colors opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary rounded">
                  Seller Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/artisans" className="hover:text-secondary transition-colors opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary rounded">
                  Meet Our Artisans
                </Link>
              </li>
            </ul>
          </nav>

          {/* Support Column */}
          <nav className="flex flex-col text-left" aria-label="Support navigation">
            <h2 className="text-sm font-semibold tracking-wider text-on-surface mb-4 uppercase">
              Support
            </h2>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-on-surface/75">
              <li>
                <Link href="#" className="hover:text-secondary transition-colors opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary rounded">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary transition-colors opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary rounded">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary transition-colors opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary rounded">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </footer>
  );
}
