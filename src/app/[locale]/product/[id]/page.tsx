"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useCartStore } from "@/lib/cart-store";
import ProductCard from "@/components/ProductCard";
import { useTranslation } from "@/hooks/useTranslationSimple";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { t, locale } = useTranslation();

  useEffect(() => {
    if (id) {
      api.products.get(id as string).then((p) => {
        setProduct(p);
        api.products.list(`category=${p.category}`).then((all: any[]) => setRelated(all.filter((r) => r.id !== p.id).slice(0, 4)));
      });
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">{t('loading')}</p>
      </div>
    </div>
  );

  const handleAdd = () => { addItem(product); setAdded(true); setTimeout(() => setAdded(false), 2000); };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #FF69B4 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #C5A258 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-neutral-400 mb-8 flex items-center gap-2 animate-elegant-fade">
          <Link href={`/${locale}`} className="hover:text-pink-400 transition-colors">{t('home')}</Link>
          <span className="text-pink-400/50">/</span>
          <Link href={`/${locale}/shop`} className="hover:text-pink-400 transition-colors">{t('shop')}</Link>
          <span className="text-pink-400/50">/</span>
          <span className="text-white font-medium">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="animate-elegant-fade">
            <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden feminine-border shadow-pink">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-400">Product Image</span>
                  </div>
                </div>
              )}

              {/* Sparkle Effects */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-pink-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-gold-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6 animate-elegant-fade" style={{ animationDelay: "200ms" }}>
            {/* Category Badge */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-pink-400 mb-2 font-medium">{product.category}</p>
              <div className="w-16 h-1 bg-pink-gradient rounded-full" />
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-5xl text-white mb-4 text-shadow-elegant">{product.name}</h1>

            {/* Price */}
            <p className="text-3xl sm:text-4xl text-pink-gradient font-serif mb-6">${product.price.toLocaleString()}</p>

            {/* Description */}
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">{product.description}</p>

            {/* Product Details */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 feminine-border">
              <h3 className="font-serif text-xl text-white mb-4">{t('productDetails')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-neutral-400">{t('material')}</span>
                  <span className="text-white capitalize font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-neutral-400">{t('category')}</span>
                  <span className="text-white capitalize font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-400">{t('availability')}</span>
                  <span className="text-green-400 font-medium">{t('inStock')}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 transform hover:scale-105 ${added
                ? "bg-green-600 text-white shadow-lg"
                : "bg-pink-gradient text-white shadow-pink hover:shadow-pink-hover"
                }`}
            >
              {added ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('addedToCart')}
                </span>
              ) : (
                <span>{t('addToCart')}</span>
              )}
            </button>

            {/* Features */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span className="text-neutral-400 text-sm">{t('handcraftedPrecision')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span className="text-neutral-400 text-sm">{t('premiumQualityMaterials')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span className="text-neutral-400 text-sm">{t('freeShipping')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20 animate-elegant-fade" style={{ animationDelay: "400ms" }}>
            <div className="text-center mb-16">
              <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t('completeYourLook')}</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4 text-shadow-elegant">{t('youMayAlsoLike')}</h2>
              <p className="text-neutral-300 max-w-2xl mx-auto">{t('discoverMore')}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p, i) => (
                <div key={p.id} className="animate-elegant-fade" style={{ animationDelay: `${i * 100}ms` }}>
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
