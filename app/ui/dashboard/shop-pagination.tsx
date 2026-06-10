"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ShopPagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number | string) => {
    router.push(createPageUrl(pageNumber));
  };

  if (totalPages <= 1) return null;

  // Helper to generate the pagination list
  const getPagesList = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPagesList();

  return (
    <nav className="flex justify-center items-center gap-2 mt-12 font-sans" aria-label="Pagination Navigation">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 transition-all ${
          currentPage <= 1
            ? "text-gray-300 border-gray-100 cursor-not-allowed"
            : "text-gray-600 hover:border-primary hover:text-primary cursor-pointer active:scale-95"
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="h-9 w-9 flex items-center justify-center text-gray-400">
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <button
            key={`page-${page}`}
            onClick={() => handlePageChange(page)}
            className={`h-9 w-9 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all cursor-pointer active:scale-95 ${
              isCurrent
                ? "bg-[#3a5244] border-[#3a5244] text-white"
                : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
            }`}
            aria-current={isCurrent ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 transition-all ${
          currentPage >= totalPages
            ? "text-gray-300 border-gray-100 cursor-not-allowed"
            : "text-gray-600 hover:border-primary hover:text-primary cursor-pointer active:scale-95"
        }`}
        aria-label="Next Page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
