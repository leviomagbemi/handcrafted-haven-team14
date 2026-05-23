import Link from "next/link";
import Image from "next/image";
import { fetchCategory } from "@/app/lib/data";

export default async function CatLinks() {
  const homeCategory = await fetchCategory("Decor");
  const textilesCategory = await fetchCategory("textiles");
  const artCategory = await fetchCategory("art");
  const accessoriesCategory = await fetchCategory("accessories");

  // Safety checks
  if (!homeCategory.length) {
    return <p>No home decor category found.</p>;
  }

  if (!textilesCategory.length) {
    return <p>No textiles category found.</p>;
  }

  if (!artCategory.length) {
    return <p>No art category found.</p>;
  }

  if (!accessoriesCategory.length) {
    return <p>No accessories category found.</p>;
  }

  return (
    <>
      {/* Home Decor */}
      <Link
        key="home"
        href={`/dashboard/categories/${homeCategory[0].category}`}
      >
        <Image
          src={homeCategory[0].image_url}
          alt="Home Decor"
          className="sm:w-[250px] sm:h-[150px] md:w-[350px] md:h-[200px] lg:w-[400px] lg:h-[350px]"
          width={400}
          height={350}
        />
        <p className="text-2xl">Home Decor</p>
      </Link>

      {/* Textiles */}
      <Link
        key="textiles"
        href={`/dashboard/categories/${textilesCategory[0].category}`}
      >
        <Image
          src={textilesCategory[0].image_url}
          alt="Textiles"
          className="sm:w-[250px] sm:h-[150px] md:w-[350px] md:h-[200px] lg:w-[400px] lg:h-[350px]"
          width={400}
          height={350}
        />
        <p className="text-2xl">Textiles</p>
      </Link>

      {/* Art */}
      <Link
        key="art"
        href={`/dashboard/categories/${artCategory[0].category}`}
      >
        <Image
          src={artCategory[0].image_url}
          alt="Art"
          className="sm:w-[250px] sm:h-[150px] md:w-[350px] md:h-[200px] lg:w-[400px] lg:h-[350px]"
          width={400}
          height={350}
        />
        <p className="text-2xl">Art</p>
      </Link>

      {/* Accessories */}
      <Link
        key="accessories"
        href={`/dashboard/categories/${accessoriesCategory[0].category}`}
      >
        <Image
          src={accessoriesCategory[0].image_url}
          alt="Accessories"
          className="sm:w-[250px] sm:h-[150px] md:w-[350px] md:h-[200px] lg:w-[400px] lg:h-[350px]"
          width={400}
          height={350}
        />
        <p className="text-2xl">Accessories</p>
      </Link>
    </>
  );
}