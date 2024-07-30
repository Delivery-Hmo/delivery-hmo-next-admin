"use server";

import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const onSearch = <T extends {}>(values: T) => {
  const page = getCookie("page", { cookies }) as string;
  const limit = getCookie("limit", { cookies }) as string;
  const pathname = getCookie("pathname", { cookies }) as string;
  let searchQuery = "";

  const formEntries = Object.entries(values);

  for (const [key, value] of formEntries) {
    if (key && !value) {
      setCookie(key, "", { cookies, expires: new Date() });

      continue;
    };

    searchQuery += `&${key}=${value}`;
    setCookie(key, value, { cookies });
  }

  const url = `${pathname}?pagina=${page}&limite=${limit}${searchQuery}`;

  redirect(url, RedirectType.replace);
};
