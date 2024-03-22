
import { Suspense } from "react";
import { Skeleton } from "antd";
import ServerTable from "./serverTable";
import Pagination from "./pagination";
import { TableProps } from "@src/interfaces/components/table";

const Table = <T extends {}>(props: TableProps<T>) => {
  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            title={false}
            paragraph={{ rows: 6, width: "100%" }}
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