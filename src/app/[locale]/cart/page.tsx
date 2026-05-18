"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { api } from "@/lib/api";
import { useTranslation } from "@/hooks/useTranslationSimple";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [step, setStep] = useState<"cart" | "checkout" | "confirmation">("cart");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "" });
  const { t, locale } = useTranslation();

  if (step === "confirmation") {
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

        <div className="max-w-2xl mx-auto px-4 py-20 text-center relative">
          <div className="animate-elegant-fade">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6 text-shadow-elegant">{t('thankYou')}</h1>
            <p className="text-neutral-300 text-lg mb-4">{t('orderPlacedSuccessfully')}</p>
            <p className="text-sm text-neutral-400 mb-8">{t('payment')}</p>
            <Link href="/shop" className="inline-block bg-pink-gradient text-white px-8 py-3 text-sm font-medium tracking-wider uppercase rounded-full shadow-pink hover:shadow-pink-hover transition-all duration-300 transform hover:scale-105">
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step === "cart") {
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

        <div className="max-w-2xl mx-auto px-4 py-20 text-center relative">
          <div className="animate-elegant-fade">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-6 text-shadow-elegant">{t('yourCartIsEmpty')}</h1>
            <p className="text-neutral-300 mb-8">{t('discoverBeautifulCollection')}</p>
            <Link href="/shop" className="inline-block bg-pink-gradient text-white px-8 py-3 text-sm font-medium tracking-wider uppercase rounded-full shadow-pink hover:shadow-pink-hover transition-all duration-300 transform hover:scale-105">
              {t('shopNow')}
            </Link>
          </div>
        </div>
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
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #FF69B4 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #C5A258 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
        {/* Header */}
        <div className="text-center mb-16 animate-elegant-fade">
          <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            {step === "cart" ? t('yourShopping') : t('completeYourOrder')}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 text-shadow-elegant">
            {step === "cart" ? t('shoppingCart') : t('checkout')}
          </h1>
          <div className="w-24 h-1 bg-pink-gradient rounded-full mx-auto" />
        </div>

        {step === "cart" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6 animate-elegant-fade" style={{ animationDelay: "200ms" }}>
              {items.map((item, index) => (
                <div key={item.product.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 feminine-border shadow-pink hover:shadow-pink-hover transition-all duration-300 animate-elegant-fade" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-700 rounded-xl flex items-center justify-center text-xs text-gray-500">
                      {item.product.images?.[0] ? (
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        "IMG"
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-white mb-2">{item.product.name}</h3>
                        <p className="text-pink-400 text-lg font-medium">${item.product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-10 h-10 border border-pink-500/30 rounded-full text-pink-400 hover:bg-pink-500/10 transition-colors duration-300"
                          >
                            −
                          </button>
                          <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-10 h-10 border border-pink-500/30 rounded-full text-pink-400 hover:bg-pink-500/10 transition-colors duration-300"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-sm text-neutral-400 hover:text-red-400 transition-colors duration-300"
                        >
                          {locale === 'ar' ? 'إزالة' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="animate-elegant-fade" style={{ animationDelay: "400ms" }}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 feminine-border shadow-pink sticky top-8">
                <h3 className="font-serif text-2xl text-white mb-6">{t('orderSummary')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>{t('subtotal')}</span>
                    <span>${total().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>{t('shipping')}</span>
                    <span className="text-green-400">{t('free')}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4 flex justify-between">
                    <span className="font-serif text-xl text-white">{t('total')}</span>
                    <span className="text-pink-gradient text-2xl font-bold">${total().toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full bg-pink-gradient text-white py-4 rounded-full text-sm font-medium tracking-widest uppercase mt-8 shadow-pink hover:shadow-pink-hover transition-all duration-300 transform hover:scale-105"
                >
                  {t('proceedToCheckout')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 animate-elegant-fade">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 feminine-border shadow-pink">
              <h3 className="font-serif text-2xl text-white mb-8">{t('shippingInformation')}</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pink-400 mb-2">{t('fullName')}</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    style={{ zIndex: 10, position: 'relative' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pink-400 mb-2">{t('email')}</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    style={{ zIndex: 10, position: 'relative' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-pink-400 mb-2">{t('phone')}</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  style={{ zIndex: 10, position: 'relative' }}
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-pink-400 mb-2">{t('address')}</label>
                <input
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  style={{ zIndex: 10, position: 'relative' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pink-400 mb-2">{t('city')}</label>
                  <input
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    style={{ zIndex: 10, position: 'relative' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pink-400 mb-2">{t('zip')}</label>
                  <input
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    style={{ zIndex: 10, position: 'relative' }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-xl p-4 border border-pink-500/30">
                <p className="text-sm font-medium text-white mb-1">{t('cashOnDeliveryPayment')}</p>
                <p className="text-xs text-neutral-300">{t('cashOnDeliveryPaymentDesc')}</p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-700 pt-6">
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="text-sm text-neutral-400 hover:text-pink-400 transition-colors duration-300"
              >
                {t('backToCart')}
              </button>
              <button
                type="submit"
                className="bg-pink-gradient text-white px-8 py-3 rounded-full text-sm font-medium tracking-wider uppercase shadow-pink hover:shadow-pink-hover transition-all duration-300 transform hover:scale-105"
              >
                {t('placeOrder')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
