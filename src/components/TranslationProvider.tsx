"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { translations, Language, TranslationKey } from '@/lib/i18n';

interface TranslationContextType {
  t: (key: string) => string;
  locale: Language;
  changeLanguage: (locale: Language) => void;
  availableLocales: Language[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Language>('fr');

  useEffect(() => {
    // Get locale from pathname on client side only
    const segments = pathname?.split('/') || [];
    const localeSegment = segments[1];
    const detectedLocale = ['ar', 'fr', 'en'].includes(localeSegment) ? localeSegment as Language : 'fr';
    setLocale(detectedLocale);
  }, [pathname]);

  const t = (key: string): string => {
    return (translations[locale] as any)[key] || (translations.fr as any)[key] || key;
  };

  const changeLanguage = (newLocale: Language) => {
    const segments = pathname?.split('/') || [];
    const pathWithoutLocale = segments.slice(2).join('/') || '';
    const newPath = `/${newLocale}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
    window.location.href = newPath;
  };

  return (
    <TranslationContext.Provider value={{
      t,
      locale,
      changeLanguage,
      availableLocales: Object.keys(translations) as Language[],
    }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}
