import React from "react";
import { Link } from "react-router-dom";
import p7 from "../assets/p7.jpg";
import p11 from "../assets/p11.jpg";
import p12 from "../assets/p12.jpg";
import p13 from "../assets/p13.jpg";

const More = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 drop-shadow-lg">
          About <span className="text-gray-900">WAI</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium">
          WAI is more than fashion. It’s a <span className="text-pink-600 font-semibold">movement</span> 
          blending Indian tradition with global youth culture.
        </p>
      </div>

      {/* Brand Vision & Mission */}
      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {/* Vision */}
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/30 transition hover:scale-[1.02]">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🌍 Vision</h2>
          <p className="text-gray-700">
            To make Indian kurtis a <strong>global casual/western fashion brand</strong> 
            — bold, youthful, edgy, and loved worldwide.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/30 transition hover:scale-[1.02]">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">🚀 Mission</h2>
          <p className="text-gray-700">
            Redefine kurtis with <strong>unique cuts, slits, metallic accents</strong> and 
            bring Indian tradition into <strong>modern, casual fashion</strong> for youth.
          </p>
        </div>
      </div>

      {/* Lookbook / Gallery */}
      <div className="mt-16">
        <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Lookbook
        </h2>
        <p className="text-center text-gray-700 mt-2">A vibe that blends tradition with street.</p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative group overflow-hidden rounded-2xl shadow-md">
            <img src={p7} alt="Look 1" className="w-full h-44 md:h-56 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md md:col-span-2">
            <img src={p11} alt="Look 2" className="w-full h-44 md:h-56 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md">
            <img src={p12} alt="Look 3" className="w-full h-44 md:h-56 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md">
            <img src={p13} alt="Look 4" className="w-full h-44 md:h-56 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md md:col-span-2">
            <img src={p7} alt="Look 5" className="w-full h-44 md:h-56 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md">
            <img src={p11} alt="Look 6" className="w-full h-44 md:h-56 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { k: "10k+", label: "Happy Customers" },
          { k: "500+", label: "Designs Dropped" },
          { k: "4.8★", label: "Average Rating" },
          { k: "24/7", label: "Support" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl bg-white/60 backdrop-blur p-6 shadow border border-white/40">
            <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700">
              {s.k}
            </div>
            <div className="text-sm text-gray-700 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* What We Sell */}
      <div className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 p-10 rounded-3xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          What We Sell
        </h2>
        <p className="text-gray-800 text-lg max-w-3xl mx-auto">
          Premium quality <strong>modern Indian kurtis</strong> designed with bold slits, edgy cuts, 
          and metallic accents. Our kurtis are crafted to make you feel <em>confident, stylish, 
          and globally inspired</em>.
        </p>
      </div>

      {/* Our Goal */}
      <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/30">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🎯 Our Goal</h2>
          <p className="text-gray-700">
            WAI is on a journey to build a <strong>₹500 Crore brand</strong> in the next 6 years, 
            making kurtis not just traditional attire, but a <em>global fashion statement</em>.
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-lg text-center transition hover:scale-[1.05]">
          <h2 className="text-2xl font-bold mb-4">✨ Our Identity</h2>
          <ul className="space-y-2 text-lg">
            <li>✔ Bold & Youthful</li>
            <li>✔ Confident & Edgy</li>
            <li>✔ Sustainable & Affordable</li>
            <li>✔ Inclusive for Every Girl</li>
          </ul>
        </div>
      </div>

      {/* CTA Links */}
      <div className="mt-20 flex flex-col md:flex-row gap-6 justify-center">
        <Link
          to="/kurti"
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition"
        >
          👗 Explore Kurtis
        </Link>
        <Link
          to="/services"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition"
        >
          ⚡ Our Services
        </Link>
      </div>
    </section>
  );
};

export default More;
