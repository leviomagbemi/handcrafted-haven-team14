import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

import { ArtisanGrid } from "@/app/lib/definitions";

export default function ArtistGrid({
  artisans,
}: {
  artisans: ArtisanGrid[];
}) {
  return (
    <>
      {artisans.map((artist) => (
        <div className="flex" key={artist.id}>
          {/* UUID FIX:
             Uses artist.id instead of index + 1
          */}
          <Link
            href={`/dashboard/artistBio/${artist.id}`}
            className={clsx("")}
          >
            <Image
              src={artist.image_url}
              alt={`${artist.name} Image`}
              className="object-scale-down size-32 sm:size-40 md:size-56 lg:size-72 xl:size-96"
              width={3700}
              height={3700}
              priority
            />

            <p className="text-brown text-center text-lg pt-2 pb-10 sm:text-xl md:text-2xl xl:text-3xl">
              {artist.name}
            </p>
          </Link>
        </div>
      ))}
    </>
  );
}