export interface TableProps<T> {
  url: string;
  columns: Column[];
  urlEdit?: string;
  urlDelete?: string;
}

interface Column {
  key: string;
  title: string;
}
