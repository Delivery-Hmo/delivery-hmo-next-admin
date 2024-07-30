import { GetProps } from "../services/http";
import { InputProps, SelectProps } from "antd";
import { baseUrls } from "@src/types/services/http";
import { InputType } from "../../types/components/table";

export interface TableProps<T> extends GetProps {
  columns: Column<T>[];
  url?: string;
  filters?: InputType<T>[];
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


export interface ItemSelect<K> extends Omit<SelectProps, "name"> {
  name: K;
  label: string;
  type?: "select";
  keyValue?: string;
  keyLabel?: string;
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
