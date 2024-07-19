import { type } from "os";
import { GetProps } from "../services/http";
import { InputProps, SelectProps } from "antd";

export interface TableProps<T> extends GetProps {
  columns: Column<T>[];
  url?: string;
  filters?: (ItemInput<keyof T> | ItemSelect<keyof T>)[];
  onSearch?: (values: F) => void;
}

interface Column<T> {
  key: keyof T;
  title: string;
}

export interface ItemInput<K> extends Omit<InputProps, "name"> {
  name: K;
  label: string;
  typeInput?: "input";
}

export interface ItemSelect<K> extends Omit<SelectProps, "name"> {
  name: K;
  label: string;
  typeInput?: "select";
}
interface FiltersProps<T> {
  items: (ItemInput<keyof T> | ItemSelect<keyof T>)[];
}
