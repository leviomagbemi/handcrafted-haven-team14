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
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

const CRAFT_TYPES = ['Ceramics', 'Woodworking', 'Textiles', 'Jewelry', 'Painting', 'Sculpture', 'Other'];

// ─── Buyer Dashboard ──────────────────────────────────────────────────────────

interface ProfileType {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'artisan';
  image_url: string;
  studio_name?: string;
  craft_type?: string;
  story?: string;
}

function BuyerDashboard({ profile, reviewsCount }: { profile: ProfileType; reviewsCount: number }) {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <div className="flex flex-col gap-10">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest">Buyer Account</span>
        <h1 className="font-serif text-3xl font-bold text-gray-900 text-left">
          Welcome back, <span className="italic font-normal text-gray-600">{profile.name}</span>
        </h1>
        <p className="text-sm text-gray-500 text-left">Here&apos;s what&apos;s happening with your orders and saved items.</p>
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
              <p className="text-2xl font-bold text-gray-900 text-left">{value}</p>
              <p className="text-xs text-gray-500 font-semibold text-left">{label}</p>
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
          <div className="text-left">
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
          <div className="text-left">
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
                <div className="flex-1 flex flex-col justify-between py-1 text-left">
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
              </article>
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

interface ArtisanDashboardProps {
  profile: ProfileType;
  listingsCount: number;
  reviewsCount: number;
  onUpdateProfile: (updatedProfile: ProfileType) => void;
}

function ArtisanDashboard({ profile, listingsCount, reviewsCount, onUpdateProfile }: ArtisanDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Listings state and fetch hook
  const [listings, setListings] = useState<any[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoadingListings(true);
    fetch('/api/user/listings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch listings');
      return res.json();
    })
    .then((data) => {
      setListings(data);
      setIsLoadingListings(false);
    })
    .catch((err) => {
      console.error('Error fetching listings:', err);
      setIsLoadingListings(false);
    });
  }, [profile.id, listingsCount]);

  
  // Edit Form Fields
  const [editName, setEditName] = useState(profile.name);
  const [editStudioName, setEditStudioName] = useState(profile.studio_name || '');
  const [editCraftType, setEditCraftType] = useState(profile.craft_type || 'Ceramics');
  const [editStory, setEditStory] = useState(profile.story || '');
  const [editImageUrl, setEditImageUrl] = useState(profile.image_url || '');

  // Reset form when profile changes or edit is cancelled
  useEffect(() => {
    setEditName(profile.name);
    setEditStudioName(profile.studio_name || '');
    setEditCraftType(profile.craft_type || 'Ceramics');
    setEditStory(profile.story || '');
    setEditImageUrl(profile.image_url || '');
  }, [profile, isEditing]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Only image files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size must be under 5MB.');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Upload failed.');
        return;
      }

      setEditImageUrl(data.image_url);
    } catch {
      setErrorMsg('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!editName.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }
    if (!editStudioName.trim()) {
      setErrorMsg('Studio name is required.');
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName.trim(),
          studio_name: editStudioName.trim(),
          craft_type: editCraftType,
          story: editStory.trim(),
          image_url: editImageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to update profile.');
        return;
      }

      // Success
      onUpdateProfile(data.user);
      setIsEditing(false);
    } catch {
      setErrorMsg('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Greeting and Quick Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Artisan Studio</span>
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
            <CheckBadgeIcon className="h-3 w-3" />
            Verified
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 text-left">
          Welcome, <span className="italic font-normal text-gray-600">{profile.name}</span>
        </h1>
        <p className="text-sm text-gray-500 text-left">Manage your listings, studio profile, and creations.</p>
      </div>

      {/* Profile Info Card */}
      {!isEditing && (
        <section className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start shadow-sm text-left relative group">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
            <Image
              src={profile.image_url || '/images/default-artisan.jpg'}
              alt={`${profile.name} portrait`}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="flex-grow flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-gray-900">{profile.name}</h2>
              {profile.craft_type && (
                <span className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded-full">
                  {profile.craft_type}
                </span>
              )}
            </div>
            {profile.studio_name && (
              <p className="font-serif italic text-gray-500 text-sm">Owner of {profile.studio_name}</p>
            )}
            <p className="text-sm text-gray-600 leading-relaxed mt-1">
              {profile.story || "No bio story written yet. Click 'Edit Profile' to share your story!"}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
            aria-label="Edit Profile"
          >
            <PencilSquareIcon className="h-6 w-6" />
          </button>
        </section>
      )}

      {/* Edit Profile Form Section */}
      {isEditing && (
        <section className="bg-white border border-primary/20 rounded-2xl p-6 shadow-md text-left">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Edit Maker Profile</h2>
          
          {errorMsg && (
            <div role="alert" className="mb-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-medium">
              <span className="shrink-0 mt-0.5">⚠</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
            {/* Profile Photo */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Profile Photo</span>
              <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-200 bg-white shrink-0">
                  {editImageUrl ? (
                    <img
                      src={editImageUrl}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-300 bg-gray-100">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="edit-profile-upload"
                    disabled={isUploading || isSaving}
                  />
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="edit-profile-upload"
                      className={`px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 cursor-pointer transition-all ${
                        isUploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isUploading ? 'Uploading...' : editImageUrl ? 'Change Photo' : 'Upload Photo'}
                    </label>
                    {editImageUrl && (
                      <button
                        type="button"
                        onClick={() => setEditImageUrl('')}
                        className="px-4 py-2 text-xs font-semibold text-red-600 hover:text-red-700 border border-transparent rounded-lg transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">JPG, PNG or WebP. Max size 5MB.</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-name" className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
              <input
                id="edit-name"
                type="text"
                required
                maxLength={100}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              />
            </div>

            {/* Studio Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-studio" className="text-xs font-bold text-gray-700 uppercase tracking-wider">Studio Name</label>
              <input
                id="edit-studio"
                type="text"
                required
                maxLength={100}
                value={editStudioName}
                onChange={(e) => setEditStudioName(e.target.value)}
                placeholder="e.g. Silk Road Weavers"
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              />
            </div>

            {/* Craft Type */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-craft" className="text-xs font-bold text-gray-700 uppercase tracking-wider">Primary Craft</label>
              <select
                id="edit-craft"
                value={editCraftType}
                onChange={(e) => setEditCraftType(e.target.value)}
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all cursor-pointer"
              >
                {CRAFT_TYPES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Story */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-story" className="text-xs font-bold text-gray-700 uppercase tracking-wider">Your Story</label>
              <textarea
                id="edit-story"
                rows={4}
                maxLength={1000}
                value={editStory}
                onChange={(e) => setEditStory(e.target.value)}
                placeholder="Tell buyers about your craft, inspiration, and techniques…"
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none"
              />
              <span className="text-[10px] text-gray-400 self-end -mt-1">{editStory.length} / 1000 characters</span>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-all active:scale-95 uppercase tracking-wide disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || isUploading}
                className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-lg transition-all active:scale-95 uppercase tracking-wide disabled:opacity-60"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </section>
      )}

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
              <p className="text-2xl font-bold text-gray-900 text-left">{value}</p>
              <p className="text-xs text-gray-500 font-semibold text-left">{label}</p>
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
          <div className="text-left">
            <p className="font-bold text-sm">Add New Listing</p>
            <p className="text-xs text-white/77">Upload a new product</p>
          </div>
        </Link>

        <Link
          href={`/dashboard/artisans/${profile.id}`}
          className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <UserCircleIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">View Public Profile</p>
            <p className="text-xs text-gray-500">See your artisan page</p>
          </div>
        </Link>
      </div>

      {/* Listings Section */}
      <section className="flex flex-col gap-6 text-left">
        <div className="flex justify-between items-center border-b border-gray-200/80 pb-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-serif text-2xl font-bold text-primary">Your Listings</h2>
            <p className="text-xs text-gray-500 font-medium">Manage and monitor your products active in the boutique.</p>
          </div>
        </div>

        {isLoadingListings ? (
          <div className="bg-white border border-gray-100 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent" />
            <span className="text-xs text-gray-400 mt-2 font-medium">Loading listings...</span>
          </div>
        ) : listings.length === 0 ? (
          <section className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm w-full">
            <PaintBrushIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <h2 className="font-serif text-lg font-bold text-gray-700 mb-1">No listings yet</h2>
            <p className="text-sm text-gray-500 mb-5">Add your first product to start selling.</p>
            <Link
              href="/dashboard/products/add"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all active:scale-95 mx-auto"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Add First Listing
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
              >
                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold shadow-sm backdrop-blur-sm ${
                    listing.status === 'available'
                      ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 bg-white/90'
                      : 'bg-stone-500/10 text-stone-700 border border-stone-500/20 bg-white/90'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${listing.status === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`} />
                    {listing.status === 'available' ? 'Available' : 'Draft'}
                  </span>
                </div>

                {/* Image box */}
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden border-b border-gray-100">
                  <Image
                    src={listing.image_url}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  
                  {/* Category Tag */}
                  <span className={`absolute bottom-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider ${
                    listing.category === 'art' || listing.category === 'arts' ? 'bg-[#fdf4e9] text-[#b45309]' :
                    listing.category === 'textiles' ? 'bg-[#ecfdf5] text-[#047857]' :
                    listing.category === 'accessories' ? 'bg-[#fdf2f8] text-[#be185d]' :
                    'bg-[#f5f5f4] text-[#57534e]'
                  }`}>
                    {listing.category === 'art' || listing.category === 'arts' ? 'CERAMICS' :
                     listing.category === 'textiles' ? 'TEXTILES' :
                     listing.category === 'accessories' ? 'JEWELRY' :
                     listing.category === 'decor' ? 'WOODWORK' :
                     listing.category.toUpperCase()}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col justify-between flex-grow gap-3 text-left">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                    <span className="font-sans text-sm font-bold text-gray-900 shrink-0">
                      {formatCurrency(listing.price)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-2 pt-3 border-t border-gray-100">
                    <Link
                      href={`/dashboard/products/${listing.id}/detail`}
                      className="flex-1 text-center py-1.5 border border-gray-200 hover:border-primary/50 text-gray-600 hover:text-primary rounded-lg text-[10px] font-bold transition-all active:scale-[0.98]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const router = useRouter();
  const { isLoggedIn, user, login, logout } = useAuth();
  const { wishlist } = useCart();
  
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  
  const [stats, setStats] = useState<{
    reviewsCount: number;
    listingsCount: number;
    savedItemsCount: number;
  }>({ reviewsCount: 0, listingsCount: 0, savedItemsCount: 0 });

  // Fetch full user profile details
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      setIsLoadingProfile(true);
      fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setIsLoadingProfile(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setIsLoadingProfile(false);
      });
    } else {
      setProfile(null);
      setIsLoadingProfile(false);
    }
  }, [isLoggedIn]);

  // Fetch stats
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

  const handleUpdateProfile = (updatedProfile: ProfileType) => {
    setProfile(updatedProfile);
    
    // Sync with useAuth Context
    const token = localStorage.getItem('token') || '';
    login(token, {
      id: updatedProfile.id,
      name: updatedProfile.name,
      email: updatedProfile.email,
      role: updatedProfile.role,
      image_url: updatedProfile.image_url,
    });
  };

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

  // Loading profile indicator
  if (isLoadingProfile) {
    return (
      <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-24 font-sans text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="text-sm text-gray-500 mt-4 font-semibold">Loading profile information...</p>
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
      {user.role === 'artisan' && profile ? (
        <ArtisanDashboard 
          profile={profile} 
          listingsCount={stats.listingsCount} 
          reviewsCount={stats.reviewsCount}
          onUpdateProfile={handleUpdateProfile}
        />
      ) : (
        profile && (
          <BuyerDashboard 
            profile={profile} 
            reviewsCount={stats.reviewsCount} 
          />
        )
      )}
    </div>
  );
}