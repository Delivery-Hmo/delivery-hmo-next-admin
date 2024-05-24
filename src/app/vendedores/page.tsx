import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/users";

const Sellers = () => {

  return (
    <Table<UserAdmin, { name: string; rfc: string[]; email: string; phone: string; }>
      filters={[
        {
          name: "name",
          placeholder: "Nombre",
          value: "",
        },
        {
          name: "rfc",
          placeholder: "RFC",
          multiple: true,
          value: [],
        },
        {
          name: "email",
          placeholder: "Correo",
          value: "",
        },
        {
          name: "phone",
          placeholder: "Telefono",
          value: "",
        },
      ]}
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