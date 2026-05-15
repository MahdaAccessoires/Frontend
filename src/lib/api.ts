const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function apiFetch(path: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const headers: Record<string, string> = { "Content-Type": "application/json", ...((options?.headers as Record<string, string>) || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export const api = {
  products: {
    list: (params?: string) => apiFetch(`/products${params ? `?${params}` : ""}`),
    get: (id: string) => apiFetch(`/products/${id}`),
    create: (data: any) => apiFetch("/products", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiFetch(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => apiFetch(`/products/${id}`, { method: "DELETE" }),
    stats: () => apiFetch("/products/stats"),
  },
  orders: {
    list: (status?: string) => apiFetch(`/orders${status ? `?status=${status}` : ""}`),
    get: (id: string) => apiFetch(`/orders/${id}`),
    create: (data: any) => apiFetch("/orders", { method: "POST", body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) => apiFetch(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
    stats: () => apiFetch("/orders/stats"),
  },
  auth: {
    login: (email: string, password: string) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  },
};
