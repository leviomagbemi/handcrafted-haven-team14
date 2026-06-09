// app/dashboard/products/[id]/detail/page.tsx

import ProductDetail from "@/app/ui/dashboard/productDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  return <ProductDetail id={id} />;
}