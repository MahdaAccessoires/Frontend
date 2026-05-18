"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/components/TranslationProvider";

export default function Footer() {
  const { t, locale } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-pink-300 mb-4">
              Mahda Accessoires
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {locale === 'ar' ? 'مجوهرات تعكس جمالك وأناقتك الفريدة' : locale === 'fr' ? 'Bijoux qui reflètent votre beauté et votre style unique' : 'Jewelry that reflects your unique beauty and style.'}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-serif text-sm tracking-widest uppercase mb-4 text-pink-300">
              {t('shop')}
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href={`/${locale}/shop`} className="hover:text-pink-400 transition">{locale === 'ar' ? 'كل المجوهرات' : locale === 'fr' ? 'Tous les bijoux' : 'All Jewelry'}</Link></li>
              <li><Link href={`/${locale}/shop`} className="hover:text-pink-400 transition">{locale === 'ar' ? 'خواتم' : locale === 'fr' ? 'Bagues' : 'Rings'}</Link></li>
              <li><Link href={`/${locale}/shop`} className="hover:text-pink-400 transition">{locale === 'ar' ? 'قلادات' : locale === 'fr' ? 'Colliers' : 'Necklaces'}</Link></li>
              <li><Link href={`/${locale}/shop`} className="hover:text-pink-400 transition">{locale === 'ar' ? 'أساور' : locale === 'fr' ? 'Bracelets' : 'Bracelets'}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm tracking-widest uppercase mb-4 text-pink-300">
              {t('contact')}
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">

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
              <a href="https://www.instagram.com/mahda.accessoires?igsh=MTluanU1YjFlbWE1" className="hover:text-pink-400 transition">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/14h8vVLbr5u/" className="hover:text-pink-400 transition">
                <FaFacebook size={18} />
              </a>
              <a href="https://www.tiktok.com/@mahda.accessoires?_r=1&_t=ZS-96L32yXUf3N" className="hover:text-pink-400 transition">
                <FaTiktok size={18} />
              </a>
              <a href="https://wa.me/212718924609" className="hover:text-pink-400 transition">
                <FaWhatsapp size={18} />
              </a>
              <a href="https://t.me/mahda_accessoires" className="hover:text-pink-400 transition">
                <FaTelegram size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-700/50 text-center text-xs text-neutral-400">
          2026 Mahda Accessoires. {t('allRightsReserved')}
        </div>

      </div>
    </footer>
  );
}