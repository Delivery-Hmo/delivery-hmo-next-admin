import { GetProps } from "../services/http";
import { InputProps, SelectProps } from "antd";
import { baseUrls } from "@src/types/services/http";

export interface TableProps<T> extends GetProps {
  columns: Column<T>[];
  url?: string;
  filters?: (ItemInput<keyof T> | ItemSelect<keyof T>)[];
  onSearch?: (values: T) => void;
}

export interface Column<T> {
  key: keyof T;
  title: string;
}

export interface ItemInput<K> extends Omit<InputProps, "name"> {
  name: K;
  label: string;
  type?: "input";
}

export interface SelectOption {
  value: string;
  label: string;
}


export interface ItemSelect<K> extends Omit<select, "name"> {
  name: K;
  label: string;
  type?: "select";
  keyValue?: string;
  keyLabel?: string;
  options?: SelectOption[];
  loading?: boolean;
  baseUrl?: baseUrls;
  url?: string;
  page?: number;
}

export interface SelectGet {
  list: SelectResponse[],
  total: number;
}

export interface SelectResponse {
  id: string;
  name?: string;
  email?: string;
};
