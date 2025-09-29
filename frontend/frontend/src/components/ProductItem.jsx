import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";

const ProductItem = ({ id, image, images, name, price }) => {
  const { currency, backendUrl } = useContext(ShopContext);

  const resolveImage = () => {
    const candidate = Array.isArray(images)
      ? images[0]
      : Array.isArray(image)
      ? image[0]
      : typeof image === "string"
      ? image
      : undefined;
    if (!candidate) return "/placeholder.png";
    const isAbsolute = /^https?:\/\//i.test(candidate);
    return isAbsolute ? candidate : `${backendUrl}${candidate.startsWith("/") ? "" : "/"}${candidate}`;
  };

  const imageUrl = resolveImage();

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
        <img
          className="hover:scale-105 transition-transform duration-300 w-full h-40 sm:h-48 object-cover"
          src={imageUrl}
          alt={name}
          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
        />
      </div>
      <p className="pt-2 sm:pt-3 text-xs sm:text-sm truncate">{name}</p>
      <p className="text-sm sm:text-base font-medium">
        {currency}{price}
      </p>
    </Link>
  );
};

export default ProductItem;
