import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED = new Set(['ko', 'en', 'lo']);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // root -> korean
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/ko';
    return NextResponse.redirect(url);
  }

  // allow /ko, /en, /lo and their children
  const first = pathname.split('/')[1];
  if (first && SUPPORTED.has(first)) {
    return NextResponse.next();
  }

  // Anything else -> pass through (Next config redirects handle /eng, /laos, *.html)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|public|images|admin|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};
