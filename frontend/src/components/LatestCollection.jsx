import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";
import LoadingSpinner from "./LoadingSpinner";

const LatestCollection = () => {
  const { products, backendUrl, loading, error } = useContext(ShopContext);

  // React to changes in products
  useEffect(() => {
    // Example: you could log or perform other side effects
    console.log("Products updated:", products);
  }, [products]); // dependency array includes products

  if (loading) {
    return (
      <section className="py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Latest Collection
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Fresh drops you'll love — swipe to explore
            </p>
          </div>
          <LoadingSpinner size="lg" text="Loading latest collection..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Latest Collection
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Fresh drops you'll love — swipe to explore
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-red-600 font-medium">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Latest Collection
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Fresh drops you'll love — swipe to explore
          </p>
        </div>

        <div
          className="mt-6 sm:mt-8 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 sm:pb-3"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {products.filter(p => p.latest === true).slice(0, 12).map((item, index) => {
            const fakeDiscount = 10 + ((index * 7) % 25);
            const stars = 4 + ((index % 10) > 6 ? 1 : 0);
            const candidate = Array.isArray(item.images)
              ? item.images[0]
              : Array.isArray(item.image)
              ? item.image[0]
              : item.image;
            const isAbsolute = typeof candidate === 'string' && /^https?:\/\//i.test(candidate);
            const imageUrl = candidate
              ? isAbsolute
                ? candidate
                : `${backendUrl}${candidate.startsWith('/') ? '' : '/'}${candidate}`
              : '/placeholder.png';

            return (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="snap-start flex-shrink-0 w-[70%] xs:w-[60%] sm:w-[45%] md:w-[30%] lg:w-[22%] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-44 sm:h-56 object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 text-white shadow">
                    -{fakeDiscount}%
                  </span>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-amber-500 text-xs sm:text-sm">
                      {"★".repeat(stars)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - stars)}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      (200+)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-pink-600">
                      ₹{item.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      ₹{Math.round(item.price * (1 + fakeDiscount / 100))}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
