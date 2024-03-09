export interface TableProps<T> {
  url: string;
  columns: Column<T>[];
  urlEdit?: string;
  urlDelete?: string;
}

interface Column<T> {
  key: keyof T;
  title: string;
}
