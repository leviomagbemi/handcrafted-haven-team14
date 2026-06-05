"use client";

import React, { useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "/public/images/title-logo.png";
import {
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import { AuthContext } from "../../lib/authContext";
import { useCart } from "@/app/lib/cartContext";
import Image from "next/image";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/dashboard/categories" },
  { name: "Artisans", href: "/dashboard/story" },
];

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { getTotalItems } = useCart();
  const [showLogoutButton, setShowLogoutButton] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setShowLogoutButton(false);
    router.push("/dashboard/login");
  };

  return (
    <header className="flex flex-col space-y-2 bg-tan">
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex justify-center">
          <a href="/">
            <Image
              className="w-full"
              width={1562}
              height={1562}
              src={logo.src}
              alt="Logo"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex justify-evenly grow flex-wrap flex-row">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex grow h-50 items-center justify-center self-center gap-2 p-3 text-brown text-xl lg:text-2xl xl:text-3xl font-serif font-medium hover:bg-brown hover:text-beige hover:rounded-md",
                {
                  "bg-brown bg-opacity-30 text-tan rounded-t-md":
                    pathname === link.href,
                }
              )}
            >
              <p className="font-serif text-md">{link.name}</p>
            </Link>
          ))}
        </div>

        {/* Account & Cart */}
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

          <Link
            href="/dashboard/cart"
            className="relative p-2 flex items-center justify-center"
          >
            <ShoppingCartIcon className="w-[40px] h-[40px] m-4 stroke-brown xl:w-[50px] xl:h-[50px]" />

            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex justify-evenly grow flex-wrap flex-row">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow h-50 items-center justify-center self-center gap-2 p-3 text-brown text-xl lg:text-2xl xl:text-3xl font-serif font-medium hover:bg-brown hover:text-beige hover:rounded-md",
              {
                "bg-brown bg-opacity-30 text-tan rounded-t-md":
                  pathname === link.href,
              }
            )}
          >
            <p className="font-serif text-md">{link.name}</p>
          </Link>
        ))}
      </div>
    </header>
  );
}