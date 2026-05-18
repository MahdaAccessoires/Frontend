"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag, Globe } from "lucide-react";
import { useTranslation } from "@/components/TranslationProvider";


const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const { t, locale, changeLanguage } = useTranslation();

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/shop`, label: t('shop') },
    { href: `/${locale}/collections`, label: t('collections') },
  ];

  const languages = [
    { code: 'ar', name: 'العربية', flag: 'AR' },
    { code: 'fr', name: 'Français', flag: 'FR' },
    { code: 'en', name: 'English', flag: 'EN' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-feminine-gradient/90 backdrop-blur-lg border-b border-pink-500/30 shadow-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>

          {/* Logo */}
          <Link href={`/${locale}`} className="group">
            <div className="flex items-center gap-3">


              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-pink-gradient group-hover:text-pink-400 transition-all duration-300">
                Mahda Accessoires
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`group relative px-4 py-2 rounded-full transition-all duration-300 ${pathname === l.href ? "bg-pink-500/20 text-pink-300" : "text-neutral-600 hover:text-pink-400 hover:bg-pink-500/10"}`}>
                <span className="text-sm font-medium tracking-wide">
                  {l.label}
                </span>
                {pathname === l.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="hidden sm:flex items-center gap-2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              aria-label="Language"
            >
              <Globe className="w-4 h-4 text-pink-400" />
              <span className="text-xs text-pink-400 font-medium">
                {languages.find(lang => lang.code === locale)?.flag}
              </span>
            </button>

            {/* Language Dropdown */}
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-gray-800/95 backdrop-blur-sm rounded-xl border border-pink-500/30 shadow-2xl py-2 min-w-[150px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code as 'ar' | 'fr' | 'en');
                      setLangOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-pink-500/10 transition-colors duration-200 flex items-center gap-3 ${locale === lang.code ? 'bg-pink-500/20 text-pink-300' : 'text-gray-300'
                      }`}
                  >
                    <span className="text-sm">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                    {locale === lang.code && (
                      <span className="ml-auto text-pink-400 text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group"
            aria-label="Cart"
          >
            <div className="relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-gradient text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="sm:hidden bg-neutral-800/90 backdrop-blur-lg border-t border-pink-500/30 px-4 py-6 space-y-2 animate-elegant-fade">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 ${pathname === l.href ? "bg-pink-500/20 text-pink-300" : "text-neutral-600 hover:text-pink-400 hover:bg-pink-500/10"}`}
            >
              <span className="text-sm font-medium tracking-wide">{l.label}</span>
              {pathname === l.href && (
                <span className="ml-auto w-2 h-2 bg-pink-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
