import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from "./services/http";

const toLogin = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/", request.url));

  request.cookies.getAll().forEach(c => {
    response.cookies.set(c.name, "", { expires: new Date() });
  });

  return response;
};

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const page = searchParams.get("pagina");
  const limit = searchParams.get("limite");
  const activeId = searchParams.get("idActivo");
  const status = searchParams.get("estatus");

  const pathnameCookie = request.cookies.get("pathname")?.value;
  const pageCookie = request.cookies.get("page")?.value;
  const limitCookie = request.cookies.get("limit")?.value;
  const activeIdCookie = request.cookies.get("activeId")?.value;
  const statusCookie = request.cookies.get("status")?.value;
  const token = request.cookies.get("token")?.value;

  if (token) {
    try {
      const { message } = await get<{ message: "ok" | "expired" | "Unauthorized"; token?: string; }>({
        baseUrlType: "companiesApi",
        url: `/auth/verifyToken`
      });

      if (message === "expired") {
        const response = NextResponse.redirect(request.url);
        return response;
      }

      if (message === "Unauthorized") {
        return toLogin(request);
      }
    } catch (error) {
      return toLogin(request);
    }
  }

  if (page && limit && (pageCookie !== page || limitCookie !== limit || pathname !== pathnameCookie)) {
    const response = NextResponse.redirect(request.url);

    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);

    return response;
  }

  if (page && limit && activeId && status && (activeId !== activeIdCookie || status !== statusCookie)) {
    const response = NextResponse.redirect(request.url);

    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);
    response.cookies.set("activeId", activeId);
    response.cookies.set("status", status);

    return response;
  }

  const response = NextResponse.next();

  if (page && limit) {
    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);

    if (activeId && status) {
      response.cookies.set("activeId", activeId);
      response.cookies.set("status", status);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};