

import Link from "next/link";
// import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { ArtisanGrid } from "@/app/lib/definitions";


export default function ArtistGrid({ artisans }: { artisans: ArtisanGrid[] }) {
//   const pathname = usePathname();

  return (
    <>
      {artisans.map((artist) => {
        return (
          <div className="flex  " key={artist.id}>
            <Link
              key={artist.id}
              href={"/dashboard/artistBio/" + artist.id}
              className={clsx("", {
                
              })}
            >
              <Image
                src={artist.image_url}
                alt="Artist Image"
                className=" object-scale-down size-32 sm:size-40 md:size-56 lg:size-72 xl:size-96"
                height={3700}
                width={3700}
              />
              <p className="text-brown text-center text-lg pt-2 pb-10 sm:text-xl md:text-2xl xl:text-3xl">{artist.name}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}
