"use server";

import { baseUrlsApis, reloadTableTag } from "@src/utils/constants";
import { getHeaders, handleError } from "@src/utils/functions";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { GetProps, PostPutPatch } from "@src/interfaces/services/http";
import { revalidateTag, unstable_cache } from "next/cache";

export const get = async <T>({ baseUrlType, url, page, limit, abortController }: GetProps) => {
  try {
    const token = getCookie("token", { cookies }) as string;

    if (page && limit) url += `?page=${page}&limit=${limit}`;

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

export const getCache = <T>(props: GetProps) => {
  const { page, limit } = props;

  const cache = unstable_cache(
    () => get<T>(props),
    [`page-${page}`, `limit-${limit}`],
    {
      revalidate: 300,
      tags: [reloadTableTag]
    }
  );

  return cache;
};

export const post = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "POST" });

export const put = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PUT" });

export const patch = async <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PATCH" });

export const postPutPatch = async <T>({ baseUrlType, url, body, method, abortController, pathToRevalidate }: PostPutPatch) => {
  const token = getCookie("token", { cookies }) as string;

  const response = await fetch(
    `${baseUrlsApis[baseUrlType]}${url}`,
    {
      method,
      body: JSON.stringify(body),
      headers: getHeaders(token),
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

