"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import type { CartProduct } from "@/lib/cart-store";

type Props = { product: CartProduct & { bestseller?: boolean; isNew?: boolean; description?: string }; index?: number };

export default function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group" style={{ animationDelay: `${index * 100}ms` }}>
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded bg-gray-100 aspect-square sparkle-hover">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm group-hover:scale-110 transition-transform duration-700">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : "Image"}
          </div>
          {product.bestseller && (
            <span className="absolute top-3 left-3 bg-gold-gradient text-white text-[10px] font-medium tracking-wider uppercase px-3 py-1 rounded-sm">Bestseller</span>
          )}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-charcoal text-white text-[10px] font-medium tracking-wider uppercase px-3 py-1 rounded-sm">New</span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button onClick={(e) => { e.preventDefault(); addItem(product); }} className="w-full bg-cream/90 backdrop-blur-sm text-charcoal text-xs tracking-wider uppercase py-2.5 rounded hover:bg-cream">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-sm">{product.name}</h3>
        <p className="text-sm text-gold">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
