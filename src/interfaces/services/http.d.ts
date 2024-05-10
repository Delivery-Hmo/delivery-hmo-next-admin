
import { BaseUrlTypes } from "@src/types/services/http";

export interface Get<T> {
  total: number;
  list: Array<T>;
}

export interface GetProps {
  baseUrlType: BaseUrlTypes;
  url?: string;
  page?: number;
  limit?: number;
  abortController?: AbortController;
}

export interface PostPutPatch extends GetProps {
  body: Record<string, any> | Record<string, any>[];
  method?: "POST" | "PUT" | "PATCH";
}