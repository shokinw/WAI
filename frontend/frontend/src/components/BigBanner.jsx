// src/Components/Big/BigBanner.jsx
import React from "react";
import BigImage from "../assets/BigImage.png";

const BigBanner = () => {
  return (
    <section className="w-full">
      <img
        src={BigImage}
        alt="Big Banner"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default BigBanner;
