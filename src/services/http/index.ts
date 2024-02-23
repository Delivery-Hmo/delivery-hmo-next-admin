import { BaseUrlTypes } from "@src/types/services/htts";
import { baseUrlCompaniesApi, baseUrlsApis } from "@src/utils/constanst";
import { getCurrentToken, getHeaders, handleError } from "@src/utils/functions";
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const get = async <T extends { total?: number; }>(baseUrlType: BaseUrlTypes, url: string, abortController?: AbortController) => {
  try {
    const token = getCookie("token", { cookies }) as string;
    const page = getCookie("page", { cookies }) as string;
    const limit = getCookie("limit", { cookies }) as string;

    if (page && limit) url += `?page=${page}&limit=${limit}`;

    const response = await fetch(
      `${baseUrlsApis[baseUrlType]}${url}`,
      {
        method: 'GET',
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

export const patch = async <T>(url: string, body: Record<string, any>, abortController: AbortController) => {
  const token = await getCurrentToken();
  const response = await fetch(
    baseUrlCompaniesApi + url,
    {
      method: 'PATCH',
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

