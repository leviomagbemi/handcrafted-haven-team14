// app/dashboard/products/[id]/detail/page.tsx

import ProductDetail from "@/app/ui/dashboard/productDetail";

export default function Page({ params }: { params: { id: string } }) {
  return <ProductDetail id={params.id} />;
}