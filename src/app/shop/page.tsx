"use client";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";

const categories = ["all", "rings", "necklaces", "bracelets", "earrings"];
const materials = ["all", "gold", "rose-gold", "platinum", "silver"];

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const [material, setMaterial] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    api.products.list().then(setProducts).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (material !== "all") result = result.filter((p) => p.material === material);
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, material, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl mb-3">The Collection</h1>
        <p className="text-gray-500 text-sm">Discover pieces crafted to last a lifetime</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full border transition-colors ${category === c ? "bg-charcoal text-white border-charcoal" : "border-gray-300 text-gray-500 hover:border-gold hover:text-gold"}`}>
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <select value={material} onChange={(e) => setMaterial(e.target.value)} className="text-xs tracking-wider uppercase bg-cream border rounded px-3 py-2">
            {materials.map((m) => <option key={m} value={m}>{m === "all" ? "All Materials" : m}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-xs tracking-wider uppercase bg-cream border rounded px-3 py-2">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
