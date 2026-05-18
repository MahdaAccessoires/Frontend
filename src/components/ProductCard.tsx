"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import type { CartProduct } from "@/lib/cart-store";
import { useTranslation } from "@/components/TranslationProvider";

type Props = { product: CartProduct & { bestseller?: boolean; isNew?: boolean; description?: string }; index?: number };

export default function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { t, locale } = useTranslation();

  return (
    <div className="group animate-elegant-fade" style={{ animationDelay: `${index * 100}ms` }}>
      <Link href={`/${locale}/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-800 aspect-square feminine-border shadow-pink group-hover:shadow-pink-hover transition-all duration-500 transform group-hover:scale-105">
          {/* Product Image */}
          <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-700">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full shadow-inner" />
                </div>
                <span className="text-sm text-neutral-300">{locale === 'ar' ? 'إكسسوار مميز' : locale === 'fr' ? 'Accessoire Premium' : 'Premium Accessory'}</span>
              </div>
            )}
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {product.bestseller && (
              <span className="inline-block bg-pink-gradient text-white text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg">
                {locale === 'ar' ? 'الأكثر مبيعا' : locale === 'fr' ? 'Best-seller' : 'Bestseller'}
              </span>
            )}
            {product.isNew && (
              <span className="inline-block bg-gold-gradient text-white text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg">
                {locale === 'ar' ? 'جديد' : locale === 'fr' ? 'Nouveauté' : 'New'}
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              className="w-full bg-white/95 backdrop-blur-sm text-pink-600 font-medium text-xs tracking-wider uppercase py-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {t('addToCart')}
            </button>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 bg-white/80 backdrop-blur-sm text-neutral-800 text-xs py-2 rounded-full hover:bg-white transition-all duration-300">
                {t('view')}
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-2 text-center group">
        <h3 className="font-serif text-lg text-white group-hover:text-pink-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-300 line-clamp-2">
          {product.description || "Elegant and sophisticated piece perfect for any occasion"}
        </p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-semibold text-pink-gradient">${product.price.toLocaleString()}</p>
          {product.bestseller && (
            <span className="text-xs text-gold-500">★</span>
          )}
        </div>
      </div>
    </div>
  );
}
