import { create } from "zustand";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  material: string;
};

export type CartItem = { product: CartProduct; quantity: number };

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: CartProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setOpen: (open: boolean) => void;
  total: () => number;
  count: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) return { items: state.items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
  updateQuantity: (id, qty) => set((s) => ({ items: qty <= 0 ? s.items.filter((i) => i.product.id !== id) : s.items.map((i) => i.product.id === id ? { ...i, quantity: qty } : i) })),
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
