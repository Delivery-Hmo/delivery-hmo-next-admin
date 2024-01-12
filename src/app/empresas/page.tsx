import React from 'react';
import HeaderView from "@src/components/headerView";
import Table from "@src/components/table";

const Companies = (searchParams: { [key: string]: string | string[] | undefined; }) => {
  return (
    <>
      <HeaderView
        title="Empresas"
        path="/empresas/registrar"
      />
      <Table
        columns={[
          {
            key: "id",
            title: "ID",
            dataIndex: "id",
          },
          {
            key: "name",
            title: "Nombre",
            dataIndex: "name",
          }
        ]}
      />
    </>
  );
};

export default Companies;