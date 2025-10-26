// Supported locales configuration
export const locales = ['sv', 'en'] as const;
export const defaultLocale = 'sv';

export type Locale = (typeof locales)[number];

// Validate if a string is a supported locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}