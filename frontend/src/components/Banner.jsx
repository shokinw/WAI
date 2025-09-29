import React from "react";
import banner from "../assets/banner.png"; // make sure the path is correct

const Banner = () => {
  return (
    <div
      className="w-full py-4 sm:py-6 md:py-8 text-white text-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg mb-2">
          ✨ New Collection Just Dropped! ✨
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium drop-shadow-md opacity-90">
          Discover our latest fashion trends with up to 50% off
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
            Free Shipping
          </span>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
            Easy Returns
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
