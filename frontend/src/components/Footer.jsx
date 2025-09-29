import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import razorpay from "../assets/razorpay_logo.png";
import stripe from "../assets/stripe_logo.png";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", to: "/" },
        { label: "Offers & Deals", to: "/offers" },
        { label: "Contact Us", to: "/contact" },
        { label: "FAQs", to: "/faqs" },
      ],
    },
    {
      title: "Need Help?",
      links: [
        { label: "Delivery Information", to: "/delivery" },
        { label: "Return & Refund Policy", to: "/returns" },
        { label: "Payment Methods", to: "/payment-methods" },
        { label: "Track your Order", to: "/orders" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <footer className="px-6 md:px-12 lg:px-24 bg-gradient-to-r from-pink-600 to-purple-700 text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent)]"></div>

      {/* Top Section */}
      <div className="relative flex flex-col md:flex-row items-start justify-between gap-8 py-12">
        {/* Logo & Description */}
        <div className="max-w-xs text-center md:text-left mx-auto md:mx-0">
          <img
            className="w-28 md:w-36 mx-auto md:mx-0 drop-shadow-lg"
            src={logo}
            alt="Company Logo"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            WAI - Your premier destination for trendy fashion. We deliver 
            high-quality products with easy exchanges and 24/7 customer support.
          </p>

          {/* Socials */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-5">
            {[
              { name: "Instagram", href: "https://instagram.com/wai_fashion" },
              { name: "Twitter", href: "https://twitter.com/wai_fashion" },
              { name: "Facebook", href: "https://facebook.com/wai_fashion" },
              { name: "YouTube", href: "https://youtube.com/wai_fashion" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white text-sm transition transform hover:scale-110 hover:drop-shadow-lg"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center md:justify-between w-full md:w-[55%] gap-8">
          {linkSections.map((section, index) => (
            <div key={index} className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {typeof link === 'string' ? (
                      <a href="#" className="hover:text-pink-200 hover:underline transition">{link}</a>
                    ) : (
                      <Link to={link.to} className="hover:text-pink-200 hover:underline transition">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-white/20 py-4 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
        <p className="text-sm text-white/80">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-white">WAI Fashion</span>. All Rights
          Reserved.
        </p>

        {/* Payments */}
        <div className="flex items-center gap-3">
          <img src={razorpay} alt="Razorpay" className="h-6 opacity-90" />
          <span className="text-white/40">•</span>
          <img src={stripe} alt="Stripe" className="h-6 opacity-90" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
