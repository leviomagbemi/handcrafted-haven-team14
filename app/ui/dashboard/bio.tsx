// app/ui/dashboard/bio.tsx

import Image from "next/image";
import {
  getSingleArtisan,
  fetchArtistItems,
} from "@/app/lib/data";

interface ArtistDetailProps {
  id: string;
}

export default async function ArtistDetail({
  id,
}: ArtistDetailProps) {
  // Fetch artisan information
  const details = await getSingleArtisan(id);

  // Fetch artisan products
  const items = await fetchArtistItems(id);

  // If artisan does not exist
  if (!details) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Artist not found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-10">
      {/* Artist Profile */}
      <div className="flex flex-col items-center">
        <Image
          src={details.image_url}
          alt={details.name}
          width={400}
          height={400}
          className="rounded-lg object-cover"
          priority
        />

        <h1 className="text-3xl font-bold mt-6 text-brown">
          {details.name}
        </h1>

        <p className="mt-4 text-center text-gray-600 max-w-3xl text-lg">
          {details.story}
        </p>
      </div>

      {/* Artist Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-brown">
          Artist Creations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-brown/20 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-tan">
                <Image
                  src={item.image_url || "/images/blank-box.png"}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-lg font-medium mt-3 text-center text-brown">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}