// src/Components/Big/BigBanner.jsx
import React from "react";
import BigImage from "../assets/BigImage.png";

const BigBanner = () => {
  return (
    <section className="w-full">
      <img
        src={BigImage}
        alt="Big Banner"
        className="w-full h-auto object-cover object-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
      />
    </section>
  );
};

export default BigBanner;
