import { getCurrentToken, getHeaders, handleError } from "@src/utils/functions";

const baseUrl: string = "http://localhost:3001/";

export const get = async <T>(url: string, abortController?: AbortController) => {
  try {
    const token = await getCurrentToken();

    const response = await fetch(
      baseUrl + url,
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
    baseUrl + url,
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

