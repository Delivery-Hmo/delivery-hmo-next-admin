
import TableServer from "./tableServer";
import Pagination from "./pagination";
import { TableProps } from "@src/interfaces/components/table";

const Table = <T extends {}>(props: TableProps<T>) => {
  return (
    <>
      <TableServer {...props} />
      <Pagination />
    </>
  );
};

export default Table;