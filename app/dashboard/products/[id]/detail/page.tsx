import { Metadata } from 'next';
import ProductDetail from '@/app/ui/dashboard/productDetail';
import { useParams } from 'react-router-dom';

export const metadata: Metadata = {
  title: 'Add Product',
};

export default function Page({params}: {params: {id: string}}) {
  const id = params.id;
  
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <ProductDetail params={id} />
    </>
)
}