import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../config";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) setProducts(res.data.products.reverse());
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleLatest = async (id, latest) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/update-latest`,
        { id, latest: !latest },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success('Latest Collection updated');
        fetchProducts();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Products</h3>
      {products.length === 0 && <p>No products found</p>}
      {products.map((p) => (
        <div key={p._id} className="flex items-center gap-4 border p-2 my-2">
          <img
            src={p.images[0] || "https://via.placeholder.com/50"}
            alt={p.name}
            className="w-12 h-12 object-cover"
          />
          <p>{p.name}</p>
          <p className="text-xs text-gray-500">
            {(p.categories && p.categories.length ? p.categories.join(', ') : p.category) || '-'}
          </p>
          <p>
            {currency}
            {p.price}
          </p>
          <button
            className={`ml-auto px-3 py-1 rounded text-xs ${p.latest ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => toggleLatest(p._id, p.latest)}
          >
            {p.latest ? 'In Latest' : 'Add to Latest'}
          </button>
          <button
            className="text-red-500 font-bold"
            onClick={() => removeProduct(p._id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
