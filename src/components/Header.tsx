"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag } from "lucide-react";


const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count());
  const toggleCart = useCartStore((s) => s.toggleCart);

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
          <Link href="/" className="group">
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
