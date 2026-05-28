'use client';

import React from "react";
import Image from "next/image";
import logo from "/public/images/hh-logo.png";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="w-full bg-beige border-t border-outline-variant/60 text-on-surface py-16 mt-auto">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				
				{/* Main Content Grid */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-outline-variant/30">
					
					{/* Left Column: Brand & Mission */}
					<div className="md:col-span-5 flex flex-col gap-6">
						<div className="flex items-center gap-3">
							<div className="relative h-12 w-12 rounded-full overflow-hidden border border-outline-variant">
								<Image
									src={logo}
									alt="Handcrafted Haven Logo"
									fill
									sizes="48px"
									className="object-cover"
								/>
							</div>
							<span className="font-serif text-2xl font-bold tracking-tight">
								Handcrafted Haven
							</span>
						</div>
						<p className="font-sans text-base text-on-surface/80 leading-relaxed max-w-sm">
							Connecting discerning collectors with verified independent artisans. 
							We celebrate the soft, intentional curves of human craft and organic materials.
						</p>
					</div>

					{/* Middle Columns: Navigation Categories */}
					<div className="md:col-span-4 grid grid-cols-2 gap-8">
						<div>
							<h3 className="font-serif text-lg font-bold mb-4 tracking-wide text-primary">
								Shop
							</h3>
							<ul className="flex flex-col gap-3 font-sans text-sm font-medium text-on-surface/80">
								<li>
									<Link href="/dashboard/categories/Decor" className="hover:text-primary transition-colors">
										Home Decor
									</Link>
								</li>
								<li>
									<Link href="/dashboard/categories/textiles" className="hover:text-primary transition-colors">
										Textiles
									</Link>
								</li>
								<li>
									<Link href="/dashboard/categories/art" className="hover:text-primary transition-colors">
										Art & Prints
									</Link>
								</li>
								<li>
									<Link href="/dashboard/categories/accessories" className="hover:text-primary transition-colors">
										Accessories
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-serif text-lg font-bold mb-4 tracking-wide text-primary">
								About
							</h3>
							<ul className="flex flex-col gap-3 font-sans text-sm font-medium text-on-surface/80">
								<li>
									<Link href="/dashboard/story" className="hover:text-primary transition-colors">
										Our Story
									</Link>
								</li>
								<li>
									<Link href="/dashboard/story" className="hover:text-primary transition-colors">
										Meet the Artisans
									</Link>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Sustainability
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Contact Us
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Right Column: Newsletter */}
					<div className="md:col-span-3 flex flex-col gap-4">
						<h3 className="font-serif text-lg font-bold tracking-wide text-primary">
							Newsletter
						</h3>
						<p className="font-sans text-sm text-on-surface/80 leading-relaxed">
							Join our community of craft appreciators. Get stories behind the creations and early access to new collections.
						</p>
						<form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
							<input
								type="email"
								placeholder="Your email address"
								className="w-full px-4 py-2 text-sm bg-background border border-outline-variant/60 rounded-md outline-none focus:border-primary transition-colors"
								required
							/>
							<button
								type="submit"
								className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-container rounded-md transition-colors"
							>
								Subscribe
							</button>
						</form>
					</div>

				</div>

				{/* Bottom Area: Legal & Copyright */}
				<div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 font-sans text-xs font-medium text-on-surface/60">
					<p>&copy; 2026 Handcrafted Haven. All rights reserved.</p>
					<div className="flex gap-6">
						<a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
						<a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
					</div>
				</div>

			</div>
		</footer>
	);
}
