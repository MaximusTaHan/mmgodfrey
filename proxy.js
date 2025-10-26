import { NextResponse } from "next/server";
 
let locales = ['sv', 'en']
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
  // Check for locale in Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  
  if (acceptLanguage) {
    // Parse Accept-Language header and find matching locale
    const preferredLocales = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
      .map(lang => lang.split('-')[0]); // Get language part only (sv from sv-SE)
    
    for (const preferredLocale of preferredLocales) {
      if (locales.includes(preferredLocale)) {
        return preferredLocale;
      }
    }
  }
  
  // Default to Swedish
  return 'sv';
}
 
export function proxy(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  
  // Handle root path specifically
  if (pathname === '/') {
    request.nextUrl.pathname = `/${locale}`
  } else {
    request.nextUrl.pathname = `/${locale}${pathname}`
  }
  
  // e.g. incoming request is / -> /sv
  // e.g. incoming request is /products -> /sv/products
  return NextResponse.redirect(request.nextUrl)
}
 
