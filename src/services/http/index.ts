"use server"

import { baseUrlsApis, filterKeys } from "@src/utils/constants";
import { getHeaders, handleError } from "@src/utils/functions";
import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { GetProps, PostPutPatch } from "@src/interfaces/services/http";
import { revalidateTag, unstable_cache } from "next/cache";

export const get = async <T>({ baseUrlType, url, abortController }: GetProps) => {
  try {
    const token = getCookie("token", { cookies }) as string;
    const allCookies = getCookies({ cookies });
    const cookieEntries = Object.entries(allCookies).filter(([key, value]) => value && filterKeys.includes(key));

    for (let i = 0; i < cookieEntries.length; i++) {
      const [key, value] = cookieEntries[i];

      if (i === 0) {
        url += `?${key}=${value}`;
        continue;
      }

      url += `&${key}=${value}`;
    }

    const response = await fetch(
      `${baseUrlsApis[baseUrlType]}${url}`,
      {
        method: "GET",
        headers: getHeaders(token),
        signal: abortController?.signal
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw handleError(error);
    }

    const json = await response.json() as T;

    return json;
  } catch (error) {
    throw handleError(error);
  }
};

export const getCache = unstable_cache(
  async <T>(props: GetProps) => get<T>(props),
  ['my-app-user'],
);

export const post = <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "POST" });

export const put = <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PUT" });

export const patch = <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PATCH" });

export const postPutPatch = async <T>({ baseUrlType, url, body, method, abortController, pathToRevalidate, headers }: PostPutPatch) => {
  const token = getCookie("token", { cookies }) as string;

  const response = await fetch(
    `${baseUrlsApis[baseUrlType]}${url}`,
    {
      method,
      body: JSON.stringify(body),
      headers: headers || getHeaders(token),
      signal: abortController?.signal
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw handleError(error);
  }

  if (pathToRevalidate) revalidateTag(pathToRevalidate);

  return response.json() as Promise<T>;
}

