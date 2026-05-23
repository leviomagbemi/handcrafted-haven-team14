import { Metadata } from 'next';
import ArtistDetail from '@/app/ui/dashboard/bio';

export const metadata: Metadata = {
  title: 'Artist Bio',
};

export default function Page(
  {params}: {params: {id: string}}
  ) {
  const id = params.id;
  return (
    <>
  {/* @ts-expect-error Async Server Component */}
      <ArtistDetail params={id} />
 
  
  </>)
  
}