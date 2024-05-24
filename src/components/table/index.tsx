import { Suspense } from "react";
import { Skeleton } from "antd";
import ServerTable from "./serverTable";
import Pagination from "./pagination";
import { TableProps } from "@src/interfaces/components/table";
import Filters from "./filters";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Table = <T extends {}, F extends {} | undefined = undefined>(props: TableProps<T, F>) => {
  const page = getCookie("page", { cookies }) as string;
  const limit = getCookie("limit", { cookies }) as string;
  const pathname = getCookie("pathname", { cookies }) as string;
  const serverTableProps = { ...props } as TableProps<T>;

  delete serverTableProps.filters;
  delete serverTableProps.onSearch;

  return (
    <>
      {
        props.filters && <Filters<F>
          items={props.filters}
          onSearch={props.onSearch}
        />
      }

      <Suspense
        key={`${pathname}-${page}-${limit}`}
        fallback={
          <Skeleton
            title={false}
            paragraph={{ rows: 11, width: "100%" }}
          />
        }
      >
        <ServerTable {...serverTableProps} />
      </Suspense>
      <Pagination />
    </>
  );
};

export default Table;