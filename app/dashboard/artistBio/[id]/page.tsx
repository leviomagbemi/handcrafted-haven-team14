import { Metadata } from 'next';
import ArtistDetail from '@/app/ui/dashboard/bio';

export const metadata: Metadata = {
  title: 'Artist Bio',
};

export default async function Page(
  {params}: {params: Promise<{id: string}>}
  ) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  return (
    <>
  {/* @ts-expect-error Async Server Component */}
      <ArtistDetail params={id} />
 
  
  </>)
  
}