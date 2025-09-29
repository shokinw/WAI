import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = (search || "").trim();
    if (q.length === 0) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setShowSearch(false);
  };

  return showSearch && visible ? (
    <div className="border-t border-b bg-gradient-to-r from-pink-50 via-white to-purple-50 text-center px-4">
      <form
        onSubmit={onSubmit}
        className="inline-flex items-center justify-between border border-gray-200 bg-white/80 backdrop-blur px-3 sm:px-5 py-2 my-4 mx-auto rounded-full w-full sm:w-2/3 md:w-1/2 max-w-xl shadow-sm"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm sm:text-base px-2"
          type="text"
          placeholder="Search products, categories…"
        />
        <button type="submit" className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 shadow">
          Search
        </button>
        <img className="w-4 sm:w-5" src={assets.search_icon} alt="search" />
      </form>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 sm:w-4 cursor-pointer"
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  ) : null;
};

export default SearchBar;
