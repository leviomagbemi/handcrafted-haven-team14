'use client';

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../public/images/hh-logo.png";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AuthContext } from "@/app/lib/authContext";
import Image from "next/image";

export default function Header() {
	const { isLoggedIn, logout } = useContext(AuthContext);
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/dashboard/login"); // Redirect to login page
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					
					{/* Brand Logo and Title */}
					<div className="flex items-center gap-6">
						<Link href="/" className="flex items-center gap-3 group">
							<div className="relative h-12 w-12 rounded-full overflow-hidden border border-outline-variant group-hover:border-primary transition-colors">
								<Image
									src={logo}
									alt="Handcrafted Haven Logo"
									fill
									sizes="48px"
									className="object-cover"
									priority
								/>
							</div>
							<span className="font-serif text-2xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">
								Handcrafted Haven
							</span>
						</Link>
					</div>

					{/* Navigation Links */}
					<nav className="hidden md:flex items-center gap-8">
						<NavLinks />
					</nav>

					{/* Actions: Account, Cart, Logout */}
					<div className="flex items-center gap-4">
						{isLoggedIn ? (
							<div className="flex items-center gap-4">
								<Link href="/dashboard/account" aria-label="Account">
									<UserCircleIcon className="h-7 w-7 text-on-surface hover:text-primary transition-colors" />
								</Link>
								<button 
									onClick={handleLogout}
									className="text-sm font-medium text-secondary hover:text-primary transition-colors"
								>
									Logout
								</button>
							</div>
						) : (
							<Link href="/dashboard/login" aria-label="Login">
								<UserCircleIcon className="h-7 w-7 text-on-surface hover:text-primary transition-colors" />
							</Link>
						)}

						<Link href="/dashboard/cart" aria-label="Cart" className="relative p-1">
							<ShoppingCartIcon className="h-7 w-7 text-on-surface hover:text-primary transition-colors" />
						</Link>
					</div>

				</div>

				{/* Mobile Navigation */}
				<div className="md:hidden flex justify-center py-2 border-t border-outline-variant/50">
					<nav className="flex gap-6">
						<NavLinks />
					</nav>
				</div>
			</div>
		</header>
	);
}
