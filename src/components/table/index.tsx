import { Suspense } from "react";
import { Skeleton } from "antd";
import ServerTable from "./serverTable";
import Pagination from "./pagination";
import { TableProps } from "@src/interfaces/components/table";
import Filters from "./filters";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

interface Filter {
  name: string;
  placeholder: string;
}

const Table = <T extends {}>(props: TableProps<T>) => {
  const page = getCookie("page", { cookies }) as string;
  const limit = getCookie("limit", { cookies }) as string;
  const pathname = getCookie("pathname", { cookies }) as string;

  const filtersData: Filter[] = [
    { name: "name", placeholder: "Filtrar por nombre" },
    { name: "email", placeholder: "Filtrar por email" },
  ];

  return (
    <>
      <Filters filters={filtersData} />
      <Suspense
        key={`${pathname}-${page}-${limit}`}
        fallback={
          <Skeleton
            title={false}
            paragraph={{ rows: 11, width: "100%" }}
          />
        }
      >
        <ServerTable {...props} />
      </Suspense>
      <Pagination />
    </>
  );
};

export default Table;