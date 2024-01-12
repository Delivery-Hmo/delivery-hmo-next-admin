import React from 'react';
import { Table as TableAnt } from "antd";
import { ColumnsType } from "antd/es/table";

const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      id: 1,
      name: 'Empresa 1',
    },
    {
      id: 2,
      name: 'Empresa 2',
    },
  ];
};

const Table = async <T extends {}>({ url, columns }: { url?: string; columns: ColumnsType<T>; }) => {
  const data = (await getData()) as any as T[];

  return (
    <>
      <TableAnt
        columns={columns}
        dataSource={data}
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