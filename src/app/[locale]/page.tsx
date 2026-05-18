"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import { Truck, Shield, CreditCard } from "lucide-react";
import { useTranslation } from "@/components/TranslationProvider";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const { t, locale } = useTranslation();

  useEffect(() => {
    setMounted(true);
    api.products.list().then(setProducts).catch(() => { });
  }, []);

  const bestsellers = products.filter((p: any) => p.bestseller);
  const newArrivals = products.filter((p: any) => p.isNew);

  if (!mounted) return null;

  return (
    <div className="bg-feminine-gradient">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("/images/hero.png")`
            }}
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-800/70 to-neutral-700/60" />
        </div>

        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FF69B4 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #C5A258 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Pink Accents */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-gentle-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-400/15 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-fuchsia-400/10 rounded-full blur-2xl animate-gentle-float" style={{ animationDelay: "4s" }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto animate-elegant-fade">
            <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-6 font-medium">{t('discoverOur')}</p>
            <h1 className="font-serif text-5xl sm:text-7xl text-white mb-6 text-shadow-elegant">
              {t('shopCollection')}
            </h1>
            <p className="text-2xl sm:text-3xl text-pink-300 mb-8 font-light">
              {t('styleElegance')}
            </p>
            <p className="text-lg sm:text-xl text-neutral-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('discoverTrendy')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={`/${locale}/shop`} className="bg-pink-gradient text-white px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase shadow-pink hover:shadow-pink-hover transition-all duration-300 transform hover:scale-105">
                {t('shopNow')}
              </Link>
              <Link href={`/${locale}/collections`} className="border-2 border-pink-400/50 text-pink-300 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase hover:bg-pink-400/10 transition-all duration-300">
                {t('viewCollections')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Truck,
              title: t('cashOnDelivery'),
              desc: t('cashOnDeliveryDesc')
            },
            {
              icon: Shield,
              title: t('premiumQuality'),
              desc: t('premiumQualityDesc')
            },
            {
              icon: CreditCard,
              title: t('fastDelivery'),
              desc: t('fastDeliveryDesc')
            }
          ].map((feature, i) => (
            <div key={i} className="text-center group animate-elegant-fade" style={{ animationDelay: `${i * 200}ms` }}>
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="font-serif text-xl text-white mb-3 group-hover:text-pink-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FF69B4 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #C5A258 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 animate-elegant-fade">
            <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t('curatedForYou')}</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4 text-shadow-elegant">{t('ourCollections')}</h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">{t('collectionsDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('rings'),
                desc: t('ringsDesc'),
                image: "/images/collection-rings.jpg",
                gradient: "from-pink-600/20 to-pink-800/30"
              },
              {
                title: t('necklaces'),
                desc: t('necklacesDesc'),
                image: "/images/collection-necklaces.jpg",
                gradient: "from-rose-600/20 to-rose-800/30"
              },
              {
                title: t('bracelets'),
                desc: t('braceletsDesc'),
                image: "/images/collection-bracelets.jpg",
                gradient: "from-fuchsia-600/20 to-fuchsia-800/30"
              }
            ].map((collection, i) => (
              <Link key={collection.title} href={`/${locale}/shop`} className="group block animate-elegant-fade" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-700 feminine-border transform group-hover:scale-105 transition-all duration-500 shadow-pink group-hover:shadow-pink-hover">
                  {/* Collection Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url("${collection.image}")`
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />

                  {/* Dark Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <div className="text-white">
                      <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-pink-300 transition-colors duration-300">
                        {collection.title}
                      </h3>
                      <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        {collection.desc}
                      </p>
                    </div>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>

                  {/* Sparkle Effects */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-60 animate-pulse" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gold-400 rounded-full opacity-0 group-hover:opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-elegant-fade">
            <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t('justIn')}</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4 text-shadow-elegant">{t('newArrivals')}</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">{t('discoverMore')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 8).map((product: any, i: number) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 to-gray-700">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t('mostLoved')}</p>
              <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4 text-shadow-elegant">{t('bestsellers')}</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.slice(0, 8).map((product: any, i: number) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-pink-300 text-xs tracking-[0.3em] uppercase mb-4">{t('stayInspired')}</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">{t('newsletterDesc')}</h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('enterYourEmail')}
              className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-pink-500/30 text-white placeholder-pink-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all duration-300"
            />
            <button className="bg-pink-gradient text-white px-8 py-3 rounded-full text-sm font-medium tracking-wider uppercase shadow-pink hover:shadow-pink-hover transition-all duration-300 transform hover:scale-105">
              {t('subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
