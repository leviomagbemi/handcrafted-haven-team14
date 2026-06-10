"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Shop", href: "/dashboard/categories" },
  { name: "Artisans", href: "/dashboard/artisans" },
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
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "font-sans text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded px-2 py-1",
              isActive 
                ? "text-primary border-b-2 border-primary" 
                : "text-on-surface/80 hover:text-primary"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
