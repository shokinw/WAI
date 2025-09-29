import React from "react";
import p10 from "../assets/p10.jpg";
import p11 from "../assets/p11.jpg";
import p12 from "../assets/p12.jpg";
import p13 from "../assets/p13.jpg";
import p14 from "../assets/p14.jpg";

const NewsletterBox = () => {
  const images = [p10, p11, p12, p13, p14];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-pink-50 via-white to-purple-50">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 animate-pulse">
          WAUiii
        </h1>
        
      </div>

      {/* Horizontal scroll gallery */}
      <div className="overflow-x-auto no-scrollbar py-4">
        <div className="flex gap-6 min-w-max px-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-2xl shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 hover:rotate-1"
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-80 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                <span className="text-white font-semibold text-lg sm:text-xl">
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra decorative elements */}
      <div className="pointer-events-none absolute top-0 left-0 w-48 h-48 rounded-full bg-pink-200/30 blur-2xl animate-ping" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-56 h-56 rounded-full bg-purple-200/30 blur-2xl animate-pulse" />
    </section>
  );
};

export default NewsletterBox;
