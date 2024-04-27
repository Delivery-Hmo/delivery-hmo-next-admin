import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/users";

const Sellers = () => {

  return (
    <Table<UserAdmin>
      baseUrlType="companiesApi"
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
          key: "rfc",
          title: "RFC",
        },
        {
          key: "email",
          title: "Correo",
        },
        {
          key: "phone",
          title: "Telefono",
        },
        {
          key: "description",
          title: "Descripcion",
        },
        {
          key: "active",
          title: "Activo",
        },
        {
          key: "image",
          title: "Imagen",
        }
      ]}
      showEdit
    />
  );
};

export default Sellers;