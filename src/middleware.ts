import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { readingSlug } from '../reading-slugs';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let segments: string[];
  try {
    segments = pathname.split('/').map(decodeURIComponent);
  } catch {
    return NextResponse.next();
  }
  const canonical = segments
    .map((segment, index) => (index > 1 ? readingSlug(segment) : segment))
    .join('/');
  if (pathname !== canonical) {
    const url = request.nextUrl.clone();
    url.pathname = canonical;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/articles/:path*', '/devotions/:path*', '/expositions/:path*'],
};
