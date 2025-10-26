import 'server-only'
 
const dictionaries = {
  en: () => import('../translations/en.json').then((module) => module.default),
  sv: () => import('../translations/sv.json').then((module) => module.default),
}
 
export const getTranslations = async (locale: 'en' | 'sv') => {
  const dictionaryLoader = dictionaries[locale];
  if (!dictionaryLoader) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return dictionaryLoader();
}