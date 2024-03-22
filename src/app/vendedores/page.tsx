import Table from "@src/components/table";

const Companies = () => {

  return (
    <div>


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
          {
            key: "email",
            title: "Correo",
          },
          {
            key: "phone",
            title: "Teléfono",
          },
          {
            key: "rfc",
            title: "RFC",
          }
        ]}
        urlEdit="/vendedores/editar"
        urlDelete="/vendedores"
      />
    </div>
  );
};

export default Companies;