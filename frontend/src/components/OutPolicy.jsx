import React from "react";
import logo from "../assets/logo.png";
import p11 from "../assets/p11.jpg";
import p12 from "../assets/p12.jpg";
import p13 from "../assets/p13.jpg";
import p14 from "../assets/p14.jpg";

const OutPolicy = () => {
  const question =
    "What's your favorite frontend framework in 2025? 🤔 Let's settle this debate once and for all! Vote below 👇";

  const [selected, setSelected] = React.useState(null);

  const pollOptions = [
    { label: "React", percentage: 45, image: p11 },
    { label: "Vue.js", percentage: 25, image: p12 },
    { label: "Angular", percentage: 20, image: p13 },
    { label: "Svelte", percentage: 10, image: p14 },
  ];

  const handleSelect = (index) => {
    setSelected(index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 px-4">
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
            />
            <div className="flex flex-col">
              <span
                className="font-bold text-xl"
                style={{ color: "#933757" }}
              >
                Web Trends
              </span>
              <span className="text-gray-500 text-sm">@frontendPolls</span>
            </div>
          </div>
          <span
            className="text-[#933757] hover:text-[#b14e80] transition-colors cursor-pointer"
            title="Trending"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </span>
        </div>

        {/* Question */}
        <div className="mb-5">
          <p className="text-gray-900 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {question}
          </p>
        </div>

        {/* Poll Options */}
        <div className="space-y-3">
          {pollOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={`flex flex-col cursor-pointer transition-all duration-300 p-3 rounded-xl border
                ${
                  selected === index
                    ? "border-[#933757] shadow-lg bg-[#933757]/10"
                    : "border-gray-200 hover:bg-[#933757]/5 hover:shadow-sm"
                }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-12 h-12 rounded-lg object-cover border shadow-sm"
                />
                <span
                  className={`text-base md:text-lg font-medium ${
                    selected === index ? "text-[#933757]" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </span>
              </div>

              {/* Show results bar only after click */}
              {selected !== null && (
                <div className="mt-2 w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-[#933757] to-[#b14e80] transition-all duration-700"
                    style={{ width: `${option.percentage}%` }}
                  ></div>
                </div>
              )}

              {selected !== null && (
                <span
                  className={`text-sm mt-1 font-semibold ${
                    selected === index ? "text-[#933757]" : "text-gray-600"
                  }`}
                >
                  {option.percentage}%
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <span>1,247 votes · 2 hours left</span>
          <span>6:00 AM · Dec 20, 2024</span>
        </div>
      </div>
    </div>
  );
};

export default OutPolicy;
