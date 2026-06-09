import { Metadata } from "next";
import ProductGrid from "@/app/ui/dashboard/products";
import ShopFilters from "@/app/ui/dashboard/shop-filters";
import ShopHeader from "@/app/ui/dashboard/shop-header";
import ShopPagination from "@/app/ui/dashboard/shop-pagination";
import Search from "@/app/ui/dashboard/search";
import { fetchFilteredShopItems, fetchShopItemsCount } from "@/app/lib/data";
import { Suspense } from "react";
import { ProductsSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Shop All Handcrafted",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    categories?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.query || "";
  const categoriesParam = resolvedSearchParams?.categories || "";
  const minPriceParam = resolvedSearchParams?.minPrice || "";
  const maxPriceParam = resolvedSearchParams?.maxPrice || "";
  const ratingParam = resolvedSearchParams?.rating || "";
  const sortParam = resolvedSearchParams?.sort || "best-selling";
  const pageParam = resolvedSearchParams?.page || "1";

  const categories = categoriesParam ? categoriesParam.split(",") : [];
  const minPrice = minPriceParam ? Number(minPriceParam) * 100 : 0;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) * 100 : 999999999;
  const rating = Number(ratingParam) || 0;
  const currentPage = Number(pageParam) || 1;
  const limit = 9;
  const offset = (currentPage - 1) * limit;

  // Query database
  const items = await fetchFilteredShopItems({
    query,
    categories,
    minPrice,
    maxPrice,
    minRating: rating,
    sort: sortParam,
    limit,
    offset,
  });

  const totalItemsCount = await fetchShopItemsCount({
    query,
    categories,
    minPrice,
    maxPrice,
    minRating: rating,
  });

  const totalPages = Math.ceil(totalItemsCount / limit);

  // Creating a combined key for Suspense so that any filter parameter changes trigger the skeleton fallback appropriately.
  const suspenseKey = `${query}-${categoriesParam}-${minPriceParam}-${maxPriceParam}-${ratingParam}-${sortParam}-${pageParam}`;

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Search Bar aligned right */}
      <div className="max-w-md self-end w-full">
        <Search placeholder="Search the Haven..." />
      </div>

      {/* Editorial Header (Breadcrumbs, Title, Description, Sort, Applied Filter Pills) */}
      <ShopHeader itemsCount={totalItemsCount} />

      {/* Main Content: Sidebar + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Sidebar Filters */}
        <div className="shrink-0 w-full lg:w-auto">
          <ShopFilters />
        </div>

        {/* Product Grid & Pagination Column */}
        <div className="flex-grow w-full flex flex-col justify-between min-h-[400px]">
          <Suspense key={suspenseKey} fallback={<ProductsSkeleton />}>
            <ProductGrid items={items} />
          </Suspense>

          {/* Pagination */}
          <ShopPagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
