"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", price: "", category: "rings", material: "gold", description: "", bestseller: false, isNew: false });

  const load = () => api.products.list().then(setProducts);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, price: parseFloat(form.price), images: ["/images/placeholder.jpg"] };
    if (editing) await api.products.update(editing.id, data);
    else await api.products.create(data);
    setEditing(null);
    setForm({ name: "", price: "", category: "rings", material: "gold", description: "", bestseller: false, isNew: false });
    load();
  };

  const startEdit = (p: any) => { setEditing(p); setForm({ name: p.name, price: String(p.price), category: p.category, material: p.material, description: p.description, bestseller: p.bestseller, isNew: p.isNew }); };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl mb-8">Products</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border mb-8 space-y-4">
        <h2 className="font-serif text-lg">{editing ? "Edit Product" : "Add Product"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Name" required className="border rounded px-3 py-2 text-sm" />
          <input value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="Price" type="number" required className="border rounded px-3 py-2 text-sm" />
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border rounded px-3 py-2 text-sm">
            {["rings","necklaces","bracelets","earrings"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={form.material} onChange={(e) => setForm({...form, material: e.target.value})} className="border rounded px-3 py-2 text-sm">
            {["gold","rose-gold","platinum","silver"].map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Description" className="w-full border rounded px-3 py-2 text-sm" rows={3} />
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.bestseller} onChange={(e) => setForm({...form, bestseller: e.target.checked})} /> Bestseller</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({...form, isNew: e.target.checked})} /> New</label>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-gold-gradient text-white px-6 py-2 rounded text-sm">{editing ? "Update" : "Add"}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", price: "", category: "rings", material: "gold", description: "", bestseller: false, isNew: false }); }} className="text-sm text-gray-400">Cancel</button>}
        </div>
      </form>
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-white p-4 rounded-lg border">
            <div>
              <h3 className="font-serif text-sm">{p.name}</h3>
              <p className="text-xs text-gray-400">{p.category} · {p.material} · ${p.price}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-xs text-gold hover:underline">Edit</button>
              <button onClick={async () => { await api.products.delete(p.id); load(); }} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
