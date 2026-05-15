"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gold mb-4">
              Mahda Accessoires
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Jewelry that reflects your unique beauty and style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-serif text-sm tracking-widest uppercase mb-4">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-gold transition">All Jewelry</Link></li>
              <li><Link href="/shop" className="hover:text-gold transition">Rings</Link></li>
              <li><Link href="/shop" className="hover:text-gold transition">Necklaces</Link></li>
              <li><Link href="/shop" className="hover:text-gold transition">Bracelets</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm tracking-widest uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">

              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>mahda.accessoires@gmail.com</span>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+212 718-924609</span>
              </li>

              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Casablanca, Maroc</span>
              </li>

            </ul>
            {/* Social Media */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.instagram.com/mahda.accessoires?igsh=MTluanU1YjFlbWE1" className="hover:text-gold transition">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/14h8vVLbr5u/" className="hover:text-gold transition">
                <FaFacebook size={18} />
              </a>
              <a href="https://www.tiktok.com/@mahda.accessoires?_r=1&_t=ZS-96L32yXUf3N" className="hover:text-gold transition">
                <FaTiktok size={18} />
              </a>
              <a href="https://wa.me/212718924609" className="hover:text-gold transition">
                <FaWhatsapp size={18} />
              </a>
              <a href="https://t.me/mahda_accessoires" className="hover:text-gold transition">
                <FaTelegram size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
          © 2026 Mahda Accessoires. All rights reserved.
        </div>

      </div>
    </footer>
  );
}