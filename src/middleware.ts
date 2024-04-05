import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from "./services/http";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const page = searchParams.get("pagina");
  const limit = searchParams.get("limite");
  const pageCookie = request.cookies.get("page")?.value;
  const limitCookie = request.cookies.get("limit")?.value;

  try {
    const { message } = await get<{ message: "ok" | "expired" | "Unauthorized"; }>({ baseUrlType: "companiesApi", url: "/auth/verifyToken" });

    if (message === "expired") {
      return NextResponse.redirect(request.url);
    }

    if (message === "Unauthorized") {
      request.cookies.delete("pathname");
      request.cookies.delete("page");
      request.cookies.delete("limit");
      request.cookies.delete("token");

      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    request.cookies.delete("pathname");
    request.cookies.delete("page");
    request.cookies.delete("limit");
    request.cookies.delete("token");

    return NextResponse.redirect(new URL("/", request.url));
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