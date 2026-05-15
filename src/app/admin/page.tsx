"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [orderStats, setOrderStats] = useState<any>(null);
  const [productStats, setProductStats] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin_token")) {
      setLoggedIn(true);
      loadStats();
    }
  }, []);

  const loadStats = async () => {
    try {
      const [os, ps] = await Promise.all([api.orders.stats(), api.products.stats()]);
      setOrderStats(os);
      setProductStats(ps);
    } catch (e) {}
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.auth.login(email, password);
      localStorage.setItem("admin_token", res.access_token);
      setLoggedIn(true);
      loadStats();
    } catch (e) {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="font-serif text-3xl text-center mb-8">Admin Login</h1>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full border rounded px-3 py-2.5 text-sm bg-cream focus:outline-none focus:border-gold" />
            <button type="submit" className="w-full bg-gold-gradient text-white py-3 rounded text-sm font-medium tracking-wider uppercase">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-3xl">Dashboard</h1>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-charcoal">Logout</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-6 rounded-lg border">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Revenue</p>
          <p className="text-2xl font-serif text-gold-gradient mt-2">${orderStats?.totalRevenue?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Orders</p>
          <p className="text-2xl font-serif mt-2">{orderStats?.total || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-serif mt-2">{orderStats?.pending || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Products</p>
          <p className="text-2xl font-serif mt-2">{productStats?.total || 0}</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex gap-4">
        <Link href="/admin/products" className="flex-1 bg-charcoal text-white p-6 rounded-lg text-center hover:opacity-90">
          <p className="font-serif text-lg">Manage Products</p>
          <p className="text-xs text-gray-400 mt-1">Add, edit, remove products</p>
        </Link>
        <Link href="/admin/orders" className="flex-1 bg-charcoal text-white p-6 rounded-lg text-center hover:opacity-90">
          <p className="font-serif text-lg">Manage Orders</p>
          <p className="text-xs text-gray-400 mt-1">View and update order status</p>
        </Link>
      </div>
    </div>
  );
}
