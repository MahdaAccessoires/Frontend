import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Mahda Accessoires - Dark Pink Luxury",
  description: "Discover exquisite dark pink luxury accessories and jewelry. Handcrafted pieces including rings, necklaces, bracelets & earrings designed for modern elegance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-feminine-gradient text-neutral-100 font-sans antialiased">
        <Header />
        <CartDrawer />
        <main className="pt-16 sm:pt-20 min-h-screen">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-gentle-float" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: "2s" }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/3 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: "4s" }} />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
