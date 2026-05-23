"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "/public/images/title-logo.png";
import NavLinks from "/app/ui/dashboard/nav-links";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AuthContext } from "../../lib/authContext";
import Image from "next/image";

export default function Header() {
	const { isLoggedIn, logout } = useContext(AuthContext);
	const [showLogoutButton, setShowLogoutButton] = useState(true);
	const router = useRouter();

	const handleLogout = () => {
		logout();
		setShowLogoutButton(false);
		router.push("/dashboard/login"); // Redirect to login page
	};

	return (
		<header className="flex flex-col space-y-2 bg-tan">
			<div className="flex flex-col sm:flex-row">
				<div className="relative flex justify-center">
					<a href="/">
						<Image
							className="w-full"
							width="1562"
							height="1562"
							src={logo.src}
							alt="Logo"
						/>
					</a>
				</div>
				<div className="hidden sm:flex justify-evenly grow flex-wrap flex-row ">
					<NavLinks />
				</div>
				<div className="flex flex-row justify-evenly sm:self-center">
					{isLoggedIn ? (
						<Link href="/dashboard/account/">
							<UserCircleIcon className="w-[40px] h-[40px] m-4 stroke-brown xl:w-[50px] xl:h-[50px]" />
						</Link>
					) : (
						<Link href="/dashboard/login">
							<UserCircleIcon className="w-[40px] h-[40px] m-4 stroke-brown xl:w-[50px] xl:h-[50px]" />
						</Link>
					)}
					<Link href="/dashboard/cart">
						<ShoppingCartIcon className="w-[40px] h-[40px] m-4 stroke-brown xl:w-[50px] xl:h-[50px]" />
					</Link>
				</div>
			</div>
            <div className="sm:hidden flex justify-evenly grow flex-wrap flex-row ">
				<NavLinks />
			</div>
		</header>
	);
}
