import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.url.split("?")[0];
  const params: string | undefined = request.url.split("?")[1];
  //cuidado con esta linea en prod hay que ajustarla
  const pathname = `${url.split("http://localhost:3000")[1]}`;
  const response = NextResponse.next();

  if (params) {
    const arrayParams = params.split("&");

    arrayParams.forEach((param) => {
      const [key, value] = param.split("=");

      if (["pagina", "limite"].includes(key)) {
        response.cookies.set(key, value);
      }
    });
  }

  response.cookies.set("pathname", pathname);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};