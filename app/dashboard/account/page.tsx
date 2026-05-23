'use client';

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import FilteredProducts from "../../ui/dashboard/filtered";
import { AuthContext } from "../../lib/authContext";
import Button from "../../ui/button";
import Link from "next/link";

export default function Page() {
	const router = useRouter();
	const { isLoggedIn, logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
		router.push("/dashboard/login"); // Redirect to login page
	};

	return (
		<>
			<div className="flex flex-col">
				<h1 className="text-5xl leading-tight mb-6">
					Welcome person/Artist!
				</h1>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/*Need to add condition of who is logged in to decide if product add button is shown */}
          <Link href="/dashboard/products/add">
          <Button>Add Products</Button>
        </Link>
				<div className="flex flex-col">
					<h2>Your Products/Purchases</h2>
					<div className="flex flex-col mb-6">
						<FilteredProducts />
					</div>
          </div>
				</div>
				<div className="flex flex-col">
					<h2>Reviews</h2>
					<p className="text-xl">This is where the reviews can be</p>
				</div>
				{isLoggedIn && (
					<Button onClick={handleLogout} className="mt-4">
						Logout
					</Button>
				)}
			</div>
		</>
	);
}
