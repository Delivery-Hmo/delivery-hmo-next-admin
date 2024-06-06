"use server";

import { reloadTableTag } from "@src/utils/constants";
import { getCookie } from "cookies-next";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const onSearch = (formData: FormData) => {
  const page = getCookie("page", { cookies }) as string;
  const limit = getCookie("limit", { cookies }) as string;
  const pathname = getCookie("pathname", { cookies }) as string;
  let searchQuery = "";

  const formEntries = formData.entries();

  for (const [key, value] of formEntries) {
    if (!key || !value) continue;

    searchQuery += `&${key}=${value}`;
  }

  const url = `${pathname}?pagina=${page}&limite=${limit}${searchQuery}`;

  revalidateTag(reloadTableTag);
  redirect(url);
};
