"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total } = useCartStore();
  if (!isOpen) return null;

  return (
    <>
      <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-serif text-xl">Your Cart</h2>
          <button onClick={() => setOpen(false)} className="p-2 text-gray-400 hover:text-charcoal">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center mt-12">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">IMG</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm truncate">{item.product.name}</h3>
                    <p className="text-sm text-gold mt-1">${item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 border rounded text-sm hover:bg-gray-100">−</button>
                      <span className="text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 border rounded text-sm hover:bg-gray-100">+</button>
                      <button onClick={() => removeItem(item.product.id)} className="ml-auto text-gray-400 hover:text-red-500 text-xs">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div className="flex justify-between font-serif text-lg">
              <span>Total</span>
              <span className="text-gold-gradient">${total().toLocaleString()}</span>
            </div>
            <Link href="/cart" onClick={() => setOpen(false)} className="block w-full bg-gold-gradient text-white text-center py-3 rounded text-sm font-medium tracking-wider uppercase hover:opacity-90">
              View Cart & Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
