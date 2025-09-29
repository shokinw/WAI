import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { toast } from "react-toastify";

const EditProduct = ({ token }) => {
  const [all, setAll] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    subCategories: [],
    sizes: [],
    latest: false,
    discountPercent: "",
  });
  const [images, setImages] = useState({});

  const fetchAll = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      setAll(res.data?.products || []);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    if (!selected) return;
    const p = all.find(x => x._id === selected);
    if (!p) return;
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      categories: p.categories || [],
      subCategories: p.subCategories || [],
      sizes: p.sizes || [],
      latest: !!p.latest,
      discountPercent: (p.discountPercent ?? ""),
    });
    setImages({});
  }, [selected, all]);

  const toggleArr = (key, val) => setForm(prev => ({
    ...prev,
    [key]: prev[key].includes(val) ? prev[key].filter(x => x !== val) : [...prev[key], val]
  }));

  const onFile = (e, key) => setImages(prev => ({ ...prev, [key]: e.target.files[0] }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return toast.error('Select a product');
    try {
      const fd = new FormData();
      fd.append('id', selected);
      Object.entries(form).forEach(([k,v]) => {
        if (Array.isArray(v)) fd.append(k, JSON.stringify(v)); else fd.append(k, v);
      });
      Object.entries(images).forEach(([k,f]) => { if (f) fd.append(k, f); });
      const res = await axios.post(`${backendUrl}/api/product/update`, fd, { headers: { token } });
      if (res.data.success) { toast.success('Updated'); fetchAll(); }
      else toast.error(res.data.message);
    } catch (e) { toast.error(e.message); }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Edit Product</h3>
      <div>
        <select className="border px-3 py-2 rounded" value={selected || ''} onChange={e => setSelected(e.target.value)}>
          <option value="">Select product…</option>
          {all.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
      </div>

      {selected && (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm">Name</p>
              <input className="border px-3 py-2 rounded w-full" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            </div>
            <div>
              <p className="mb-1 text-sm">Price</p>
              <input type="number" className="border px-3 py-2 rounded w-full" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
            </div>
            <div className="sm:col-span-2">
              <p className="mb-1 text-sm">Description</p>
              <textarea className="border px-3 py-2 rounded w-full" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="mb-1 text-sm">Categories</p>
              {['Kurti','More','Sale'].map(c => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.categories.includes(c)} onChange={()=>toggleArr('categories',c)} /> {c}
                </label>
              ))}
            </div>
            <div>
              <p className="mb-1 text-sm">Subcategories</p>
              {['Kurti','Top','Accessories'].map(s => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.subCategories.includes(s)} onChange={()=>toggleArr('subCategories',s)} /> {s}
                </label>
              ))}
            </div>
            <div>
              <p className="mb-1 text-sm">Sizes</p>
              {['S','M','L','XL','XXL'].map(sz => (
                <label key={sz} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.sizes.includes(sz)} onChange={()=>toggleArr('sizes',sz)} /> {sz}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.latest} onChange={e=>setForm({...form, latest: e.target.checked})} /> Latest Collection
            </label>
            <div>
              <p className="mb-1 text-sm">Discount %</p>
              <input type="number" min={0} max={90} className="border px-3 py-2 rounded w-28" value={form.discountPercent} onChange={e=>setForm({...form,discountPercent:e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1,2,3,4].map(n => (
              <div key={n}>
                <p className="text-sm mb-1">Image {n}</p>
                <input type="file" onChange={e=>onFile(e,`image${n}`)} />
              </div>
            ))}
          </div>

          <button type="submit" className="px-5 py-2 bg-black text-white rounded">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;


