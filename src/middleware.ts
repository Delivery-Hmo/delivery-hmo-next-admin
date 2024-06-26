import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { allUrlParamKeys, filterKeys } from "./utils/constants";

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
  const page = searchParams.get("pagina");
  const limit = searchParams.get("limite");

  if (!token && pathname !== "/") return toLogin(request);

  if (token && pathname === "/") return NextResponse.redirect(new URL("/inicio", request.url));

  if (page && limit) {
    const pathnameCookie = request.cookies.get("pathname")?.value;
    const allCookies = request.cookies.getAll();
    const allSearchParams = searchParams.entries();
    const filterSearchParams: { key: string, value: string; }[] = [];

    for (const [key, value] of allSearchParams) {
      if (!value) continue;

      if (key === "pagina") {
        filterSearchParams.push({ key: "page", value });
      }

      if (key === "limite") {
        filterSearchParams.push({ key: "limit", value });
      }

      if (!filterKeys.includes(key)) continue;

      filterSearchParams.push({ key, value });
    }

    const filterCookies = Object.values(allCookies).filter(({ name, value }) => value && filterKeys.includes(name));
    let urlValues: Record<string, string | null> = { pathname };
    let cookieValues: Record<string, string | undefined> = { pathname: pathnameCookie };

    filterSearchParams.forEach(({ key, value }) => {
      urlValues[key] = value;
    });

    filterCookies.forEach(({ name, value }) => {
      cookieValues[name] = value;
    });

    const responseRedirect = NextResponse.redirect(request.url);
    let redirect = false;

    for (const key of allUrlParamKeys) {
      const urlValue = urlValues[key];
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