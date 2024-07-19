import Table from "@src/components/table";
import { UserAdmin } from "@src/interfaces/users";
import { baseTableFilters } from "@src/utils/constants";

const BranchOffices = () => {
  return (
    <Table<UserAdmin>
      filters={[
        ...baseTableFilters,
        {
          typeInput: "select",
          name: "status",
          label: "Estatus",
        }
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
      ]}
    />
  );
};

export default BranchOffices;