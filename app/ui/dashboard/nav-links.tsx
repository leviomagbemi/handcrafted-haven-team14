"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },

  { name: "Shop", href: "/dashboard/categories" },
  { name: "Artisans", href: "/dashboard/story" },

];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow h-50 items-center justify-center self-center gap-2 p-3 text-brown text-xl lg:text-2xl xl:text-3xl font-serif font-medium hover:bg-brown hover:text-beige hover:rounded-md ",
              {
                "bg-brown bg-opacity-30 text-tan rounded-t-md":
                  pathname === link.href,
              }
            )}
          >
            <p className="font-serif text-md">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
