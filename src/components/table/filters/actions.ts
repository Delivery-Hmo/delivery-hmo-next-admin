"use server";

import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

export const onSearch = async <T extends {}>(values: T) => {
  const page = getCookie("page", { cookies }) as string;
  const limit = getCookie("limit", { cookies }) as string;
  const pathname = getCookie("pathname", { cookies }) as string;
  let searchQuery = "";

  const formEntries = Object.entries(values);

  for (const [key, value] of formEntries) {
    if (key && !value) {
      deleteCookie(key, { cookies });

      continue;
    };

    searchQuery += `&${key}=${value}`;
    setCookie(key, value, { cookies });
  }

  const url = `${pathname}?pagina=${page}&limite=${limit}${searchQuery}`;

  return url;
};
