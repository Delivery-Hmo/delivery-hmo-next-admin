import Table from "@src/components/table";
import { UserSeller } from "@src/interfaces/models/users";
import { InputType } from "@src/types/components/table";
import { baseColumnsTable, baseFiltersTable } from "@src/utils/constants";
import { useMemo } from "react";

const Seller = () => {
  const filters = useMemo<InputType<UserSeller>[]>(() => {
    const filters: InputType<UserSeller>[] = [
      ...baseFiltersTable,
      {
        type: "select",
        label: "Empresa",
        name: "userAdmin",
        baseUrl: "companiesApi",
        url: "/empresas/listaFiltrosSucursales",
        loading: true,
        showSearch: true,
      },
      {
        type: "select",
        label: "Sucursal",
        name: "branchOffice",
        baseUrl: "companiesApi",
        url: "/sucursales/listaFiltrosSucursales",
        loading: true,
        showSearch: true,
      }
    ];

    return filters;
  }, []);

  return (
    <Table<UserSeller>
      filters={filters}
      baseUrl="companiesApi"
      columns={baseColumnsTable}
      url="listBySuperAdmin"
    />
  );
};

export default Seller;