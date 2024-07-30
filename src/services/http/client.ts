"use client";

import { baseUrlsApis } from "@src/utils/constants";
import { getHeaders, handleError } from "@src/utils/functions";
import { GetProps, PostPutPatch } from "@src/interfaces/services/http";
import { getCurrentToken } from "../firebase/auth";

export const get = async <T>({ baseUrl, url, abortController }: GetProps) => {
  try {
    const token = await getCurrentToken();
    const response = await fetch(
      `${baseUrlsApis[baseUrl]}${url}`,
      {
        method: "GET",
        headers: getHeaders(token),
        signal: abortController?.signal,
      },
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

export const post = <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "POST" });

export const put = <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PUT" });

export const patch = <T>(props: PostPutPatch) => postPutPatch<T>({ ...props, method: "PATCH" });

export const postPutPatch = async <T>({ baseUrl, url, body, method, abortController, headers }: PostPutPatch) => {
  const token = await getCurrentToken();

  const response = await fetch(
    `${baseUrlsApis[baseUrl]}${url}`,
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


  return response.json() as Promise<T>;
};
