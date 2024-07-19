import Table from "@src/components/table";
import { BranchOffice, UserAdmin } from "@src/interfaces/users";
import { baseTableFilters } from "@src/utils/constants";

const BranchOffices = () => {
  return (
    <Table<BranchOffice>
      filters={[
        ...baseTableFilters,
        {
          typeInput: "select",
          label: "Empresa",
          name: "userAdmin"
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