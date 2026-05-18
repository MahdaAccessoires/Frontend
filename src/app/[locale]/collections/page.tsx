import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function CollectionsPage() {
  const { t, locale } = useTranslation();

  const collections = [
    {
      title: t('rings'),
      desc: t('ringsDesc'),
      image: "/images/collection-rings.jpg",
      gradient: "from-pink-600/30 to-pink-800/40"
    },
    {
      title: t('necklaces'),
      desc: t('necklacesDesc'),
      image: "/images/collection-necklaces.jpg",
      gradient: "from-rose-600/30 to-rose-800/40"
    },
    {
      title: t('bracelets'),
      desc: t('braceletsDesc'),
      image: "/images/collection-bracelets.jpg",
      gradient: "from-fuchsia-600/30 to-fuchsia-800/40"
    },
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">
        {/* Header */}
        <div className="text-center mb-20 animate-elegant-fade">
          <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">{t('curatedForYou')}</p>
          <h1 className="font-serif text-4xl sm:text-6xl text-white mb-6 text-shadow-elegant">{t('ourCollections')}</h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">{t('collectionsDesc')}</p>
        </div>

        {/* Collections Grid */}
        <div className="space-y-32">
          {collections.map((col, i) => (
            <div key={col.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-elegant-fade`} style={{ animationDelay: `${i * 300}ms` }}>
              {/* Image Section */}
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden feminine-border shadow-pink group-hover:shadow-pink-hover transition-all duration-500">
                    {/* Collection Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url("${col.image}")`
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient}`} />

                    {/* Dark Overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Sparkle Effects */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-60 animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-gold-400 rounded-full opacity-0 group-hover:opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }} />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-5xl text-white mb-4 text-shadow-elegant">{col.title}</h2>
                    <div className="w-20 h-1 bg-pink-gradient rounded-full mb-6" />
                  </div>

                  <p className="text-neutral-300 text-lg leading-relaxed mb-8">
                    {col.desc}
                  </p>

                  <div className="space-y-4">
                    <Link
                      href={`/${locale}/shop`}
                      className="inline-flex items-center gap-3 bg-pink-gradient text-white px-8 py-3 text-sm font-medium tracking-widest uppercase rounded-full shadow-pink hover:shadow-pink-hover transition-all duration-300 transform hover:scale-105"
                    >
                      {t('viewCollection')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>

                  {/* Features */}
                  <div className="pt-6 space-y-3">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
