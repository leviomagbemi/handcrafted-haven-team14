import { Metadata } from "next";
import ProductGrid from "@/app/ui/dashboard/products";
import { fetchItems, fetchFilteredItems } from "@/app/lib/data";
import Search from "@/app/ui/dashboard/search";
import { Suspense } from "react";
import { ProductsSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "All Products",
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
  const items = await fetchFilteredItems(query);
  
  return (
    <>
      <div className="flex flex-col space-y-10 ">
        <Search placeholder="Search the Haven..." />
        <h1 className="text-brown text-5xl text-center">All Products</h1>
        <div className="flex flex-row flex-wrap justify-between sm:justify-center md:justify-evenly">
          <Suspense key={query} fallback={<ProductsSkeleton />}>
            <ProductGrid items={items} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
