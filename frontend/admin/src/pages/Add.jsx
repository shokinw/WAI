import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../config";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [latest, setLatest] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [discountPercent, setDiscountPercent] = useState('');
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (e, key) => {
    setImages((prev) => ({ ...prev, [key]: e.target.files[0] }));
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("categories", JSON.stringify(categories));
      formData.append("subCategories", JSON.stringify(subCategories));
      formData.append("latest", latest);
      formData.append("discountPercent", discountPercent || 0);
      formData.append("sizes", JSON.stringify(sizes));

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setLatest(false);
        setSizes([]);
        setImages({ image1: null, image2: null, image3: null, image4: null });
        setDiscountPercent('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4">
      {/* --- Upload Images --- */}
      <div>
        <p className="mb-2 font-medium">Upload Images</p>
        <div className="flex gap-2">
          {["image1", "image2", "image3", "image4"].map((key) => (
            <label key={key} htmlFor={key}>
              <img
                className="w-20 h-20 object-cover border rounded"
                src={images[key] ? URL.createObjectURL(images[key]) : assets.upload_area}
                alt=""
              />
              <input
                id={key}
                type="file"
                hidden
                onChange={(e) => handleImageChange(e, key)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* --- Product Info --- */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2 border rounded"
        />
      </div>

      <div className="w-full">
        <p className="mb-2 font-medium">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write content here"
          required
          className="w-full max-w-[500px] px-3 py-2 border rounded"
        />
      </div>

      {/* --- Category / SubCategory / Price --- */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative min-w-[240px]">
          <p className="mb-2 font-medium">Categories</p>
          <button
            type="button"
            className="w-full px-3 py-2 border rounded flex items-center justify-between bg-white"
            onClick={() => setShowCat((v) => !v)}
          >
            <span className="truncate text-left">
              {categories.length ? categories.join(", ") : "Select categories"}
            </span>
            <span className="opacity-60">▾</span>
          </button>
          {showCat && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
              {(["Kurti", "More", "Sale"]).map((c) => {
                const checked = categories.includes(c);
                return (
                  <label key={c} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setCategories((prev) =>
                          prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
                        )
                      }
                    />
                    <span>{c}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative min-w-[240px]">
          <p className="mb-2 font-medium">Subcategories</p>
          <button
            type="button"
            className="w-full px-3 py-2 border rounded flex items-center justify-between bg-white"
            onClick={() => setShowSub((v) => !v)}
          >
            <span className="truncate text-left">
              {subCategories.length ? subCategories.join(", ") : "Select subcategories"}
            </span>
            <span className="opacity-60">▾</span>
          </button>
          {showSub && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
              {(["Kurti", "Top", "Accessories"]).map((s) => {
                const checked = subCategories.includes(s);
                return (
                  <label key={s} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setSubCategories((prev) =>
                          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                        )
                      }
                    />
                    <span>{s}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 font-medium">Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            className="px-3 py-2 w-full sm:w-[120px] border rounded"
          />
        </div>

        <div>
          <p className="mb-2 font-medium">Discount %</p>
          <input
            type="number"
            min={0}
            max={90}
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="10"
            className="px-3 py-2 w-full sm:w-[120px] border rounded"
          />
        </div>
      </div>

      {/* --- Sizes --- */}
      <div>
        <p className="mb-2 font-medium">Sizes</p>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 rounded ${
                sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* --- Latest Collection --- */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={latest}
          onChange={() => setLatest((prev) => !prev)}
          id="latest"
        />
        <label htmlFor="latest" className="cursor-pointer">
          Add to Latest Collection
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
