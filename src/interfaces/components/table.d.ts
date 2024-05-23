import { GetProps } from "../services/http";

export interface TableProps<T> extends GetProps {
  columns: Column<T>[];
  url?: string;
}

interface Column<T> {
  key: keyof T;
  title: string;
}
