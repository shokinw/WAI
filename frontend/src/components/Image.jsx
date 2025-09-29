import React from "react";
import heroImage from "../assets/p20.jpg"; // make sure p20.jpg is in your assets folder

const Image = () => {
  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-full object-cover object-center brightness-90"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />

      {/* Text Content - Responsive */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
        <p className="mt-2 sm:mt-4 md:mt-6 text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
          Curated collections just for you — elevate your fashion game.
        </p>
      </div>
    </section>
  );
};

export default Image;