import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/models/users";

const Sellers = () => {
  return (
    <Table<UserAdmin>
      filters={[
        {
          name: "name",
          placeholder: "Nombre",
          value: "",
          label: "Nombre",
        },
        {
          name: "rfc",
          placeholder: "RFC",
          multiple: true,
          value: [],
          label: "RFC",
        },
        {
          name: "email",
          placeholder: "Correo",
          value: "",
          label: "Correo",
        },
        {
          name: "phone",
          placeholder: "Telefono",
          value: "",
          label: "Telefono",
        },
      ]}
      baseUrl="companiesApi"
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
    />
  );
};

export default Sellers;