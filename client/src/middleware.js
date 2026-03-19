import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ['/dashboard', '/admin', '/checkout', '/lessons'];
const adminPaths = ['/admin'];

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Strip locale prefix for path checking
  const pathWithoutLocale = pathname.replace(/^\/(ru|kz)/, '') || '/';

  // Check if path needs protection
  const isProtected = protectedPaths.some(p => pathWithoutLocale.startsWith(p));
  const isAdmin = adminPaths.some(p => pathWithoutLocale.startsWith(p));

  if (isProtected) {
    // Check for auth token in cookies or Authorization header
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      // Redirect to login with return URL
      const locale = pathname.match(/^\/(ru|kz)/)?.[1] || 'ru';
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Run intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ru|kz)/:path*'],
};
