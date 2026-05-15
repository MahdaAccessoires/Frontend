"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    api.products.list().then(setProducts).catch(() => { });
  }, []);

  const bestsellers = products.filter((p: any) => p.bestseller);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] sm:h-screen overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/60 to-charcoal/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-gold-light/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">Handcrafted Luxury Since 1987</p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold text-gold-gradient max-w-3xl leading-tight">
            Timeless Elegance, Crafted for You
          </h1>
          <p className="mt-6 text-gray-300 text-sm sm:text-base max-w-lg">
            Discover our collection of exquisite jewelry, where every piece tells a story of beauty and passion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/shop" className="bg-gold-gradient text-white px-8 py-3 text-sm font-medium tracking-widest uppercase rounded hover:opacity-90">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Curated for You</p>
          <h2 className="font-serif text-3xl sm:text-4xl">Our Collections</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["Rings", "Necklaces", "Bracelets"].map((title) => (
            <Link key={title} href="/shop" className="group block relative overflow-hidden rounded-lg aspect-[4/3] bg-charcoal">
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="font-serif text-xl text-cream">{title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Most Loved</p>
            <h2 className="font-serif text-3xl sm:text-4xl">Bestsellers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product: any, i: number) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
