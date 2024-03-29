import { GetProps } from "../services/http";

export interface TableProps<T> extends GetProps {
  columns: Column<T>[];
  showEdit?: boolean;
  showDelete?: boolean;
}

interface Column<T> {
  key: keyof T;
  title: string;
}
