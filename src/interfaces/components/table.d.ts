import { type } from "os";
import { GetProps } from "../services/http";
import { InputProps, SelectProps } from "antd";

export interface TableProps<T> extends GetProps {
  columns: Column<T>[];
  url?: string;
  filters?: (ItemInput<keyof T> | ItemSelect<keyof T>)[];
  onSearch?: (values: F) => void;
}

export interface Column<T> {
  key: keyof T;
  title: string;
}

export interface ItemInput<K> extends Omit<InputProps, "name"> {
  name: K;
  label: string;
  typeInput?: "input";
}

export interface ItemSelect<K> extends Omit<select, "name"> {
  name: K;
  label: string;
  typeInput?: "select";
  loading?: boolean;
  options?: { value: string | number, label: string }[];
}

export interface FiltersProps<T> {
  items: (ItemInput<keyof T> | ItemSelect<keyof T>)[];
}
