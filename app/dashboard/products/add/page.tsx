import { Metadata } from "next";
import AddProductForm from "@/app/ui/dashboard/product-form";
import { fetchArtisan } from "@/app/lib/data";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Add Product | Handcrafted Haven",
};

export default async function Page() {
  const artisans = await fetchArtisan();

  return (
    <div className="w-full max-w-6xl mx-auto py-6 md:py-10 px-4">
      {/* Back to Account Link */}
      <div className="mb-6">
        <Link
          href="/dashboard/account"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded px-2 py-1"
        >
          <ArrowLeftIcon className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header section */}
      <div className="mb-8 border-b border-gray-200/80 pb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Add New Product
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 font-sans">
          Create a new listing for your boutique store by providing the details below.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full">
        <AddProductForm artisans={artisans} />
      </div>
    </div>
  );
}

