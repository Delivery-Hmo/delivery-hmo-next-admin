
import { BaseUrl } from "@src/types/services/http";

export interface Get<T> {
  total: number;
  list: Array<T>;
}

export interface GetProps {
  baseUrl: BaseUrl;
  url?: string;
  abortController?: AbortController;
  searchParams?: Record<string, string>;
}

export interface PostPutPatch extends GetProps {
  body: Record<string, unknown>;
  method?: "POST" | "PUT" | "PATCH";
  pathToRevalidate?: string;
  formUrlencoded?: boolean;
  headers?: Record<string, string>;
}