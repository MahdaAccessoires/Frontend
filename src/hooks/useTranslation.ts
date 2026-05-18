"use client";
import { usePathname } from 'next/navigation';
import { translations, Language, TranslationKey } from '@/lib/i18n';

export function useTranslation() {
  const pathname = usePathname();

  // Get locale from pathname with fallback
  const getLocaleFromPath = (): Language => {
    if (typeof window === 'undefined') {
      // Server-side: always return default locale to prevent hydration mismatch
      return 'fr';
    }
    // Client-side: extract from pathname
    const segments = pathname?.split('/') || [];
    const localeSegment = segments[1];
    return ['ar', 'fr', 'en'].includes(localeSegment) ? localeSegment as Language : 'fr';
  };

  const locale = getLocaleFromPath();

  const t = (key: string): string => {
    return (translations[locale] as any)[key] || (translations.fr as any)[key] || key;
  };

  const changeLanguage = (newLocale: Language) => {
    if (typeof window !== 'undefined') {
      // Get current path without locale
      const segments = pathname?.split('/') || [];
      const pathWithoutLocale = segments.slice(2).join('/') || '';
      const newPath = `/${newLocale}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
      window.location.href = newPath;
    }
  };

  return {
    t,
    locale,
    changeLanguage,
    availableLocales: Object.keys(translations) as Language[],
  };
}
