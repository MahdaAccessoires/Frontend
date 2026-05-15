"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="sm:hidden p-2" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
          <Link href="/">
            <h1 className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-gold-gradient">Mahda Accessoires</h1>
          </Link>
          <nav className="hidden sm:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`text-sm tracking-widest uppercase transition-colors hover:text-gold ${pathname === l.href ? "text-gold" : "text-gray-500"}`}>
                {l.label}
              </Link>
            ))}
          </nav>
          <button onClick={toggleCart} className="relative p-2 hover:text-gold transition-colors" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold-gradient text-white text-xs font-semibold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="sm:hidden bg-cream border-b border-gray-200 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className={`block text-sm tracking-widest uppercase py-2 ${pathname === l.href ? "text-gold" : "text-gray-500"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
