import React from "react";
import p17 from "../assets/p17.jpg";
import Billie from "../assets/Billie.png";

const Hero = () => {
  return (
    <section className="w-full">
      {/* 🔹 Full-screen hero below fixed navbar */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-7rem)]"
        style={{ 
          backgroundImage: `url(${p17})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />

      {/* 🔹 Bottom image (Billie) - Responsive */}
      <div className="w-full">
        <img
          src={Billie}
          alt="Billie Banner"
          className="
            w-full 
            h-auto
            object-cover 
            object-center
            min-h-[120px]      /* Mobile: taller for better visibility */
            sm:min-h-[150px]   /* Small tablets */
            md:min-h-[200px]   /* Medium screens */
            lg:min-h-[250px]   /* Large screens */
            xl:min-h-[300px]   /* Extra large screens */
          "
        />
      </div>
    </section>
  );
};

export default Hero;
