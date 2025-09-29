import React from "react";
import heroImage from "../assets/p20.jpg"; // make sure p9.jpg is in your assets folder

const Image = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[60vh] lg:h-[800vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-full object-cover brightness-90"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8">
        
        <p className="mt-4 md:mt-6 text-lg md:text-2xl text-white/90">
          Curated collections just for you — elevate your fashion game.
        </p>
       
      </div>
    </section>
  );
};

export default Image;
