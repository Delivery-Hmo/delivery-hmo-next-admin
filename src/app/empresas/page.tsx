import HeaderView from "@src/components/headerView";
import Table from "@src/components/table";
import { useEffect } from "react";

const Companies = () => {
  return (
    <>
      <HeaderView
        title="Empresas"
        path="/empresas/registrar"
      />
      <Table
        url="userAdmin/list"
        columns={[
          {
            key: "id",
            title: "ID",
          },
          {
            key: "name",
            title: "Nombre",
          },
        ]}
        urlEdit="/empresas/editar"
        urlDelete="/empresas"
      />
    </>
  );
};

export default Companies;