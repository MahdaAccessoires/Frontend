"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

const statusColors: Record<string, string> = { pending: "bg-yellow-100 text-yellow-800", shipped: "bg-blue-100 text-blue-800", delivered: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800" };

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const load = () => api.orders.list(filter || undefined).then(setOrders);
  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => { await api.orders.updateStatus(id, status); load(); };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl mb-8">Orders</h1>
      <div className="flex gap-2 mb-6">
        {["", "pending", "shipped", "delivered"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full border ${filter === s ? "bg-charcoal text-white" : "text-gray-500 hover:border-gold"}`}>
            {s || "All"}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white p-6 rounded-lg border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-serif text-sm">{o.customerName}</p>
                <p className="text-xs text-gray-400">{o.customerEmail} · {new Date(o.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${statusColors[o.status] || "bg-gray-100"}`}>{o.status}</span>
            </div>
            <div className="text-xs text-gray-400 mb-3">{o.shippingAddress}, {o.city} {o.zipCode}</div>
            <div className="space-y-1 mb-3">
              {o.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm"><span>{item.productName} ×{item.quantity}</span><span>${item.price}</span></div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <p className="font-serif text-gold-gradient">${o.total}</p>
              <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className="text-xs border rounded px-2 py-1">
                {["pending", "shipped", "delivered", "cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-gray-400 py-12">No orders found</p>}
      </div>
    </div>
  );
}
