export interface TableProps<T> {
  url: string;
  columns: Column<T>[];
  urlEdit?: string;
  urlDelete?: string;
}

interface Column<T> {
  key: string;
  title: string;
}
