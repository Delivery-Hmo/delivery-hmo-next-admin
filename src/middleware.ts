import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const page = searchParams.get("pagina");
  const limit = searchParams.get("limite");
  const pageCookie = request.cookies.get("page")?.value;
  const limitCookie = request.cookies.get("limit")?.value;

  if (page && limit && (pageCookie !== page || limitCookie !== limit)) {
    const responseRedirect = NextResponse.redirect(request.url);

    responseRedirect.cookies.set("pathname", pathname);
    responseRedirect.cookies.set("page", page);
    responseRedirect.cookies.set("limit", limit);

    return responseRedirect;
  }

  const response = NextResponse.next();

  if (page && limit) {
    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};