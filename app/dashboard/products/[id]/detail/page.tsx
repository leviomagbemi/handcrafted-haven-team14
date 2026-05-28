import { Metadata } from 'next';
import ProductDetail from '@/app/ui/dashboard/productDetail';
import { useParams } from 'react-router-dom';

export const metadata: Metadata = {
  title: 'Add Product',
};

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <ProductDetail params={id} />
    </>
)
}