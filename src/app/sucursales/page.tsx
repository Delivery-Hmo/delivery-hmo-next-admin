import Table from "@src/components/table";
import { BranchOffice } from "@src/interfaces/models/users";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";

const BranchOffices = () => {
  return (
    <Table<BranchOffice>
      filters={[
        ...baseFiltersTable,
        {
          type: "select",
          label: "Empresa",
          name: "userAdmin",
          baseUrl: "companiesApi",
          url: "/empresas/listaFiltrosSucursales",
          loading: true,
        }
      ]}
      baseUrl="companiesApi"
      columns={baseColumnsTable.filter(column => column.key !== "image")}
    />
  );
};

export default BranchOffices;