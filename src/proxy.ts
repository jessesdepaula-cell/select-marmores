import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { MEMBER_COOKIE, verifyMemberToken } from '@/lib/member-auth';

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/membros')) {
    const token = req.cookies.get(MEMBER_COOKIE)?.value;
    if (!verifyMemberToken(token)) {
      const url = req.nextUrl.clone();
      url.pathname = '/entrar';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/membros/:path*'],
};
