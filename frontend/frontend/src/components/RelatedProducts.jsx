import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.filter(
        (item) => category === item.category && subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-12 sm:my-16 px-4">
      <div className="text-center text-xl sm:text-2xl md:text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            images={item.images}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
