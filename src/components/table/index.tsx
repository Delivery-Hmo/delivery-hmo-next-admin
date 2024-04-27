import { Suspense } from "react";
import { Skeleton } from "antd";
import ServerTable from "./serverTable";
import Pagination from "./pagination";
import { TableProps } from "@src/interfaces/components/table";
import Filters from "./filters";

const Table = <T extends {}, F extends undefined = undefined>(props: TableProps<T, F>) => {
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