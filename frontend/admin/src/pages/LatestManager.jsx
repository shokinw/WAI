import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../config";
import { toast } from "react-toastify";

const LatestManager = ({ token }) => {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/product/list`);
      setAll(res.data?.products || []);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const setLatest = async (id, latest) => {
    try {
      const res = await axios.post(`${backendUrl}/api/product/update-latest`, { id, latest }, { headers: { token } });
      if (res.data.success) {
        toast.success(latest ? "Added to Latest" : "Removed from Latest");
        fetchAll();
      } else toast.error(res.data.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const latest = all.filter(p => p.latest === true);
  const others = all.filter(p => !p.latest);

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Latest Collection Manager</h3>

      <div>
        <h4 className="font-medium mb-2">Currently in Latest</h4>
        {loading && <p>Loading…</p>}
        {latest.length === 0 && <p className="text-sm text-gray-500">No products in Latest.</p>}
        {latest.map((p) => (
          <div key={p._id} className="flex items-center gap-4 border p-2 my-2 bg-white rounded">
            <img src={p.images?.[0] || "https://via.placeholder.com/50"} alt={p.name} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">{currency}{p.price}</p>
            </div>
            <button className="px-3 py-1 text-xs rounded bg-red-100 text-red-700" onClick={() => setLatest(p._id, false)}>Remove</button>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-medium mb-2">Add Products to Latest</h4>
        {others.length === 0 && <p className="text-sm text-gray-500">All products are already in Latest.</p>}
        {others.map((p) => (
          <div key={p._id} className="flex items-center gap-4 border p-2 my-2 bg-white rounded">
            <img src={p.images?.[0] || "https://via.placeholder.com/50"} alt={p.name} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">{currency}{p.price}</p>
            </div>
            <button className="px-3 py-1 text-xs rounded bg-green-100 text-green-700" onClick={() => setLatest(p._id, true)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestManager;


