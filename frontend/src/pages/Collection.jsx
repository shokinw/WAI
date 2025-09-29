import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch, backendUrl } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortKey, setSortKey] = useState("popular");

  // ✅ Filter products whenever dependencies change
  useEffect(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(productsCopy);
  }, [products, search, showSearch]);

  // ✅ Sort products based on sortKey
  const sortedProducts = useMemo(() => {
    const list = filteredProducts.slice();
    if (sortKey === "priceAsc") {
      return list.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sortKey === "priceDesc") {
      return list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return list; // "popular" or default
  }, [filteredProducts, sortKey]);

  return (
    <div className="pt-10 border-t">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white text-pink-600 shadow">
              All picks
            </span>
            <div className="mt-3">
              <Title text1={"ALL"} text2={"COLLECTIONS"} />
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-gray-600">{sortedProducts.length} items</span>
          </div>
        </div>
      </div>

      {/* Sorting Buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        <span className="text-gray-600">Sort:</span>
        <button
          onClick={() => setSortKey("popular")}
          className={`px-3 py-1 rounded-full border transition ${
            sortKey === "popular"
              ? "border-pink-500 bg-pink-50 text-pink-700"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => setSortKey("priceAsc")}
          className={`px-3 py-1 rounded-full border transition ${
            sortKey === "priceAsc"
              ? "border-pink-500 bg-pink-50 text-pink-700"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          Price ↑
        </button>
        <button
          onClick={() => setSortKey("priceDesc")}
          className={`px-3 py-1 rounded-full border transition ${
            sortKey === "priceDesc"
              ? "border-pink-500 bg-pink-50 text-pink-700"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          Price ↓
        </button>
        <span className="ml-auto sm:hidden text-gray-600">
          {sortedProducts.length} items
        </span>
      </div>

      {/* Product Grid (shows all; Kurti/Sale/More can be separate routes if needed) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {sortedProducts.map((item, index) => {
          const showNew = index % 5 === 0;
          const fakeDiscount = 10 + ((index * 7) % 20);

          const rawImages = Array.isArray(item.images)
            ? item.images
            : Array.isArray(item.image)
            ? item.image
            : item.image
            ? [item.image]
            : [];

          const resolveUrl = (u) => {
            if (!u || typeof u !== 'string') return '/placeholder.png';
            const isAbsolute = /^https?:\/\//i.test(u);
            return isAbsolute ? u : `${backendUrl}${u.startsWith('/') ? '' : '/'}${u}`;
          };

          const resolvedImages = rawImages.map(resolveUrl);
          const imageUrl = resolvedImages[0] || '/placeholder.png';

          return (
            <div
              key={item._id}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              {showNew && (
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-pink-100 text-pink-700 shadow">
                  New
                </span>
              )}
              {typeof item.discountPercent === 'number' && item.discountPercent > 0 && (
                <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 text-white shadow">
                  -{item.discountPercent}%
                </span>
              )}

              <ProductItem
                name={item.name}
                id={item._id}
                price={item.price}
                image={imageUrl}
                images={resolvedImages}
              />

              {/* Thumbnails row to show all uploaded images */}
              {resolvedImages.length > 1 && (
                <div className="px-2 pb-3 pt-1">
                  <div className="flex gap-2 overflow-x-auto">
                    {resolvedImages.slice(0, 4).map((imgSrc, i) => (
                      <img
                        key={i}
                        src={imgSrc}
                        alt="thumb"
                        className="w-10 h-10 rounded-md object-cover border"
                        onError={(e) => (e.currentTarget.src = '/placeholder.png')}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="pointer-events-none h-0.5 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
