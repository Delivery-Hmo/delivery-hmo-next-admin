
import { Suspense } from "react";
import { Skeleton } from "antd";
import TableServer from "./tableServer";
import Pagination from "./pagination";
import { TableProps } from "@src/interfaces/components/table";

const Table = <T extends { id?: string; }>(props: TableProps<T>) => {
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
        <TableServer {...props} />
      </Suspense>
      <Pagination />
    </>
  );
};

export default Table;