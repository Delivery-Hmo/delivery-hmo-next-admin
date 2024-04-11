import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from "./services/http";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const page = searchParams.get("pagina");
  const limit = searchParams.get("limite");
  const pageCookie = request.cookies.get("page")?.value;
  const limitCookie = request.cookies.get("limit")?.value;
  const pathnameCookie = request.cookies.get("pathname")?.value;
  const token = request.cookies.get("token")?.value;
  const uid = request.cookies.get("uid")?.value;

  if (token && uid) {
    try {
      const { message, token } = await get<{ message: "ok" | "expired" | "Unauthorized"; token?: string; }>({ baseUrlType: "companiesApi", url: `/auth/verifyToken?uid=${uid}` });

      if (message === "expired" && token) {
        const response = NextResponse.redirect(request.url);

        response.cookies.set("token", token);

        return response;
      }

      if (message === "Unauthorized") {
        const response = NextResponse.redirect(new URL("/", request.url));

        response.cookies.delete("pathname");
        response.cookies.delete("page");
        response.cookies.delete("limit");
        response.cookies.delete("token");
        response.cookies.delete("uid");

        return;
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/", request.url));

      response.cookies.delete("pathname");
      response.cookies.delete("page");
      response.cookies.delete("limit");
      response.cookies.delete("token");
      response.cookies.delete("uid");

      return response;
    }
  }

  if (page && limit && (pageCookie !== page || limitCookie !== limit || pathname !== pathnameCookie)) {
    const response = NextResponse.redirect(request.url);

    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);

    return response;
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