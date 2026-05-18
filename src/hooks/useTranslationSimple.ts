"use client";
import { usePathname } from 'next/navigation';
import { translations, Language } from '@/lib/i18n';

export function useTranslation() {
  const pathname = usePathname();

  const getLocaleFromPath = (): Language => {
    if (typeof window === 'undefined') {
      // Server-side: return default locale
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

  return { t, locale };
}
