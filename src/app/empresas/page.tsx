import Table from "@src/components/table";

const Companies = () => {
  return (
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
  );
};

export default Companies;