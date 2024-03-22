
import { BaseUrlTypes } from "@src/types/services/http";

export interface Get<T> {
  total: number;
  list: Array<T>;
}

export interface GetProps {
  baseUrlType: BaseUrlTypes;
  url?: string;
  abortController?: AbortController;
}

export interface PostProps extends GetProps {
  body: Record<string, any> | Record<string, any>[];
}