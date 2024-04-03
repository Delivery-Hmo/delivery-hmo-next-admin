import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentToken } from "./services/firebase/auth";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const page = searchParams.get("pagina");
  const limit = searchParams.get("limite");
  const pageCookie = request.cookies.get("page")?.value;
  const limitCookie = request.cookies.get("limit")?.value;
  let token = "";

  if (pathname !== "/") {
    try {
      token = await getCurrentToken();
    } catch (error) {
      console.log(error, "hola erro");
      const responseRedirect = NextResponse.rewrite(new URL("/", request.url));

      responseRedirect.cookies.delete("pathname");
      responseRedirect.cookies.delete("page");
      responseRedirect.cookies.delete("limit");
      responseRedirect.cookies.delete("token");

      return responseRedirect;
    }
  }

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