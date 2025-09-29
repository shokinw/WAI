// src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.png";
import cart_icon from "../assets/cart_icon.png";
import profile_icon from "../assets/profile_icon.png";
import menu_icon from "../assets/menu_icon.png";
import { ShopContext } from "../context/ShopContextProvider";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const profileRef = useRef();
  const navigate = useNavigate();

  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NavLink style
  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-1 text-lg transition-all duration-300
    ${
      isActive
        ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-semibold"
        : "text-gray-300 hover:text-white"
    }
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
    after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 
    hover:after:w-full after:transition-all after:duration-300`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="flex items-center justify-between py-3 px-4 sm:py-4 sm:px-6 md:px-12">
        {/* LEFT MENU - Hidden on mobile */}
        <ul className="hidden sm:flex gap-6 font-medium">
          <NavLink to="/" className={navLinkClass}>
            <p>Home</p>
          </NavLink>
          <NavLink to="/collection" className={navLinkClass}>
            <p>Kurti</p>
          </NavLink>
          <NavLink to="/more" className={navLinkClass}>
            <p>More</p>
          </NavLink>
          <NavLink to="/sale" className={navLinkClass}>
            <p>Sale</p>
          </NavLink>
        </ul>

        {/* CENTER LOGO - Always centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-20 sm:w-28 md:w-32 lg:w-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
          </Link>
        </div>

        {/* RIGHT SECTION - Compact on mobile */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 ml-auto">
          {/* Search */}
          <img
            src={search_icon}
            className="w-6 cursor-pointer hover:scale-110 transition-transform hidden sm:block"
            alt="Search"
            onClick={() => setShowSearch(true)}
          />
          {/* Mobile cart shortcut (replaces search) */}
          <Link to="/cart" className="relative sm:hidden">
            <img
              src={cart_icon}
              className="w-5 cursor-pointer hover:scale-110 transition"
              alt="Cart"
            />
            <span className="absolute -right-1 -bottom-1 w-4 h-4 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-[8px] shadow-md">
              {getCartCount()}
            </span>
          </Link>

          {/* Profile - Smaller on mobile */}
          <div className="relative" ref={profileRef}>
            <div
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/40 cursor-pointer hover:ring-2 hover:ring-pink-400 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img src={profile_icon} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl shadow-lg bg-white/90 backdrop-blur-md border border-gray-200 z-20">
                <div className="flex flex-col py-2 text-base text-gray-700">
                  <Link
                    to="/profile"
                    className="px-5 py-3 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="px-5 py-3 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/girls"
                    className="px-5 py-3 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Girls Section
                  </Link>
                  {token ? (
                    <button
                      onClick={logout}
                      className="px-5 py-3 text-red-600 hover:bg-red-50 text-left"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="px-5 py-3 text-pink-600 hover:bg-pink-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart - Desktop only */}
          <Link to="/cart" className="relative hidden sm:block">
            <img
              src={cart_icon}
              className="w-6 cursor-pointer hover:scale-110 transition"
              alt="Cart"
            />
            <span className="absolute -right-2 -bottom-2 w-5 h-5 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-[10px] shadow-md">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu - Smaller on mobile */}
          <div className="sm:hidden relative">
            <img
              src={menu_icon}
              className="w-5 cursor-pointer"
              alt="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/95 border rounded-lg shadow-lg z-20 flex flex-col py-2 text-base text-gray-700">
                <NavLink
                  to="/"
                  className="px-5 py-3 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/collection"
                  className="px-5 py-3 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kurti
                </NavLink>
                <NavLink
                  to="/more"
                  className="px-5 py-3 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  More
                </NavLink>
                <NavLink
                  to="/sale"
                  className="px-5 py-3 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sale
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile inline search drawer */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-4 pb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.querySelector('input[name="q"]');
              const q = (input?.value || "").trim();
              if (!q) return;
              setMobileSearchOpen(false);
              navigate(`/search?q=${encodeURIComponent(q)}`);
            }}
            className="flex items-center gap-2 border border-gray-200 bg-white/90 backdrop-blur rounded-full px-3 py-2 shadow-sm"
          >
            <img src={search_icon} alt="Search" className="w-5" />
            <input
              name="q"
              type="text"
              placeholder="Search products, categories…"
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
