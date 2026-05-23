
import { Metadata } from 'next';
import { fetchArtisan } from '@/app/lib/data';
import ArtistGrid from '@/app/ui/dashboard/artisans';
import { ProductsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Our Artisans',
};


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const artisans = await fetchArtisan();
  
  return (
      <>
      <div className="flex flex-col ">
      <h1 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl">Handcrafted Haven Artisans</h1>
      
      <div className="flex flex-row flex-wrap justify-between">

          <Suspense key={query} fallback={<ProductsSkeleton />}>
          <ArtistGrid artisans={artisans} />
          </Suspense>
        </div>

</div>
</>
  )
  
}