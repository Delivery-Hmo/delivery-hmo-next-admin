"use server";

import { baseUrlCompaniesApi, baseUrlsApis } from "@src/utils/constants";
import { getHeaders, handleError } from "@src/utils/functions";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { GetProps, PostProps } from "@src/interfaces/services/http";
import { getCurrentToken } from "../firebase/auth";

export const get = async <T extends {}>({ baseUrlType, url, page, limit, abortController }: GetProps) => {
  try {
    const activeId = getCookie("activeId", { cookies }) as string;

    if (activeId) {
      let list = JSON.parse(getCookie("dataTable", { cookies })!) as Array<{ image: string; }>;
      const total = +getCookie("totalDataTable", { cookies })!;

      list = list.map(l => ({ ...l, image: l.image.replace("imagenesPerfil/", "imagenesPerfil%2F") }));

      return { list, total } as unknown as T;
    }

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

export const post = async <T extends {}>({ baseUrlType, url, body, abortController }: PostProps) => {
  try {
    const token = getCookie("token", { cookies }) as string;

    const response = await fetch(
      `${baseUrlsApis[baseUrlType]}${url}`,
      {
        method: "POST",
        body: JSON.stringify(body),
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
    console.log(error);
    throw handleError(error);
  }
};

export const patch = async <T>(url: string, body: Record<string, any>, abortController: AbortController) => {
  const token = await getCurrentToken();
  const response = await fetch(
    baseUrlCompaniesApi + url,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: getHeaders(token),
      signal: abortController?.signal
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw handleError(error);
  }

  return response.json() as Promise<T>;
}

