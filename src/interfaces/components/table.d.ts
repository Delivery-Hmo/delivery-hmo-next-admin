import { GetProps } from "../services/http";
import { InputProps } from "antd";

export interface TableProps<T, F = undefined> extends GetProps {
  columns: Column<T>[];
  showEdit?: boolean;
  showDelete?: boolean;
  filters?: Item<keyof F>[];
  onSearch?: (values: F) => void;
}

interface Column<T> {
  key: keyof T;
  title: string;
}

export interface Item<K> extends Omit<InputProps, "name"> {
  name: K;
}

interface FiltersProps<T> {
  items: Item<keyof T>[];
  onSearch: ((values: T) => void) | undefined;
}
