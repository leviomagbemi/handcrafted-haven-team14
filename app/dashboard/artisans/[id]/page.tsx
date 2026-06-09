import { Metadata } from "next";
import ArtistDetail from "@/app/ui/dashboard/bio";
import { getSingleArtisan } from "@/app/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artisan = await getSingleArtisan(id);
  return {
    title: artisan
      ? `${artisan.name} | Handcrafted Haven`
      : "Artisan Profile | Handcrafted Haven",
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ArtistDetail id={id} />;
}
