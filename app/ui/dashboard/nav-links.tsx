"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Shop", href: "/dashboard/categories" },
  { name: "Artisans", href: "/dashboard/story" },
  { name: "Our Story", href: "/dashboard/story" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "font-sans text-sm font-semibold tracking-wide transition-colors",
              isActive 
                ? "text-primary border-b-2 border-primary py-1" 
                : "text-on-surface/80 hover:text-primary py-1"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
