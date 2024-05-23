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
  const token = request.cookies.get("token")?.value;
  const uid = request.cookies.get("uid")?.value;
  const customToken = request.cookies.get("customToken")?.value;
  const page = searchParams.get("pagina");
  const limit = searchParams.get("limite");

  if (token && uid && !customToken) {
    try {
      const { message, token: customToken } = await get<{ message: "ok" | "expired" | "Unauthorized"; token?: string; }>({
        baseUrlType: "companiesApi",
        url: `/auth/verifyToken?uid=${uid}`
      });

      if (message === "expired") {
        const response = NextResponse.redirect(request.url);

        response.cookies.set("customToken", customToken!);

        return response;
      }

      if (message === "Unauthorized") {
        return toLogin(request);
      }
    } catch (error) {
      return toLogin(request);
    }
  }

  if (page && limit) {
    const pathnameCookie = request.cookies.get("pathname")?.value;
    const pageCookie = request.cookies.get("page")?.value;
    const limitCookie = request.cookies.get("limit")?.value;

    const urlValues: Record<string, string | null> = {
      pathname,
      page,
      limit,
    };

    const cookieValues: Record<string, string | undefined> = {
      pathname: pathnameCookie,
      page: pageCookie,
      limit: limitCookie,
    };

    const responseRedirect = NextResponse.redirect(request.url);
    let redirect = false;

    const entries = Object.entries(urlValues);

    for (const [key, urlValue] of entries) {
      const cookieValue = cookieValues[key];

      if (!urlValue && cookieValue) {
        responseRedirect.cookies.set(key, "", { expires: new Date() });
        redirect = true;
        continue;
      }

      if (urlValue && urlValue !== cookieValue) {
        responseRedirect.cookies.set(key, urlValue);
        redirect = true;
      }
    }
    if (redirect) {
      return responseRedirect;
    }

    const response = NextResponse.next();

    Object.entries(urlValues).forEach(([key, urlValue]) => {
      responseRedirect.cookies.set(key, urlValue!);
    });

    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};