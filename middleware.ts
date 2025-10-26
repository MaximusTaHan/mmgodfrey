import { proxy } from './proxy.js'

export const middleware = proxy

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}