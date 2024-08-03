import Table from "@src/components/table";
import { BranchOffice } from "@src/interfaces/models/users";
import { InputType } from "@src/types/components/table";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";
import { useMemo } from "react";

const BranchOffices = () => {
  const filters = useMemo<InputType<BranchOffice>[]>(() => {
    const filters: InputType<BranchOffice>[] = [
      ...baseFiltersTable,
      {
        type: "select",
        label: "Empresa",
        name: "userAdmin",
        baseUrl: "companiesApi",
        url: "/empresas/listaFiltrosSucursales",
        loading: true,
        showSearch: true,
      }
    ];

    return filters;
  }, []);

  return (
    <Table<BranchOffice>
      filters={filters}
      baseUrl="companiesApi"
      columns={baseColumnsTable.filter(column => column.key !== "image")}
    />
  );
};

export default BranchOffices;