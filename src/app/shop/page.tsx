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
    api.products.list().then(setProducts).catch(() => { });
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
      {/* Header Section */}
      <div className="text-center mb-16 animate-elegant-fade">
        <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Discover Our</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 text-shadow-elegant">Shop</h1>
        <p className="text-neutral-300 text-lg max-w-2xl mx-auto">Find your perfect piece from our curated selection of luxury accessories</p>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #FF69B4 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #C5A258 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Filters Section */}
      <div className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm rounded-2xl p-6 mb-10 feminine-border shadow-pink">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <p className="text-pink-400 text-xs tracking-wider uppercase self-center mr-2">Categories:</p>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full border transition-all duration-300 transform hover:scale-105 ${category === c
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500 shadow-lg"
                  : "border-gray-600 text-gray-400 hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/10"
                  }`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>

          {/* Sort & Material Filters */}
          <div className="flex gap-3">
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="text-xs tracking-wider uppercase bg-gray-800 border border-gray-600 text-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
            >
              {materials.map((m) => <option key={m} value={m}>{m === "all" ? "All Materials" : m}</option>)}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs tracking-wider uppercase bg-gray-800 border border-gray-600 text-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-white mb-2">No products found</h3>
            <p className="text-neutral-400">Try adjusting your filters to find what you're looking for</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((p, i) => (
              <div key={p.id} className="animate-elegant-fade" style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
