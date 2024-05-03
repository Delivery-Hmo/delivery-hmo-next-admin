import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
<<<<<<< HEAD
import { getCurrentToken } from "./services/firebase/auth";
=======
import { get } from "./services/http";

const toLogin = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/", request.url));

  request.cookies.getAll().forEach(c => {
    response.cookies.set(c.name, "", { expires: new Date() });
  });

  return response;
};
>>>>>>> b13e0f4f78d29c896f38fe123900cf959ba966d2

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
  const uid = request.cookies.get("uid")?.value;
  const dataTableCookie = request.cookies.get("dataTable")?.value;
  const customToken = request.cookies.get("customToken")?.value;

<<<<<<< HEAD
  if (pathname !== "/") {
    try {
      //token = await getCurrentToken();
    } catch (error) {
      console.log("hola");
      const responseRedirect = NextResponse.rewrite(new URL("/", request.url));

      responseRedirect.cookies.delete("pathname");
      responseRedirect.cookies.delete("page");
      responseRedirect.cookies.delete("limit");
      responseRedirect.cookies.delete("token");

      return responseRedirect;
    }
  }
=======
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
>>>>>>> b13e0f4f78d29c896f38fe123900cf959ba966d2

      if (message === "Unauthorized") {
        return toLogin(request);
      }
    } catch (error) {
      return toLogin(request);
    }
  }

  if (page && limit && dataTableCookie && (pageCookie !== page || limitCookie !== limit || pathname !== pathnameCookie || dataTableCookie !== dataTableCookie)) {
    const response = NextResponse.redirect(request.url);

    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);
    response.cookies.set("dataTable", dataTableCookie);

    return response;
  }

  if (page && limit && activeId && status && dataTableCookie && (activeId !== activeIdCookie || status !== statusCookie || pathname !== pathnameCookie || dataTableCookie !== dataTableCookie)) {
    const response = NextResponse.redirect(request.url);

    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);
    response.cookies.set("activeId", activeId);
    response.cookies.set("status", status);
    response.cookies.set("dataTable", dataTableCookie);

    return response;
  }

  const response = NextResponse.next();

  if (page && limit && dataTableCookie) {
    response.cookies.set("pathname", pathname);
    response.cookies.set("page", page);
    response.cookies.set("limit", limit);
    response.cookies.set("dataTable", dataTableCookie);

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