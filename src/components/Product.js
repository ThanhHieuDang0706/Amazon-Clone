import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, category, image }) => {
  // random state for demos only
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div>
      <p>{category}</p>
      <Image src={image} width={200} height={200} objectFit="contain" />

      <h4>{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5" />
          ))}
      </div>

      <p>{description}</p>

      <div>
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div>
          <img loading="lazy" src="https://links.papareact.com/fdw" alt="" />
        </div>
      )}
    </div>
  );
};

export default Product;
