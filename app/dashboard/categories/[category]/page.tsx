import { Metadata } from "next";
import ProductGrid from "@/app/ui/dashboard/products";
import { filteredCategory } from "@/app/lib/data";
import Search from "@/app/ui/dashboard/search";
import { Suspense } from "react";
import { ProductsSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Category",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const category = params.category;
  const query = searchParams?.query || "";
  const items = await filteredCategory(category, query);
  let title = "";

  switch (category) {
    case "decor":
      title = "Home Decor";
      break;
    case "textiles":
      title = "Textiles";
      break;
    case "accessories":
      title = "Accessories";
      break;
    case "art":
      title = "Art";
      break;
    default:
      title = "Products";
  }

  return (
    <>
      <div className="flex flex-col space-y-10 ">
        <Search placeholder="Search the Haven..." />
        <h1 className="text-brown text-5xl text-center">{title}</h1>
        <div className="flex flex-row flex-wrap justify-between sm:justify-center md:justify-evenly">
          <Suspense key={query} fallback={<ProductsSkeleton />}>
            <ProductGrid items={items} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
