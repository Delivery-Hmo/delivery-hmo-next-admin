import { GetProps } from "../services/http";
import { InputProps } from "antd";

export interface TableProps<T> extends GetProps {
  columns: Column<T>[];
  url?: string;
  filters?: Item<keyof T>[];
  onSearch?: (values: F) => void;
}

interface Column<T> {
  key: keyof T;
  title: string;
}

export interface Item<K> extends Omit<InputProps, "name"> {
  name: K;
  label: string;
}

interface FiltersProps<T> {
  items: Item<keyof T>[];
}
