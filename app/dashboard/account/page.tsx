'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/lib/authContext';
import { useCart } from '@/app/lib/cartContext';
import { formatCurrency } from '@/app/lib/utils';
import {
  ShoppingBagIcon,
  StarIcon,
  UserCircleIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  CheckBadgeIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

// ─── Buyer Dashboard ──────────────────────────────────────────────────────────

function BuyerDashboard({ name, reviewsCount }: { name: string; reviewsCount: number }) {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <div className="flex flex-col gap-10">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest">Buyer Account</span>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Welcome back, <span className="italic font-normal text-gray-600">{name}</span>
        </h1>
        <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening with your orders and saved items.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Orders Placed', value: '0', icon: ShoppingBagIcon, color: 'text-primary bg-primary/8' },
          { label: 'Items Saved', value: wishlist.length.toString(), icon: StarIcon, color: 'text-secondary bg-secondary/8' },
          { label: 'Reviews Written', value: reviewsCount.toString(), icon: StarIcon, color: 'text-emerald-600 bg-emerald-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <article key={label} className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-5 shadow-sm">
            <div className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 font-semibold">{label}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/categories"
          className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label="Browse the shop to discover handcrafted items"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <ShoppingBagIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">Browse the Shop</p>
            <p className="text-xs text-gray-500">Discover handcrafted items</p>
          </div>
        </Link>

        <Link
          href="/dashboard/artisans"
          className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
          aria-label="Meet artisans and explore their profiles"
        >
          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
            <UserCircleIcon className="h-5 w-5 text-secondary" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">Meet Artisans</p>
            <p className="text-xs text-gray-500">Explore maker profiles</p>
          </div>
        </Link>
      </div>

      {/* Saved Items Grid */}
      {wishlist.length > 0 && (
        <section className="flex flex-col gap-6 text-left" aria-label="Saved items">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-serif text-2xl font-bold text-primary">Saved Items</h2>
            <p className="text-xs text-gray-500 font-medium">Your curated collection of handmade pieces.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {wishlist.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-outline-variant/60 rounded-xl p-4 flex gap-4 shadow-sm relative group focus-within:ring-2 focus-within:ring-primary/50"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-outline-variant/40 bg-gray-50">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif font-bold text-primary text-sm line-clamp-1">{item.title}</h3>
                    {item.artisan_name && (
                      <p className="text-[10px] text-gray-400 mt-0.5">by {item.artisan_name}</p>
                    )}
                    <p className="font-sans text-xs font-bold text-[#a65b32] mt-1">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => addToCart(item)}
                      aria-label={`Add ${item.title} to cart`}
                      className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      aria-label={`Remove ${item.title} from wishlist`}
                      className="text-[11px] text-red-600 hover:text-red-700 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Orders placeholder */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm" aria-label="Orders summary">
        <ShoppingBagIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" aria-hidden="true" />
        <h2 className="font-serif text-lg font-bold text-gray-700 mb-1">No orders yet</h2>
        <p className="text-sm text-gray-500 mb-5">Your completed purchases will appear here.</p>
        <Link
          href="/dashboard/categories"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start Shopping
        </Link>
      </section>
    </div>
  );
}

// ─── Artisan Dashboard ────────────────────────────────────────────────────────

function ArtisanDashboard({ name, listingsCount, reviewsCount }: { name: string; listingsCount: number; reviewsCount: number }) {
  return (
    <div className="flex flex-col gap-10">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Artisan Studio</span>
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
            <CheckBadgeIcon className="h-3 w-3" />
            Verified
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Welcome, <span className="italic font-normal text-gray-600">{name}</span>
        </h1>
        <p className="text-sm text-gray-500">Manage your listings, studio profile, and creations.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Active Listings', value: listingsCount.toString(), icon: PaintBrushIcon, color: 'text-primary bg-primary/8' },
          { label: 'Total Reviews', value: reviewsCount.toString(), icon: StarIcon, color: 'text-amber-600 bg-amber-50' },
          { label: 'Items Sold', value: '0', icon: ShoppingBagIcon, color: 'text-emerald-600 bg-emerald-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-5 shadow-sm">
            <div className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 font-semibold">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/products/add"
          className="group flex items-center gap-4 bg-primary text-white rounded-xl p-5 hover:bg-primary/90 transition-all shadow-sm"
        >
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <PlusCircleIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm">Add New Listing</p>
            <p className="text-xs text-white/70">Upload a new product</p>
          </div>
        </Link>

        <Link
          href="/dashboard/artisans"
          className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <UserCircleIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">View Public Profile</p>
            <p className="text-xs text-gray-500">See your artisan page</p>
          </div>
        </Link>
      </div>

      {/* Listings placeholder */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
        <PaintBrushIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
        <h2 className="font-serif text-lg font-bold text-gray-700 mb-1">No listings yet</h2>
        <p className="text-sm text-gray-500 mb-5">Add your first product to start selling.</p>
        <Link
          href="/dashboard/products/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all active:scale-95"
        >
          <PlusCircleIcon className="h-4 w-4" />
          Add First Listing
        </Link>
      </section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { wishlist } = useCart();
  const [stats, setStats] = useState<{
    reviewsCount: number;
    listingsCount: number;
    savedItemsCount: number;
  }>({ reviewsCount: 0, listingsCount: 0, savedItemsCount: 0 });

  useEffect(() => {
    if (isLoggedIn && user) {
      const token = localStorage.getItem('token');
      fetch('/api/user/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then((data) => {
        if (!data.error) {
          setStats({
            reviewsCount: data.reviewsCount || 0,
            listingsCount: data.listingsCount || 0,
            savedItemsCount: data.savedItemsCount || 0,
          });
        }
      })
      .catch((err) => console.error('Error fetching user stats:', err));
    }
  }, [isLoggedIn, user, wishlist.length]);

  const handleLogout = () => {
    logout();
    router.push('/dashboard/login');
  };

  // Not logged in — redirect prompt
  if (!isLoggedIn || !user) {
    return (
      <div className="mx-auto max-w-md text-center py-24 px-4 font-sans">
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-3">Sign in to continue</h1>
        <p className="text-sm text-gray-500 mb-8">You need to be logged in to view your account.</p>
        <Link
          href="/dashboard/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-all active:scale-95"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-10 font-sans">
      {/* Top-right logout */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      {/* Role-based dashboard */}
      {user.role === 'artisan' ? (
        <ArtisanDashboard 
          name={user.name} 
          listingsCount={stats.listingsCount} 
          reviewsCount={stats.reviewsCount} 
        />
      ) : (
        <BuyerDashboard 
          name={user.name} 
          reviewsCount={stats.reviewsCount} 
        />
      )}
    </div>
  );
}