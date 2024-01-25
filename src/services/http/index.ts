import { getCurrentToken, getHeaders, handleError } from "@src/utils/functions";
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

type BaseUrlTypes = "companiesApi";

const baseUrlCompaniesApi: string = "http://localhost:3001/";

const baseUrls: Record<BaseUrlTypes, string> = {
  "companiesApi": "http://localhost:3001/"
};

export const get = async <T>(baseUrlType: BaseUrlTypes, url: string, abortController?: AbortController) => {
  try {
    const token = getCookie("token", { cookies }) as string;
    const page = getCookie("page", { cookies }) as string;
    const limit = getCookie("limit", { cookies }) as string;

    const response = await fetch(
      `${baseUrls[baseUrlType]}${url}?page=${page}&limit=${limit}`,
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

    return response.json() as Promise<T>;
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
    throw error;
  }

  return response.json() as Promise<T>;
}

