"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useTranslation } from "@/components/TranslationProvider";

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total } = useCartStore();
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <>
      <div onClick={() => setOpen(false)} className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50" />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-neutral-800 to-neutral-700 z-50 shadow-2xl flex flex-col">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='600' viewBox='0 0 400 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath fill='%23FF69B4' d='M200 50c-50 0-100 25-100 75s50 75 100 75 100-25 100-75-50-75-100-75zm0 150c-30 0-60 15-60 45s30 45 60 45 60-15 60-45-30-45-60-45zm0 150c-20 0-40 10-40 30s20 30 40 30 40-10 40-30-20-30-40-30z' opacity='0.3'/%3E%3Cpath stroke='%23EC4899' stroke-width='2' d='M150 100l100 100m-50-50l50 50m-75-25l50 50' opacity='0.5'/%3E%3Ccircle cx='100' cy='200' r='15' fill='%23F472B6' opacity='0.4'/%3E%3Ccircle cx='300' cy='400' r='20' fill='%23F9A8D4' opacity='0.4'/%3E%3Ccircle cx='200' cy='300' r='12' fill='%23FBCFE8' opacity='0.4'/%3E%3Cpath fill='%23FFB6C1' d='M50 150c10-20 30-30 50-30s40 10 50 30c10 20 10 40 0 50-10 20-30 30-50 30s-40-10-50-30c-10-20-10-40 0-50z' opacity='0.3'/%3E%3Cpath fill='%23C5A258' d='M250 450c15-10 35-10 50 0s10 25 0 40c-10 15-35 15-50 0s-10-25 0-40z' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        <div className="flex items-center justify-between p-6 border-b border-neutral-600">
          <h2 className="font-serif text-xl text-white">{t('shoppingCart')}</h2>
          <button onClick={() => setOpen(false)} className="p-2 text-neutral-400 hover:text-pink-400 transition-colors">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-neutral-400 text-center mt-12">{t('yourCartIsEmpty')}</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-neutral-600 rounded-lg flex items-center justify-center text-xs text-neutral-500">IMG</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm text-white truncate">{item.product.name}</h3>
                    <p className="text-sm text-pink-400 mt-1">${item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 border border-pink-500/30 rounded text-sm hover:bg-pink-500/10 transition-colors">−</button>
                      <span className="text-sm text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 border border-pink-500/30 rounded text-sm hover:bg-pink-500/10 transition-colors">+</button>
                      <button onClick={() => removeItem(item.product.id)} className="ml-auto text-neutral-400 hover:text-red-400 text-xs transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-neutral-600 space-y-4">
            <div className="flex justify-between font-serif text-lg text-white">
              <span>Total</span>
              <span className="text-pink-gradient">${total().toLocaleString()}</span>
            </div>
            <Link href="/cart" onClick={() => setOpen(false)} className="block w-full bg-pink-gradient text-white text-center py-3 rounded text-sm font-medium tracking-wider uppercase hover:shadow-pink-hover transition-all duration-300">
              View Cart & Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
