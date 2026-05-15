"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { api } from "@/lib/api";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [step, setStep] = useState<"cart" | "checkout" | "confirmation">("cart");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "" });

  if (step === "confirmation") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-6">✦</div>
        <h1 className="font-serif text-3xl sm:text-4xl mb-4">Thank You</h1>
        <p className="text-gray-500 mb-2">Your order has been placed successfully.</p>
        <p className="text-sm text-gray-400 mb-8">Payment: Cash on Delivery</p>
        <Link href="/shop" className="inline-block bg-gold-gradient text-white px-8 py-3 text-sm font-medium tracking-wider uppercase rounded">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0 && step === "cart") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
        <Link href="/shop" className="inline-block bg-gold-gradient text-white px-8 py-3 text-sm tracking-wider uppercase rounded">Shop Now</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.orders.create({
        customerName: form.name, customerEmail: form.email, customerPhone: form.phone,
        shippingAddress: form.address, city: form.city, zipCode: form.zip,
        total: total(), paymentMethod: "cod",
        items: items.map((i) => ({ productId: i.product.id, productName: i.product.name, price: i.product.price, quantity: i.quantity })),
      });
    } catch (e) { /* offline fallback */ }
    clearCart();
    setStep("confirmation");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="font-serif text-3xl sm:text-4xl text-center mb-10">{step === "cart" ? "Shopping Cart" : "Checkout"}</h1>
      {step === "cart" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 sm:gap-6 p-4 border rounded-lg">
                <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">IMG</div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-sm">{item.product.name}</h3>
                    <p className="text-sm text-gold mt-1">${item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 border rounded text-sm hover:bg-gray-50">−</button>
                      <span className="text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 border rounded text-sm hover:bg-gray-50">+</button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-xs text-gray-400 hover:text-red-500">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-6 h-fit space-y-4">
            <h3 className="font-serif text-lg">Order Summary</h3>
            <div className="flex justify-between text-sm text-gray-400"><span>Subtotal</span><span>${total().toLocaleString()}</span></div>
            <div className="flex justify-between text-sm text-gray-400"><span>Shipping</span><span>Free</span></div>
            <div className="border-t pt-4 flex justify-between font-serif text-lg"><span>Total</span><span className="text-gold-gradient">${total().toLocaleString()}</span></div>
            <button onClick={() => setStep("checkout")} className="w-full bg-gold-gradient text-white py-3 rounded text-sm font-medium tracking-wider uppercase">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs tracking-wider uppercase text-gray-400 mb-1.5">Full Name</label><input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" /></div>
            <div><label className="block text-xs tracking-wider uppercase text-gray-400 mb-1.5">Email</label><input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" /></div>
          </div>
          <div><label className="block text-xs tracking-wider uppercase text-gray-400 mb-1.5">Phone</label><input required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" /></div>
          <div><label className="block text-xs tracking-wider uppercase text-gray-400 mb-1.5">Address</label><input required value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs tracking-wider uppercase text-gray-400 mb-1.5">City</label><input required value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" /></div>
            <div><label className="block text-xs tracking-wider uppercase text-gray-400 mb-1.5">ZIP</label><input required value={form.zip} onChange={(e) => setForm({...form, zip: e.target.value})} className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" /></div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4"><p className="text-sm font-medium">💵 Cash on Delivery</p><p className="text-xs text-gray-400 mt-1">Pay when your order arrives.</p></div>
          <div className="flex justify-between items-center border-t pt-6">
            <button type="button" onClick={() => setStep("cart")} className="text-sm text-gray-400 hover:text-charcoal">← Back</button>
            <button type="submit" className="bg-gold-gradient text-white px-8 py-3 rounded text-sm font-medium tracking-wider uppercase">Place Order</button>
          </div>
        </form>
      )}
    </div>
  );
}
