import { Metadata } from "next";
import AddProductForm from "@/app/ui/dashboard/product-form";
import { fetchArtisan } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Add Products",
};

export default async function Page() {
  const artisans = await fetchArtisan();

  return (
    <>
      <div className="flex flex-col grow max-w-4xl  text-center">
        <h1>Add Products</h1>
       

        <AddProductForm artisans={artisans} />
      </div>
    </>
  );
}
