import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Fetch single product safely
  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((item) => item._id === productId);
      if (found) {
        setProductData(found);
        const candidate = Array.isArray(found.images)
          ? found.images[0]
          : Array.isArray(found.image)
          ? found.image[0]
          : found.image;
        const isAbsolute = typeof candidate === 'string' && /^https?:\/\//i.test(candidate);
        const resolved = candidate
          ? isAbsolute
            ? candidate
            : `${backendUrl}${candidate.startsWith('/') ? '' : '/'}${candidate}`
          : "https://via.placeholder.com/400";
        setImage(resolved);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0">Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {(productData.images || productData.image || []).map((item, index) => {
              const isAbsolute = typeof item === 'string' && /^https?:\/\//i.test(item);
              const thumb = item
                ? isAbsolute
                  ? item
                  : `${backendUrl}${item.startsWith('/') ? '' : '/'}${item}`
                : "https://via.placeholder.com/100";
              return (
              <img
                key={index}
                onClick={() => setImage(thumb)}
                src={thumb}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={productData.name || "product image"}
              />
            )})}
          </div>
          <div className="w-full sm:w-[80%] relative">
            {/* Badges */}
            {productData.bestseller && (
              <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 shadow">
                Bestseller
              </span>
            )}
            <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white">
              In stock
            </span>
            <img
              className="w-full h-auto rounded-xl shadow-sm"
              src={image || "https://via.placeholder.com/400"}
              alt={productData.name || "product"}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-extrabold text-2xl md:text-3xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700">
              {currency}
              {productData.price}
            </p>
            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">
              Free returns
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
              COD available
            </span>
          </div>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Size Selector */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-semibold">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`py-2 px-4 rounded-full text-sm border transition shadow-sm ${
                    item === size
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => addToCart(productData._id, size, e.currentTarget)}
              className="px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-50">
              Save to Wishlist
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
