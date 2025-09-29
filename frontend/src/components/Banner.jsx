import React from "react";
import banner from "../assets/banner.png"; // make sure the path is correct

const Banner = () => {
  return (
    <div
      className="w-full py-3 sm:py-4 md:py-6 text-white text-center font-medium text-base sm:text-lg md:text-xl"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="drop-shadow-md">Sueño</p>
    </div>
  );
};

export default Banner;
