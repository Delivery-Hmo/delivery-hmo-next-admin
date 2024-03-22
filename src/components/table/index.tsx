
import { Suspense } from "react";
import { Skeleton } from "antd";
import TableServer from "./tableServer";
import Pagination from "./pagination";
import { TableProps } from "@src/interfaces/components/table";
import Filters from "./filters";

interface Filter {
  name: string;
  placeholder: string;
}

const Table = <T extends {}>(props: TableProps<T>) => {
  const filtersData: Filter[] = [
    { name: "name", placeholder: "Filtrar por nombre" },
    { name: "email", placeholder: "Filtrar por email" },
  ];
  return (
    <>
      <Filters filters={filtersData} />
      <Suspense
        fallback={
          <Skeleton
            title={false}
            paragraph={{ rows: 6, width: "100%" }}
          />
        }
      >
        <TableServer {...props} />
      </Suspense>
      <Pagination />
    </>
  );
};

export default Table;