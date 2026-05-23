import Image from "next/image";
import Button from "@/app/ui/button";
import { getProductDetail, getItemReviews } from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";
import React from "react";
import moment from "moment";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  //this looks weird because it is a workaround to let us use the passed parameter
  //as a string, even though it is already a string
  const id = params as unknown as string;
  const links = await getProductDetail(id);
  const reviews = await getItemReviews(id);

  console.log(links);

  return (
    <>
      {links.map((link) => {
        return (
          <div className="flex flex-col " key={link.id}>
            <h1 className="text-5xl text-brown">{link.title}</h1>
            <div className="flex flex-row justify-between">
              <h3 className="text-2xl text-brown">{link.name}</h3>
              <p>Star Rating</p>
            </div>

            <Image
              className="md:h-[600px] md:w-[700px]"
              priority={true}
              src={link.image_url}
              alt="blank box"
              width={2250}
              height={4000}
            />
            <div className="flex flex-row justify-between">
              <h3 className="text-brown">{formatCurrency(link.price)}</h3>
              <Button>Add to Cart</Button>
            </div>

            <p className="text-2xl text-wrap md:w-[700px]">
              {link.description}
            </p>
            <div className="flex flex-col">
              <h2 className="text-brown text-5xl mt-6">Reviews</h2>
              <div className="text-2xl">
                {reviews.length == 0 && (
                  <h4>Be the first to leave a review!</h4>
                )}
                {reviews.map((review) => {
                  return (
                    <div className="flex flex-col " key={review.id}>
                      <div className="flex flex-row justify-between">
                        <p className="text-3xl">{review.name}</p>
                        <p>Rating: {review.rate} Stars</p>
                      </div>
                      <div className="text-xl">
                        {moment(review.date).format("MM/DD/YYYY")}
                      </div>
                      <p className="text-brown text-xl">{review.text}</p>
                    </div>
                  );
                })}
              </div>
              <a href={"/dashboard/products/" + link.id + "/detail/review"}>
                <Button>Review this Item</Button>
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}
