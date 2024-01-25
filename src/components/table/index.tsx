import React from 'react';
import { Table as TableAnt } from "antd";
import { ColumnsType } from "antd/es/table";
import { get } from "@src/services/http";

const Table = async <T extends {}>({ url, columns }: { url?: string; columns: ColumnsType<T>; }) => {
  const data = await get<T>("companiesApi", "userAdmin/list") as T[];

  return (
    <>
      <TableAnt
        columns={columns}
        dataSource={[]}
        rowKey="id"
        sticky
        scroll={{ x: 400 }}
        pagination={false}
      //loading={loading}
      //locale={{ emptyText: <Empty image={PRESENTED_IMAGE_SIMPLE} description='Sin registros.' /> }}
      />
    </>
  );
};

export default Table;