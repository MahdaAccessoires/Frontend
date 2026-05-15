"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useCartStore } from "@/lib/cart-store";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (id) {
      api.products.get(id as string).then((p) => {
        setProduct(p);
        api.products.list(`category=${p.category}`).then((all: any[]) => setRelated(all.filter((r) => r.id !== p.id).slice(0, 4)));
      });
    }
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleAdd = () => { addItem(product); setAdded(true); setTimeout(() => setAdded(false), 2000); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <nav className="text-xs text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-gold">Home</Link><span>/</span>
        <Link href="/shop" className="hover:text-gold">Shop</Link><span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          {product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-lg" /> : <span className="text-gray-400">Product Image</span>}
        </div>
        <div className="flex flex-col">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">{product.category}</p>
          <h1 className="font-serif text-3xl sm:text-4xl mb-4">{product.name}</h1>
          <p className="text-2xl text-gold-gradient font-serif mb-6">${product.price.toLocaleString()}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">{product.description}</p>
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex gap-3"><span className="text-gray-400 w-20">Material</span><span className="capitalize">{product.material}</span></div>
            <div className="flex gap-3"><span className="text-gray-400 w-20">Category</span><span className="capitalize">{product.category}</span></div>
          </div>
          <button onClick={handleAdd} className={`w-full py-4 rounded text-sm font-medium tracking-widest uppercase transition-all ${added ? "bg-green-600 text-white" : "bg-gold-gradient text-white hover:opacity-90"}`}>
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl text-center mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
