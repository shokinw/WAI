import React from "react";
import p17 from "../assets/p17.jpg";
import Billie from "../assets/Billie.png";

const Hero = () => {
  return (
    <section className="w-full">
      {/* 🔹 Full-screen hero below fixed navbar */}
      <div
        className="w-full bg-cover bg-center min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-7rem)]"
        style={{ backgroundImage: `url(${p17})` }}
      />

      {/* 🔹 Bottom image (Billie) */}
      <div className="w-full">
        <img
          src={Billie}
          alt="Billie Banner"
          className="
            w-full 
            object-cover 
            min-h-[80px]       /* 🔹 ensures it's tall enough on small screens */
            sm:min-h-[20px]   /* 🔹 slightly taller on tablets */
            md:min-h-[80px]   /* 🔹 larger on desktops */
          "
        />
      </div>
    </section>
  );
};

export default Hero;
